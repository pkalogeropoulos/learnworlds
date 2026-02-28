import {Locator, Page} from "@playwright/test"

export class ThankYouPage {

    readonly page: Page;
    readonly thankYouHeading: Locator;
    readonly thankYouMainText: Locator;
    readonly downloadInvoiceLink: Locator;

    constructor(page: Page) {
        this.page = page;

        this.thankYouHeading = page.locator("h1.learnworlds-heading");
        this.thankYouMainText = page.locator("div.learnworlds-main-text span");
        this.downloadInvoiceLink = page.locator("div.learnworlds-main-text a");
    }
}