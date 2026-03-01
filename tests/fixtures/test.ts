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
  homePage: pages.HomePage;
  usersPage: pages.UsersPage;
  productsPage: pages.ProductsPage;
  adminPage: pages.AdminPage;
  transactionsPage:pages.TransactionsPage;
};

export const test = base.extend<Fixtures>({
  // --- POM fixtures ---
  navigation: async ({ page }, use) => {
    await use(new business.NavigationHandler(page));
  },

  schoolHomePage: async ({ page }, use) => {
    await use(new pages.SchoolHomePage(page));
  },

  homePage: async ({ page }, use) => {
    await use(new pages.HomePage(page));
  },

  coursesPage: async ({ page }, use) => {
    await use(new pages.CoursesPage(page));
  },

  paymentPage: async ({ page }, use) => {
    await use(new pages.PaymentPage(page));
  },
  
  adminPage: async ({ page }, use) => {
    await use(new pages.AdminPage(page));
  },

  usersPage: async ({ page }, use) => {
    await use(new pages.UsersPage(page));
  },

  productsPage: async ({ page }, use) => {
    await use(new pages.ProductsPage(page));
  },

  transactionsPage: async ({ page }, use) => {
    await use(new pages.TransactionsPage(page));
  },

  thankYouPage: async ({ page }, use) => {
    await use(new pages.ThankYouPage(page));
  },
});

export { expect };