import { test, expect } from "@playwright/test";
import { ProgressBarPage } from "../../../src/apps/demoqa/pages/progressBarPage";

test.describe("DemoQA Progress Bar", () => {
  test("should reach 100% @smoke", async ({ page }) => {
    const progressBar = new ProgressBarPage(page);

    await progressBar.openPage();
    await progressBar.start();

    // align with Python behavior
    await progressBar.waitUntilStarted();
    await progressBar.waitUntilAtLeast(100);

    expect(await progressBar.getProgressValue()).toBe(100);
  });
});
