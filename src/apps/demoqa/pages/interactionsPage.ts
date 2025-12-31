import { test, expect, type Locator, type Page } from "@playwright/test";
import { BaseDemoQAPage } from "./baseDemoQaPage";

export class InteractionsPage extends BaseDemoQAPage {
  private readonly pageReady: Locator;

  constructor(page: Page) {
    super(page);
    this.pageReady = page.locator(".left-pannel");
  }

  async openPage(): Promise<void> {
    await test.step("Open DemoQA Interactions page", async () => {
      await this.open("interaction");
      await this.waitForLoad();
    });
  }

  async waitForLoad(): Promise<void> {
    await test.step("Wait for Interactions page to load", async () => {
      await expect(this.pageReady).toBeVisible();
    });
  }

  async isLoaded(): Promise<boolean> {
    return await this.pageReady.isVisible();
  }
}
