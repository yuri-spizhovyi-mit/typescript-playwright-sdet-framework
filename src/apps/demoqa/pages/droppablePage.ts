import { test, expect, type Locator, type Page } from "@playwright/test";
import { BaseDemoQAPage } from "./baseDemoQaPage";

export class DroppablePage extends BaseDemoQAPage {
  private readonly activePanel: Locator;
  private readonly draggable: Locator;
  private readonly droppable: Locator;

  constructor(page: Page) {
    super(page);

    this.activePanel = page.locator(".tab-pane.active.show");

    this.draggable = this.activePanel.locator("#draggable");
    this.droppable = this.activePanel.locator("#droppable");
  }

  async openPage(): Promise<void> {
    await test.step("Open Droppable page", async () => {
      await this.open("droppable");
      await expect(this.activePanel).toBeVisible();
      await expect(this.draggable).toBeVisible();
      await expect(this.droppable).toBeVisible();
    });
  }

  async dragToDrop(): Promise<void> {
    await test.step("Drag element into droppable", async () => {
      await this.draggable.dragTo(this.droppable);
    });
  }

  async getDropText(): Promise<string> {
    return (await this.droppable.textContent())?.trim() ?? "";
  }
}
