import { test, expect, type Locator, type Page } from "@playwright/test";
import { BaseDemoQAPage } from "./baseDemoQaPage";
import { waitForNumberAtLeast } from "../../../core/utils/waiters";

export class ProgressBarPage extends BaseDemoQAPage {
  private readonly startStopButton: Locator;
  private readonly resetButton: Locator;
  private readonly progressBar: Locator;

  constructor(page: Page) {
    super(page);
    this.startStopButton = page.locator("#startStopButton");
    this.resetButton = page.locator("#resetButton");
    this.progressBar = page.locator("div[role='progressbar']");
  }

  async openPage(): Promise<void> {
    await test.step("Open Progress Bar page", async () => {
      await this.open("progress-bar");
      await expect(this.startStopButton).toBeVisible();
    });
  }

  async start(): Promise<void> {
    await test.step("Start progress bar", async () => {
      await this.startStopButton.click();
    });
  }

  async getProgressValue(): Promise<number> {
    const value = await this.progressBar.getAttribute("aria-valuenow");
    return Number(value ?? 0);
  }

  async waitForProgress(target: number): Promise<void> {
    await test.step(`Wait for progress to reach ${target}%`, async () => {
      await waitForNumberAtLeast(() => this.getProgressValue(), target);
    });
  }

  async waitForResetButton(): Promise<void> {
    await test.step("Wait for Reset button to appear", async () => {
      await expect(this.resetButton).toBeVisible();
      await expect(this.resetButton).toBeEnabled();
    });
  }
}
