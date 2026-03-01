import { test as setup, expect } from "@playwright/test";
import * as config from "@config";
import * as business from "@business";

setup("admin authentication", async ({ page }) => {
 new business.SessionHandler(page).loginFromMainPage(config.Config.getMainTestUser().email, config.Config.getMainTestUser().password);

  await page.context().storageState({
    path: "./storage/admin.state.json",
  });
});