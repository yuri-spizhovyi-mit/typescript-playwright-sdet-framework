import { test, expect, type Locator, type Page } from "@playwright/test";
import { BaseDemoQAPage } from "./baseDemoQaPage";

export class DraggablePage extends BaseDemoQAPage {
  private readonly draggableBox: Locator;

  constructor(page: Page) {
    super(page);
    this.draggableBox = page.locator("#dragBox");
  }

  async openPage(): Promise<void> {
    await test.step("Open DemoQA Draggable page", async () => {
      await this.open("dragabble");
      await expect(this.draggableBox).toBeVisible();
    });
  }

  async dragBy(offsetX: number, offsetY: number): Promise<void> {
    await test.step(`Drag box by (${offsetX}, ${offsetY})`, async () => {
      const box = await this.draggableBox.boundingBox();
      if (!box) throw new Error("Draggable box not visible");

      await this.page.mouse.move(
        box.x + box.width / 2,
        box.y + box.height / 2
      );
      await this.page.mouse.down();
      await this.page.mouse.move(
        box.x + box.width / 2 + offsetX,
        box.y + box.height / 2 + offsetY
      );
      await this.page.mouse.up();
    });
  }

  async getPosition(): Promise<{ x: number; y: number }> {
    const box = await this.draggableBox.boundingBox();
    if (!box) throw new Error("Draggable box not visible");
    return { x: box.x, y: box.y };
  }
}
