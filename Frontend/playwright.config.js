// Frontend/playwright.config.js
import { defineConfig, devices } from "@playwright/test";

const isCI = !!process.env.CI;

export default defineConfig({
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
    baseURL: "http://localhost:5173", // ⟵ matches preview URL
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
  },
  webServer: [
    // Start Vite preview on 5173 (serves the built app).
    {
      command: "npm run preview -- --port 5173 --strictPort",
      url: "http://localhost:5173",
      reuseExistingServer: !isCI,
      timeout: 30_000, //2min
      //cwd: __dirname,
    },
  ],
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
});
