import { defineConfig, devices } from "@playwright/test";
import * as dotenv from "dotenv";
import path from "path";

// Load .env from repo root (works locally + CI)
dotenv.config({ path: path.resolve(process.cwd(), ".env") });

const toBool = (v: string | undefined, fallback: boolean) =>
  v === undefined ? fallback : v.toLowerCase() === "true";

const HEADLESS = toBool(process.env.HEADLESS, true);

// Reuse your existing env keys (.env.example)
const EXPECT_TIMEOUT = Number(process.env.DEFAULT_TIMEOUT ?? 10_000);
const ACTION_TIMEOUT = Number(process.env.DEFAULT_TIMEOUT ?? 10_000);
const NAVIGATION_TIMEOUT = Number(process.env.LONG_TIMEOUT ?? 30_000);

const ALLURE_DIR = process.env.ALLURE_RESULTS_DIR ?? "allure-results";

export default defineConfig({
  testDir: "./tests",
  timeout: 30_000,
  expect: { timeout: EXPECT_TIMEOUT },

  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,

  reporter: [
    ["list"],
    ["html", { open: "never" }],
    ["allure-playwright", { outputFolder: ALLURE_DIR, detail: true, suiteTitle: true }],
  ],

  outputDir: "test-results",

  // Default settings (UI)
  use: {
    headless: HEADLESS,
    actionTimeout: ACTION_TIMEOUT,
    navigationTimeout: NAVIGATION_TIMEOUT,
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
  },

  projects: [
    {
      name: "ui-chromium",
      testDir: "./tests/ui",
      use: {
        ...devices["Desktop Chrome"],
        viewport: { width: 1920, height: 1080 },
      },
    },
    {
      name: "ui-firefox",
      testDir: "./tests/ui",
      use: {
        ...devices["Desktop Firefox"],
        viewport: { width: 1920, height: 1080 },
      },
    },
    {
      name: "api",
      testDir: "./tests/api",
      use: {
        baseURL:
          process.env.API_BASE_URL ??
          process.env.JSONPLACEHOLDER_URL ??
          "https://jsonplaceholder.typicode.com",
        trace: "off",
        video: "off",
        screenshot: "off",
      },
    },
  ],
});
