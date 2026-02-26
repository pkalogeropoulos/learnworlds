import { expect, Locator, Page } from "@playwright/test";

export class LoginPage {
  readonly page: Page;

  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    this.page = page;

    // Email / password fields:
    this.emailInput = page.locator("#email");
    this.passwordInput = page.locator("#password");
    // "Login" button
    this.loginButton = page.getByText("Login");
  }

  async goto(): Promise<void> {
    await this.page.goto("https://account.learnworlds.com/login", {
      waitUntil: "domcontentloaded",
    });
  }

  async setEmail(email: string): Promise<void> {
    await this.emailInput.fill(email);
  }

  async setPassword(password: string): Promise<void> {
    await this.passwordInput.fill(password);
  }


  async login(email: string, password: string): Promise<void> {
    await this.setEmail(email);
    await this.setPassword(password);
    await this.loginButton.click();
  }
}