import { test, expect } from "../fixtures/test";
import { PaymentAssertions } from "tests/assertions/PaymentAssertions";
import { TestParams, User } from "../../src/config/";
import { UserAssertions } from "tests/assertions/UserAssertions";
import * as allure from "allure-js-commons";

test.describe("Payments tests with cart disabled (go straight to payment)", () => {
    const adminUser = TestParams.getMainTestUser();
    let secondaryTestUser: User;
    const testCourseId = TestParams.getTestCourseId();
    const testCourseName = TestParams.getTestCourseName();
    const testCourseInitialPrice = TestParams.getCourseInitialPrice();
    const testCourseDiscountedPrice = TestParams.getDiscountCouponPrice();
    const couponCode = TestParams.getCouponCode();

    test.beforeEach("Navigate to school", async ({ navigation, schoolHomePage, coursesPage, paymentPage }) => {
        await allure.step("Set user data in payments page", async () => {
            secondaryTestUser = TestParams.getSecondaryTestUser();
            await navigation.navigateToSchool(TestParams.getTestSchoolName());
            await schoolHomePage.clickCoursesLink();
            await coursesPage.proceedToCheckoutForCourseWithId(testCourseId);

            await paymentPage.setUserData(secondaryTestUser);
        });

    });

    test("Perform simple payment happy path without coupon", async ({ page, transactionsPage, adminPage, navigation, usersPage, productsPage, paymentPage, thankYouPage }) => {
        await paymentPage.clickBuy();

        await allure.step("Quick verifications in thank you page", async () => {
            await PaymentAssertions.verifyThankYouPage(thankYouPage);
        });


        await navigation.sessionHandler.logoutFromThankYouPage();
        await navigation.sessionHandler.loginFromSchoolPage(adminUser.email, adminUser.password);
        await adminPage.clickUsersTab();
        await page.waitForTimeout(10000);//since playwright moves too fast, some syncing with backend seems to be required here, adding this wait to remove flakiness

        await usersPage.clickUserByEmail(secondaryTestUser.email);
        await allure.step("Verify users overview page", async () => {
            await UserAssertions.verifyUserDetailsOverview(usersPage, secondaryTestUser);
        });

        await allure.step("Verify users transactions page", async () => {
            await usersPage.clickTransactionsTab();
            await UserAssertions.verifyUserDetailsTransactions(transactionsPage, testCourseInitialPrice);
        });

        await allure.step("Verify users products page", async () => {
            await usersPage.clickProductsTab();
            await UserAssertions.verifyUserDetailsProducts(productsPage, testCourseName);
        });

    });

    test("Perform simple payment happy path with coupon", async ({ page, transactionsPage, adminPage, navigation, usersPage, productsPage, paymentPage, thankYouPage }) => {
        await paymentPage.applyCoupon(couponCode);

        //perform a hard-stop assertion here, this could be enriched with more checks here
        //In this case we could use a Currency formatter, keeping it simple for now
        await expect(paymentPage.totalAmount).toHaveText("€" + testCourseDiscountedPrice);
        await paymentPage.clickBuy();

        await allure.step("Quick verifications in thank you page", async () => {
            await PaymentAssertions.verifyThankYouPage(thankYouPage);
        });

        await navigation.sessionHandler.logoutFromThankYouPage();
        await navigation.sessionHandler.loginFromSchoolPage(adminUser.email, adminUser.password);
        await adminPage.clickUsersTab();
        await page.waitForTimeout(10000);//since playwright moves too fast, some syncing with backend seems to be required here, adding this wait to remove flakiness

        await usersPage.clickUserByEmail(secondaryTestUser.email);
        await allure.step("Verify users overview page", async () => {
            await UserAssertions.verifyUserDetailsOverview(usersPage, secondaryTestUser);
        });        

        await allure.step("Verify users transactions page", async () => {
            await usersPage.clickTransactionsTab();
            await UserAssertions.verifyUserDetailsTransactions(transactionsPage, testCourseDiscountedPrice);
        });

        await allure.step("Verify users products page", async () => {
            await usersPage.clickProductsTab();
            await UserAssertions.verifyUserDetailsProducts(productsPage, testCourseName);
        });
    });
});