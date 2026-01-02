import { test, expect, type Locator, type Page } from "@playwright/test";
import { BaseDemoQAPage } from "./baseDemoQaPage";

type Size = { width: number; height: number };

export class ResizablePage extends BaseDemoQAPage {
  private readonly resizableBox: Locator;
  private readonly resizeHandle: Locator;

  constructor(page: Page) {
    super(page);
    this.resizableBox = page.locator("#resizableBoxWithRestriction");
    this.resizeHandle = this.resizableBox.locator("span.react-resizable-handle");
  }

  async openPage(): Promise<void> {
    await test.step("Open Resizable page", async () => {
      await this.open("resizable");
      await expect(this.resizableBox).toBeVisible();
    });
  }

  async getSize(): Promise<Size> {
    const box = await this.resizableBox.boundingBox();
    if (!box) {
      throw new Error("Resizable box not found");
    }
    return { width: box.width, height: box.height };
  }

  async resizeBy(x: number, y: number): Promise<void> {
    await test.step(`Resize element by x=${x}, y=${y}`, async () => {
      const handleBox = await this.resizeHandle.boundingBox();
      if (!handleBox) {
        throw new Error("Resize handle not found");
      }

      await this.page.mouse.move(
        handleBox.x + handleBox.width / 2,
        handleBox.y + handleBox.height / 2
      );
      await this.page.mouse.down();
      await this.page.mouse.move(
        handleBox.x + handleBox.width / 2 + x,
        handleBox.y + handleBox.height / 2 + y
      );
      await this.page.mouse.up();
    });
  }
}
