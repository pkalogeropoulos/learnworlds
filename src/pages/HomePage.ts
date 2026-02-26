import { expect, Locator, Page } from "@playwright/test";

export class HomePage {
  readonly page: Page;

  // Key areas
  readonly heroHeading: Locator;

  constructor(page: Page) {
    this.page = page;

    // “Initial page” essentials: heading + primary CTA.
    this.heroHeading = page.getByRole("heading").first();
  }

  async goto(): Promise<void> {
    await this.page.goto("/", { waitUntil: "domcontentloaded" });
  }

  async expectLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(/learnworlds\.com/i);
  }
}