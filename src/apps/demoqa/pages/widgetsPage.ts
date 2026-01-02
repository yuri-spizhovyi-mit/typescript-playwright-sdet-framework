import { test, expect, type Locator, type Page } from "@playwright/test";
import { BaseDemoQAPage } from "./baseDemoQaPage";

export class WidgetsPage extends BaseDemoQAPage {
  private readonly pageReady: Locator;
  private readonly sideMenuItems: Locator;

  constructor(page: Page) {
    super(page);
    this.pageReady = page.locator(".left-pannel");
    this.sideMenuItems = page.locator(".element-list .menu-list li");
  }

  async openPage(): Promise<void> {
    await test.step("Open DemoQA Widgets page", async () => {
      await this.open("widgets");
      await this.waitForLoad();
    });
  }

  async waitForLoad(): Promise<void> {
    await test.step("Wait for Widgets page to load", async () => {
      await expect(this.pageReady).toBeVisible();
    });
  }
  async openMenuItem(itemName: string): Promise<void> {
    await test.step(`Open Widgets menu item: ${itemName}`, async () => {
      await this.sideMenuItems.filter({ hasText: itemName }).first().click();
    });
  }
  async isLoaded(): Promise<boolean> {
    return await this.pageReady.isVisible();
  }
}
