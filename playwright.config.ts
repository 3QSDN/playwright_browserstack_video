import type { PlaywrightTestConfig } from '@playwright/test'

/**
 * See https://playwright.dev/docs/test-configuration.
 */
const config: PlaywrightTestConfig = {
  globalSetup: require.resolve('./tests/global-setup.ts'),
  testDir: './tests',
  /* Maximum time one test can run for. */
  timeout: 30 * 1000,
  expect: {
    /**
     * Maximum time expect() should wait for the condition to be met.
     * For example in `await expect(locator).toHaveText();`
     */
    timeout: 5000,
  },
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter:
    'html' /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */,
  use: {
    /* Maximum time each action such as `click()` can take. Defaults to 0 (no limit). */
    actionTimeout: 0,
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: 'http://localhost:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
    screenshot: 'on',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chrome@latest:Windows 10@browserstack',
      use: {
        browserName: 'chromium',
        channel: 'chrome',
      },
    },
    {
      name: 'chrome@latest:OSX Big Sur@browserstack',
      use: {
        browserName: 'chromium',
        channel: 'chrome',
      },
    },
    {
      name: 'edge@latest:Windows 10@browserstack',
      use: {
        browserName: 'chromium',
      },
    },
    {
      name: 'playwright-firefox@latest:OSX Catalina@browserstack',
      use: {
        browserName: 'firefox',
      },
    },
    {
      name: 'playwright-webkit@latest:OSX Big Sur@browserstack',
      use: {
        browserName: 'webkit',
        // Config to use playwright emulated devices.
        // ...devices['iPhone 12 Pro Max'],
      },
    },
    {
      name: 'safari@latest:iOS 15@browserstack',
      use: {
        browserName: 'webkit',
      },
    },
    {
      name: 'chrome@latest:Android 12@browserstack',
      use: {
        browserName: 'chromium',
        // Config to use playwright emulated devices.
        // ...devices['Pixel 2 XL'],
      },
    },
  ],

  /* Folder for test artifacts such as screenshots, videos, traces, etc. */
  // outputDir: 'test-results/',

  /* Run your local dev server before starting the tests */
  webServer: {
    command: 'npm run serve',
    port: 3000,
  },
}

export default config
