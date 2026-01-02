import { test, expect, type Locator, type Page } from "@playwright/test";
import { BaseDemoQAPage } from "./baseDemoQaPage";

export class SelectablePage extends BaseDemoQAPage {
  private readonly listTab: Locator;
  private readonly activePanel: Locator;

  constructor(page: Page) {
    super(page);
    this.listTab = page.locator("#demo-tab-list");
    this.activePanel = page.locator(".tab-pane.active.show");
  }

  private get items(): Locator {
    return this.activePanel.locator(".list-group-item");
  }

  async openPage(): Promise<void> {
    await test.step("Open Selectable page", async () => {
      await this.open("selectable");
      await expect(this.listTab).toBeVisible();
      await expect(this.activePanel).toBeVisible();
    });
  }

  async ensureListTab(): Promise<void> {
    await test.step("Ensure List tab is active", async () => {
      await this.listTab.click();
      await expect(this.items.first()).toBeVisible();
    });
  }

  async selectItemByText(text: string): Promise<void> {
    await test.step(`Select item "${text}"`, async () => {
      const item = this.items.filter({ hasText: text }).first();
      await expect(item).toBeVisible();
      await item.click();
    });
  }

  async isItemSelected(text: string): Promise<boolean> {
    return await test.step(`Check if "${text}" is selected`, async () => {
      const item = this.items.filter({ hasText: text }).first();
      const classAttr = await item.getAttribute("class");
      return classAttr?.includes("active") ?? false;
    });
  }
}
