import { test, expect, type Locator, type Page } from "@playwright/test";
import { BaseDemoQAPage } from "./baseDemoQaPage";

export class SliderPage extends BaseDemoQAPage {
  private readonly slider: Locator;
  private readonly valueInput: Locator;

  constructor(page: Page) {
    super(page);

    this.slider = page.locator("#sliderContainer input[type='range']");
    this.valueInput = page.locator("#sliderValue");
  }

  async openPage(): Promise<void> {
    await test.step("Open Slider page", async () => {
      await this.open("slider");

      await expect(this.slider).toBeVisible();
      await expect(this.valueInput).toBeVisible();
    });
  }

  async getValue(): Promise<number> {
    return Number(await this.valueInput.inputValue());
  }

  async moveRight(steps: number): Promise<void> {
    await test.step(`Move slider right ${steps} steps`, async () => {
      await this.slider.focus();
      for (let i = 0; i < steps; i++) {
        await this.page.keyboard.press("ArrowRight");
      }
    });
  }

  async moveLeft(steps: number): Promise<void> {
    await test.step(`Move slider left ${steps} steps`, async () => {
      await this.slider.focus();
      for (let i = 0; i < steps; i++) {
        await this.page.keyboard.press("ArrowLeft");
      }
    });
  }
}
