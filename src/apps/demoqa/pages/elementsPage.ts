import { test, expect, type Locator, type Page } from "@playwright/test";
import { BaseDemoQAPage } from "./baseDemoQaPage";

export class ElementsPage extends BaseDemoQAPage {
  private readonly pageReady: Locator;
  private readonly sideMenuItems: Locator;

  constructor(page: Page) {
    super(page);
    this.pageReady = page.locator(".left-pannel");
    this.sideMenuItems = page.locator(".element-list .menu-list li");
  }

  async openPage(): Promise<void> {
    await test.step("Open DemoQA Elements page", async () => {
      await this.open("elements");
      await this.waitForLoad();
    });
  }

  async waitForLoad(): Promise<void> {
    await test.step("Wait for Elements page to load", async () => {
      await expect(this.pageReady).toBeVisible();
    });
  }

  async isLoaded(): Promise<boolean> {
    return await this.pageReady.isVisible();
  }

  async openMenuItem(itemName: string): Promise<void> {
    await test.step(`Open Elements menu item: ${itemName}`, async () => {
      const item = this.sideMenuItems.filter({ hasText: itemName });
      await this.safeClick(item, `side menu item: ${itemName}`);
    });
  }
}
