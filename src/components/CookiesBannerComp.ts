import { expect, Locator, Page } from "@playwright/test";

export class CookieBannerComp {
  private readonly page: Page;

  // Common cookie actions (buttons)
  readonly cookieDialog: Locator;
  readonly allowAllBtn: Locator;
  readonly denyBtn: Locator;
  readonly allowSelectionButton: Locator;

  constructor(page: Page) {
    this.page = page;


    // Prefer role-based locators for buttons/links.
    this.cookieDialog = page.locator("#CybotCookiebotDialog")
    this.allowAllBtn = page.locator("#CybotCookiebotDialogBodyLevelButtonLevelOptinAllowAll");
    this.denyBtn = page.locator("#CybotCookiebotDialogBodyButtonDecline");
    this.allowSelectionButton = page.locator("#CybotCookiebotDialogBodyLevelButtonLevelOptinAllowallSelection");
  }

  /**
   * Returns true if a cookie banner/modal seems to be present.
   * Best-effort: checks for a visible accept/reject button or a cookie-ish container.
   */
  async isPresent(): Promise<boolean> {
    return await this.cookieDialog.isVisible();
  }

  async clickAllowAllBtn(): Promise<void> {
    await this.allowAllBtn.click();
  }

  async clickDenyBtn(): Promise<void> {
    await this.denyBtn.click();
  }

  async clickAllowSelectionBtn(): Promise<void> {
    await this.allowAllBtn.click();
  }
}