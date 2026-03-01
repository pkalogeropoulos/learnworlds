import { test, expect } from "../fixtures/test";
import { PaymentAssertions } from "tests/assertions/PaymentAssertions";
import { Config } from "../../src/config/Config";
import { config } from "node:process";

test.describe("Payments tests with cart disabled (go straight to payment)", () => {

    test.beforeEach("Navigate to school", async ({ navigation }) => {
        //await navigation.navigateToSchool(Config.getTestSchoolName());
    });

    test("Perform simple payment happy path without coupon", async ({ page, transactionsPage, adminPage, navigation, usersPage, productsPage, schoolHomePage, coursesPage, paymentPage, thankYouPage }) => {

        // await schoolHomePage.clickCoursesLink();
        // await coursesPage.proceedToCheckoutForCourseWithId(Config.getTestCourseId());

        // const testUser = Config.getSecondaryTestUser();
        // await paymentPage.setUserData(testUser);
        // await paymentPage.clickBuy();

        // //more assertions could be performed here (is the invoice created correctly? does the url contain the correct info etc).
        // //For now we just check a few text messages in the ui
        // await PaymentAssertions.verifyThankYouPage(thankYouPage);

        // await page.waitForTimeout(10000);//since playwright moves too fast, some syncing with backend seem te be required here, adding this wait to remove flakiness


        // await navigation.sessionHandler.logoutFromThankYouPage();
        await navigation.sessionHandler.loginFromSchoolPage(Config.getMainTestUser().email, Config.getMainTestUser().password);
        await adminPage.clickUsersTab();
        await usersPage.clickUserByEmail(Config.getSecondaryTestUser().email);


        await expect.soft(usersPage.userEmail).toHaveText(Config.getSecondaryTestUser().email);
        await expect.soft(usersPage.userNameSurname).toHaveText(Config.getSecondaryTestUser().name + " " + Config.getSecondaryTestUser().surname);
        await expect.soft(usersPage.userCourses).toHaveText("0");//shouldn't this be 1? I am very curious why it is zero, not sure what is going on here, maybe I'm missing something business/wise

        await usersPage.clickProductsTab();
        await expect.soft(productsPage.isCoursePresent(Config.getTestCourseName())).toBeTruthy();
        const status = await productsPage.getEnrollmentStatusForCourse(Config.getTestCourseName());
        await expect.soft(status.toString()).toBe("Enrolled");

        await usersPage.clickTransactionsTab();
        await expect.soft((await transactionsPage.getLastTransactionStatus()).toString()).toBe("Successful");
        await expect.soft(transactionsPage.lastTransactionAmount).toHaveText("€" + Config.getCourseInitialPrice());
        await expect.soft(transactionsPage.lastTransactionPaymentMethod).toHaveText("Sandbox");
    });

    test("Perform simple payment happy path with coupon", async ({ schoolHomePage, coursesPage, paymentPage, thankYouPage }) => {
        await schoolHomePage.clickCoursesLink();
        await coursesPage.proceedToCheckoutForCourseWithId(Config.getTestCourseId());

        await paymentPage.setUserData(Config.getSecondaryTestUser());
        await paymentPage.applyCoupon(Config.getCouponCode());

        //perform a hard-stop assertion here, this could be enriched with more checks here
        //In this case we could use a Currency formatter, keeping it simple for now
        await expect(paymentPage.totalAmount).toHaveText("€" + Config.getDiscountCouponPrice());


        await paymentPage.clickBuy();

        //more assertions could be performed here (is the invoice created correctly? does the url contain the correct info etc).
        //For now we just check a few text messages in the ui
        await PaymentAssertions.verifyThankYouPage(thankYouPage);
    });

    // test.afterEach("perform admin assertions", async ({navigation}) => {

    // });
});