import { test, expect } from "@playwright/test";
import { ProgressBarPage } from "../../../src/apps/demoqa/pages/progressBarPage";

test.describe("DemoQA Progress Bar", () => {
  test("should complete progress bar @smoke", async ({ page }) => {
    const progressBar = new ProgressBarPage(page);

    await progressBar.openPage();
    await progressBar.start();

    await progressBar.waitForProgress(100);

    await progressBar.waitForResetButton();

    expect(await progressBar.getProgressValue()).toBe(100);
  });
});
