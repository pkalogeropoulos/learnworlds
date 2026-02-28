import { test, expect } from "../fixtures/test";
import { PaymentAssertions } from "tests/assertions/PaymentAssertions";
import { Config } from "../../src/config/Config";

test.describe("Payments tests with cart disabled (go straight to payment)", () => {
    test("Perform simple payment happy path without coupon", async ({ page, navigation, schoolHomePage, coursesPage, paymentPage, thankYouPage }) => {
        await navigation.navigateToSchool(Config.getTestSchoolName());
        
        await schoolHomePage.clickCoursesLink();
        await coursesPage.proceedToCheckoutForCourseWithId(Config.getTestCourseId());

        await paymentPage.setUserData(Config.getSecondaryTestUser());
        await paymentPage.clickBuy();

        //more assertions could be performed here (is the invoice created correctly? does the url contain the correct info etc).
        //For now we just check a few text messages in the ui
        await PaymentAssertions.verifyThankYouPage(thankYouPage);
    });

});