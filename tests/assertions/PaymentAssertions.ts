import {expect} from "@playwright/test";
import * as pages from "@pages";

export class PaymentAssertions {

    /**
     * more assertions could be performed here (is the invoice created correctly? does the url contain the correct info etc).
       For now we just check a few text messages in the ui
     * @param thankYouPage 
     */
    static async verifyThankYouPage(thankYouPage: pages.ThankYouPage) {
        //these assertion texts could be in different location and not hardcoded here, depends on the structure of 
        //our codebase and if we support localisation
        await expect.soft(thankYouPage.thankYouHeading).toHaveText("Thank you for your purchase!");
        await expect.soft(thankYouPage.thankYouMainText).toHaveText("Your purchase was completed successfully.");
        await expect.soft(thankYouPage.downloadInvoiceLink).toBeVisible();
    }
}