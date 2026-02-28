import { test, expect } from "@playwright/test";
import * as pages from "@pages";
import { NavigationHandler, CookieHandler } from "@business";


test.describe("Payments tests with cart disabled", () => {
    test("Perform simple payment happy path without coupon", async ({ page }) => {
        const navigation = new NavigationHandler(page);
        await navigation.navigateToSchool(process.env.DEMO_SCHOOL_NAME!);
        
        const schoolHomePage = new pages.SchoolHomePage(page);
        await schoolHomePage.clickCoursesLink();

        const coursePage = new pages.CoursesPage(page);
        await coursePage.addToCartCourseById("699e693a2a1dfdd7190737f2");
        await coursePage.hoverOverCartIcon();
        await coursePage.clickCheckoutButton();

        const paymentPage = new pages.PaymentPage(page);
        await paymentPage.setFirstName("test name");
        await paymentPage.setLastName("test surname");
        await paymentPage.setEmail(process.env.DEMO_NAME_02!);
        await paymentPage.setPassword(process.env.DEMO_PASS_02!);
        await paymentPage.clickBuy();
        
        const thankYouPage = new pages.ThankYouPage(page);
        await expect.soft(thankYouPage.thankYouHeading).toHaveText("Thank you for your purchase!");
        await expect.soft(thankYouPage.thankYouMainText).toHaveText("Your purchase was completed successfully.");
        await expect.soft(thankYouPage.downloadInvoiceLink).toBeVisible();
    });

});