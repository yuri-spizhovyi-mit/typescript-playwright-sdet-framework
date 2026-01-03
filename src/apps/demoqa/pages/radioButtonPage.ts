import { test, expect, type Locator, type Page } from "@playwright/test";
import { BaseDemoQAPage } from "./baseDemoQaPage";

export class RadioButtonPage extends BaseDemoQAPage {
  private readonly header: Locator;

  private readonly yesRadioLabel: Locator;
  private readonly impressiveRadioLabel: Locator;
  private readonly noRadioInput: Locator;

  private readonly resultText: Locator;

  constructor(page: Page) {
    super(page);

    // Page readiness
    this.header = page.locator("h1", { hasText: "Radio Button" });

    // Labels are the real click targets (inputs are hidden)
    this.yesRadioLabel = page.locator("label[for='yesRadio']");
    this.impressiveRadioLabel = page.locator("label[for='impressiveRadio']");

    // "No" is disabled — input exists, label is not clickable
    this.noRadioInput = page.locator("#noRadio");

    // Result
    this.resultText = page.locator(".text-success");
  }

  async openPage(): Promise<void> {
    await test.step("Open Radio Button page", async () => {
      await this.open("radio-button");

      await expect(this.header).toBeVisible();
      await expect(this.yesRadioLabel).toBeVisible();
    });
  }

  async selectYes(): Promise<void> {
    await test.step("Select 'Yes' radio button", async () => {
      await this.yesRadioLabel.click();
    });
  }

  async selectImpressive(): Promise<void> {
    await test.step("Select 'Impressive' radio button", async () => {
      await this.impressiveRadioLabel.click();
    });
  }

  async isNoDisabled(): Promise<boolean> {
    return await test.step("Check that 'No' radio button is disabled", async () => {
      return await this.noRadioInput.isDisabled();
    });
  }

  async getResultText(): Promise<string> {
    let text = "";

    await test.step("Read result text", async () => {
      await expect(this.resultText).toBeVisible();
      text = (await this.resultText.textContent()) ?? "";
    });

    return text;
  }
}
