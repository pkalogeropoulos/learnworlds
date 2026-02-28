import { test, expect } from "../fixtures/test";
import { PaymentAssertions } from "tests/assertions/PaymentAssertions";
import { Config } from "../../src/config/Config";

test.describe("Payments tests with cart disabled (go straight to payment)", () => {
    test.beforeEach("Navigate to school", async ({navigation}) => {
        await navigation.navigateToSchool(Config.getTestSchoolName());
    });

    test("Perform simple payment happy path without coupon", async ({schoolHomePage, coursesPage, paymentPage, thankYouPage }) => {


        await schoolHomePage.clickCoursesLink();
        await coursesPage.proceedToCheckoutForCourseWithId(Config.getTestCourseId());

        await paymentPage.setUserData(Config.getSecondaryTestUser());
        await paymentPage.clickBuy();

        //more assertions could be performed here (is the invoice created correctly? does the url contain the correct info etc).
        //For now we just check a few text messages in the ui
        await PaymentAssertions.verifyThankYouPage(thankYouPage);
    });

    test("Perform simple payment happy path with coupon", async ({schoolHomePage, coursesPage, paymentPage, thankYouPage }) => {
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

});