// Frontend/playwright.config.js
//const { defineConfig, devices } = require("@playwright/test");
import { defineConfig, devices } from "@playwright/test";

const isCI = !!process.env.CI;

module.exports = defineConfig({
  testDir: "./e2e",
  timeout: 60_000,
  fullyParallel: true,
  forbidOnly: isCI,
  retries: isCI ? 1 : 0,
  reporter: [
    ["junit", { outputFile: "reports/junit/playwright-junit.xml" }],
    ["html", { open: "never" }],
    ["line"],
  ],
  use: {
    baseURL: "http://localhost:5173",
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
  },
  webServer: [
    // Backend (Windows self-hosted agent)
    {
      command: "cd ../Backend && gradlew bootRun --no-daemon",
      port: 8080,
      reuseExistingServer: !isCI,
      timeout: 120_000,
    },
    // // Vite preview (uncomment if you use Vite; ensure `npm run build` ran before tests)
    {
      command: "npm run preview",
      port: 3000,
      reuseExistingServer: !isCI,
      timeout: 120_000,
      cwd: __dirname,
    },
  ],
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
});
