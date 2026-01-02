import { test, expect, type Locator, type Page } from "@playwright/test";
import { BaseDemoQAPage } from "./baseDemoQaPage";

export class InteractionsPage extends BaseDemoQAPage {
  private readonly pageReady: Locator;
  private readonly sideMenuItems: Locator;

  constructor(page: Page) {
    super(page);
    this.pageReady = page.locator(".left-pannel");
    this.sideMenuItems = page.locator(".element-list .menu-list li");
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

  async openMenuItem(itemName: string): Promise<void> {
    await test.step(`Open Interactions menu item: ${itemName}`, async () => {
      await this.sideMenuItems
        .filter({ hasText: itemName })
        .first()
        .click();
    });
  }
  async isLoaded(): Promise<boolean> {
    return await this.pageReady.isVisible();
  }
}
