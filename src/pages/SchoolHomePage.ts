import { Locator, Page } from "@playwright/test";

export class SchoolHomePage {

    readonly page: Page;
    readonly signInButton: Locator;
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly coursesLink: Locator;

    constructor(page: Page) {
        this.page = page;
        this.signInButton = page.getByRole('link', { name: 'Sign in' });
        this.emailInput = page.getByRole('textbox', { name: 'E-mail', exact: true });
        this.passwordInput = page.getByRole('textbox', { name: 'Password' });
        this.loginButton = page.locator('#submitLogin');
        this.coursesLink = page.locator("#menuItem7 span");
    }

    async clickSignInButton(): Promise<void> {
        await this.signInButton.click();
    }

    async setUsername(username: string): Promise<void> {
        await this.emailInput.fill(username);
    }

    async setPassword(password: string): Promise<void> {
        await this.passwordInput.fill(password);
    }

    async clickLoginButton(): Promise<void> {
        await this.loginButton.click();
    }

    async clickCoursesLink():Promise<void> {
        await this.coursesLink.click();
    }
}