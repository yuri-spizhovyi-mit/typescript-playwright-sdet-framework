import { test, expect, type Locator, type Page } from "@playwright/test";
import { BaseDemoQAPage } from "./baseDemoQaPage";

export class ProgressBarPage extends BaseDemoQAPage {
  private readonly startStopBtn: Locator;
  private readonly resetBtn: Locator;
  private readonly progressBar: Locator;

  constructor(page: Page) {
    super(page);
    this.startStopBtn = page.locator("#startStopButton");
    this.resetBtn = page.locator("#resetButton");
    this.progressBar = page.locator("div[role='progressbar']");
  }

  async openPage(): Promise<void> {
    await test.step("Open Progress Bar page", async () => {
      await this.open("progress-bar");
      await expect(this.startStopBtn).toBeVisible();
    });
  }

  async start(): Promise<void> {
    await test.step("Start progress bar", async () => {
      await this.startStopBtn.click();
    });
  }

  async stop(): Promise<void> {
    await test.step("Stop progress bar", async () => {
      await this.startStopBtn.click();
    });
  }

  async reset(): Promise<void> {
    await test.step("Reset progress bar", async () => {
      await this.resetBtn.click();
    });
  }

  async getProgressValue(): Promise<number> {
    const value = await this.progressBar.getAttribute("aria-valuenow");
    return Number(value ?? 0);
  }

  async waitUntilStarted(timeoutMs = 5_000): Promise<void> {
    await test.step("Wait until progress starts", async () => {
      await expect
        .poll(async () => await this.getProgressValue(), { timeout: timeoutMs })
        .toBeGreaterThan(0);
    });
  }

  async waitUntilAtLeast(target: number, timeoutMs = 15_000): Promise<void> {
    await test.step(`Wait until progress >= ${target}`, async () => {
      await expect
        .poll(async () => await this.getProgressValue(), { timeout: timeoutMs })
        .toBeGreaterThanOrEqual(target);
    });
  }
}
