import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 1,
  workers: process.env.CI ? 2 : 1,
  reporter: process.env.CI ? "html" : "line",
  use: {
    baseURL: process.env.SEP_QA_URL || "https://qa.sep.tdtm.cydeo.com/taws",
    trace: 'on-first-retry',
    headless: false,
  },

  projects: [

    {
      name: 'Google Chrome',
      use: {
        ...devices['Desktop Chrome'], 
        channel: 'chrome',
        viewport: { width: 1800, height: 1000 }, // simulate max window
      },
    },
// Uncomment when you want true cross-browser coverage:
    // {
    //   name: 'Firefox',
    //   use: { ...devices['Desktop Firefox'], viewport: { width: 1800, height: 1000 } },
    // },
    // {
    //   name: 'WebKit',
    //   use: { ...devices['Desktop Safari'], viewport: { width: 1800, height: 1000 } },
    // },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

  ],
});
