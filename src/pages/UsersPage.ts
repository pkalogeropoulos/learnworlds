import { Locator, Page, expect } from "@playwright/test"

export class UsersPage {
    readonly page: Page;
    readonly userNameSurname: Locator;
    readonly userEmail: Locator;
    readonly userCourses: Locator;
    readonly products: Locator;
    readonly transactions: Locator;
    readonly addUserButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.userNameSurname = page.locator("a.-user-name");
        this.userEmail = page.locator("a.-user-mail");
        this.userCourses = page.locator("div.metrics-item div.metric-value").nth(1);
        this.products = page.getByTestId("tab-products");
        this.transactions = page.getByTestId("tab-transactions");
        this.addUserButton = page.getByText("Add user");
    }

    private readonly dynamicSelectors = {
        userLinkByEmail: (email: string) => this.page.locator('iframe[name="contentWindow_1772310757678"]').contentFrame().getByText(email)
    };

    async goto(schoolName: string) {
        await this.page.goto("https://" + schoolName + ".learnworlds.com/author/users?tab=user", {
            waitUntil: "domcontentloaded",
        });
    }

    async clickUserByEmail(email: string) {
        const frame = await this.page.frameLocator("#contentHolder");
        await frame.getByText(email).click();
    }

    async clickProductsTab() {
        await this.products.click();
    }

    async clickTransactionsTab() {
        await this.transactions.click();
    }

    async waitForPageToLoad() {
        const frame = await this.page.frameLocator("#contentHolder");
        await expect(frame.locator(this.addUserButton)).toBeVisible();
    }
}