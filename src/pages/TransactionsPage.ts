import { Page, Locator } from "@playwright/test"

export class TransactionsPage {

    readonly page: Page;
    readonly lastTransactionStatus: Locator;
    readonly lastTransactionAmount: Locator;
    readonly lastTransactionPaymentMethod: Locator;

    constructor(page: Page) {
        this.page = page;
        this.lastTransactionStatus = page.locator("");
        this.lastTransactionAmount = page.frameLocator("#contentHolder").locator("tr.authoring-table-row.cursor-pointer").nth(1).locator("td.authoring-table-cell").nth(3);
        this.lastTransactionPaymentMethod = page.frameLocator("#contentHolder").locator("tr.authoring-table-row.cursor-pointer").nth(1).locator("td.authoring-table-cell").nth(4);
    }

    async getLastTransactionStatus(): Promise<string> {
        const frame = await this.page.frameLocator("#contentHolder");
        console.log(await frame.getByTitle);
        return await frame.locator("tr.authoring-table-row.cursor-pointer").nth(1).locator("td.authoring-table-cell").nth(1).innerText();
    }

    async isStatusWithValuePresent(statusValue: string): Promise<boolean> {
        const frame = await this.page.frameLocator("#contentHolder");
        return frame.getByText(statusValue).isVisible();
    }

    async isAmountWithValuePresent(amountValue: string): Promise<boolean> {
        const frame = await this.page.frameLocator("#contentHolder");
        return frame.getByText("€" + amountValue).isVisible();
    }
}