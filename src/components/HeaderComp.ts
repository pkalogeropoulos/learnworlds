import { Locator, Page, expect } from '@playwright/test';

export class HeaderComp {
  readonly page: Page;

  // Before login / logged-out
  readonly loginButton: Locator;

  // After login / logged-in
  readonly accessYourSchoolButton: Locator;
  readonly logoutButton: Locator;

  constructor(page: Page) {
    this.page = page;

    this.loginButton = page.getByRole('link', { name: "Login" });

    this.accessYourSchoolButton = page
      .getByRole('link', { name: /access (your )?school/i })
      .first();

    this.logoutButton = page.getByRole('link', { name: /log ?out|sign ?out/i }).first();
  }

  /**
   * Click the login button to navigate to the login form.
   */
  async clickLogin() {
    await this.loginButton.click();
  }

  /**
   * Click “Access Your School” after login.
   */
  async clickAccessYourSchool() {
    await this.accessYourSchoolButton.click();
  }

  /**
   * Click the logout button and wait for transition back to logged-out state.
   */
  async clickLogout() {
    await this.logoutButton.click();

    // After logout, expect login button visible again
    await expect(this.loginButton, 'Expected login button after logout').toBeVisible();
  }
}