import { defineConfig, devices } from '@playwright/test';
import * as dotenv from 'dotenv';

dotenv.config();

const timestamp = new Date().toISOString().replace(/[:T]/g, '-').replace(/\..+/, '');

export default defineConfig({
  testDir: './',
  testMatch: ['tests/**/*.spec.{js,ts}'],
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: 1,
  reporter: [['html', { open: 'never' }], ['list'], ['json', { outputFile: 'test-results/results.json' }], ['json', { outputFile: `report-dashboard/test-reports-history/results-${timestamp}.json` }]],

  metadata: {
    // Default fallback environment
    environment: process.env.TEST_ENV || 'Pre-Prod',
    // Per-product environment mapping
    environments: {
      Digitar: process.env.DIGITAR_ENV || 'STG',
    },
  },

  timeout: 480_000,
  expect: { timeout: 30_000 },
  use: {
    navigationTimeout: 90_000,
    actionTimeout: 30_000,
    trace: 'on',
    screenshot: 'on',
    video: 'on',
    locale: 'ar-SA',
    timezoneId: 'Asia/Riyadh',
    viewport: { width: 1440, height: 900 },
    ignoreHTTPSErrors: true,
    launchOptions: {
      args: ['--start-maximized', '--disable-features=LocalNetworkAccessCheck', '--disable-blink-features=AutomationControlled'],
    },
    headless: false,
    permissions: ['geolocation', 'local-network-access'],
    geolocation: { latitude: 21.5424, longitude: 39.198 },
  },

  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        viewport: null,
        deviceScaleFactor: undefined,
      },
    },
  ],
});
