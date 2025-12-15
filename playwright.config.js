// @ts-check
const { defineConfig, devices } = require('@playwright/test');

/**
 * Configuración de Playwright para pruebas E2E de Nova Intranet
 */
module.exports = defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'on',
    videoSize: { width: 1280, height: 720 },
  },

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
  ],

  webServer: {
    command: 'echo "Asegúrate de que Apache esté corriendo en http://localhost"',
    url: 'http://localhost',
    reuseExistingServer: !process.env.CI,
  },
});

