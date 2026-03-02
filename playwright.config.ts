import { defineConfig, devices } from '@playwright/test';
import * as dotenv from 'dotenv';


/*
Used for local testing and for demonstration purposes. In a more real scenario other more robust
options should be used for user handling
*/
dotenv.config({ path: '.env.local' });


  export function getBaseURL(): string {
    let baseURL: string | undefined;

    // Set the environment to "production" if not defined
    if (!process.env.ENVIRONMENT) {
      process.env.ENVIRONMENT = "production";
    }

    if (process.env.ENVIRONMENT === "production") {
      baseURL = "https://www.learnworlds.com";
    }

    //TODO: add support for other envs such as dev, staging, etc - for now we keep it simple

    return baseURL || '';
}


/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    ["line"],
    ["html", { open: "never" }],
    ["allure-playwright", { outputFolder: "allure-results" }],
  ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('')`. */
    baseURL: getBaseURL(),

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
    screenshot: "only-on-failure",
    video: "retain-on-failure",
  },

  expect: { timeout: 15_000 },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },

    {
      name: "setup",
      testMatch: "admin.setup.ts",
    },
    {
      name: "api",
      dependencies: ["setup"],  // 👈 THIS connects setup to api tests, not used for now
      testMatch: "create-user.spec.ts",
    },
  ],
});
