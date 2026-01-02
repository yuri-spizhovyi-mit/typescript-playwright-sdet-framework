import { test, expect, type Locator, type Page } from "@playwright/test";
import { BaseDemoQAPage } from "./baseDemoQaPage";

export class SortablePage extends BaseDemoQAPage {
  private readonly listTab: Locator;
  private readonly activePanel: Locator;

  constructor(page: Page) {
    super(page);
    this.listTab = page.locator("#demo-tab-list");
    this.activePanel = page.locator(".tab-pane.active.show");
  }

  // 🔹 Lazy locator (critical)
  private get items(): Locator {
    return this.activePanel.locator(".list-group-item");
  }

  async openPage(): Promise<void> {
    await test.step("Open Sortable page", async () => {
      await this.open("sortable");
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

  async getOrder(): Promise<string[]> {
    return await test.step("Read sortable order", async () => {
      const texts = await this.items.allTextContents();
      return texts.map(t => t.trim()).filter(Boolean);
    });
  }

  async moveItem(sourceText: string, targetText: string): Promise<void> {
    await test.step(`Move "${sourceText}" onto "${targetText}"`, async () => {
      const source = this.items.filter({ hasText: sourceText }).first();
      const target = this.items.filter({ hasText: targetText }).first();

      await expect(source).toBeVisible();
      await expect(target).toBeVisible();

      await source.dragTo(target);
    });
  }
}
