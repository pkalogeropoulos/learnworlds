import { Locator, Page, expect } from '@playwright/test';

export class HeaderComp {
  readonly page: Page;

  // Before login / logged-out
  readonly loginButton: Locator;

  // After login / logged-in
  readonly mySchoolLink: Locator;
  readonly logoutButton: Locator;

  constructor(page: Page) {
    this.page = page;

    this.loginButton = page.getByRole('link', { name: "Login" });
    this.mySchoolLink = page.getByRole('link', { name: 'My school' });
    this.logoutButton = page.locator("a.js-account-logout");
    
  }

  /**
   * Click the login button to navigate to the login form.
   */
  async clickLogin() {
    await this.loginButton.click();
  }

  async hoverOverMySchoolLink() {
    await this.mySchoolLink.hover();
  }

  /**
   * Click the logout button
   */
  async clickLogout() {
    await this.logoutButton.click();
  }
}