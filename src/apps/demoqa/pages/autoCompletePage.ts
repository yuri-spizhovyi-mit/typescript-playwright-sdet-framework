import { test, expect, type Locator, type Page } from "@playwright/test";
import { BaseDemoQAPage } from "./baseDemoQaPage";

export class AutoCompletePage extends BaseDemoQAPage {
  private readonly multiInput: Locator;
  private readonly singleInput: Locator;
  private readonly multiValues: Locator;
  private readonly singleValue: Locator;

  constructor(page: Page) {
    super(page);
    this.multiInput = page.locator("#autoCompleteMultipleInput");
    this.singleInput = page.locator("#autoCompleteSingleInput");
    this.multiValues = page.locator(".css-12jo7m5");
    this.singleValue = page.locator(".auto-complete__single-value");
  }

  async openPage(): Promise<void> {
    await test.step("Open Auto Complete page", async () => {
      await this.open("auto-complete");
      await expect(this.multiInput).toBeVisible();
    });
  }

  async addMultiColor(color: string): Promise<void> {
    await test.step(`Add multi color: ${color}`, async () => {
      await this.multiInput.fill(color);
      await this.page.keyboard.press("Enter");
    });
  }

  async getMultiSelectedValues(): Promise<string[]> {
    return await this.multiValues.allTextContents();
  }

  async setSingleColor(color: string): Promise<void> {
    await test.step(`Set single color: ${color}`, async () => {
      await this.singleInput.fill(color);
      await this.page.keyboard.press("Enter");
    });
  }

  async getSingleSelectedValue(): Promise<string> {
    return (await this.singleValue.textContent())?.trim() ?? "";
  }
}
