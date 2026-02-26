import { expect, Locator, Page } from "@playwright/test";

import { CookieBannerComp } from "../components/CookiesBannerComp";


export class CookieHandler {

    private readonly cookieBanner: CookieBannerComp;
    private readonly page: Page;

    constructor(page: Page) {
        this.page = page;
        this.cookieBanner = new CookieBannerComp(page);
    }

    /**
   * Accept cookies if the banner is visible. Safe to call on every test.
   */
  async closeCookieBannerIfVisible(): Promise<void> {
    const isCookieBannerVisible = await this.cookieBanner.isPresent();
    console.log("COOKIES ARE VISIBLE: " + isCookieBannerVisible);
    if (isCookieBannerVisible == true) {
        await this.cookieBanner.clickAllowAllBtn();
    }
  }
}
