import { test as base, expect, Page } from "@playwright/test";
import * as business from "@business";
import * as pages from "@pages";
import * as config from "@config";

type Fixtures = {
  navigation: business.NavigationHandler;
  schoolHomePage: pages.SchoolHomePage;
  coursesPage: pages.CoursesPage;
  paymentPage: pages.PaymentPage;
  thankYouPage: pages.ThankYouPage;
};

export const test = base.extend<Fixtures>({
  // --- POM fixtures ---
  navigation: async ({ page }, use) => {
    await use(new business.NavigationHandler(page));
  },

  schoolHomePage: async ({ page }, use) => {
    await use(new pages.SchoolHomePage(page));
  },

  coursesPage: async ({ page }, use) => {
    await use(new pages.CoursesPage(page));
  },

  paymentPage: async ({ page }, use) => {
    await use(new pages.PaymentPage(page));
  },

  thankYouPage: async ({ page }, use) => {
    await use(new pages.ThankYouPage(page));
  },
});

export { expect };