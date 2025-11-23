import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: 1,
  workers: 1,
  reporter: 'html',
  use: {
    baseURL: "",
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
/*
    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox'],
        viewport: { width: 1800, height: 1000 },
      },
    },

    {
      name: 'webkit',
      use: {
        ...devices['Desktop Safari'],
        viewport: { width: 1800, height: 1000 },
      },
    },
*/

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
