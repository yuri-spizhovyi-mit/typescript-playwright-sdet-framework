import { test, expect, type Locator, type Page } from "@playwright/test";
import { BaseDemoQAPage } from "./baseDemoQaPage";

export class TextBoxPage extends BaseDemoQAPage {
  private readonly header: Locator;

  private readonly fullName: Locator;
  private readonly email: Locator;
  private readonly currentAddress: Locator;
  private readonly permanentAddress: Locator;
  private readonly submitBtn: Locator;

  private readonly output: Locator;
  private readonly outName: Locator;
  private readonly outEmail: Locator;
  private readonly outCurrentAddress: Locator;
  private readonly outPermanentAddress: Locator;

  constructor(page: Page) {
    super(page);

    this.header = page.locator(".main-header");

    this.fullName = page.locator("#userName");
    this.email = page.locator("#userEmail");
    this.currentAddress = page.locator("#currentAddress");
    this.permanentAddress = page.locator("#permanentAddress");
    this.submitBtn = page.locator("#submit");

    this.output = page.locator("#output");
    this.outName = page.locator("#name");
    this.outEmail = page.locator("#email");
    this.outCurrentAddress = page.locator("#currentAddress").nth(1); // output uses same id text, DemoQA is weird
    this.outPermanentAddress = page.locator("#permanentAddress").nth(1);
  }

  async openPage(): Promise<void> {
    await test.step("Open DemoQA Text Box page", async () => {
      await this.open("text-box");
      await this.waitForLoad();
    });
  }

  async waitForLoad(): Promise<void> {
    await test.step("Wait for Text Box page to load", async () => {
      await expect(this.page).toHaveURL(/text-box/);
      await expect(this.fullName).toBeVisible();
    });
  }

  async fillForm(data: {
    fullName: string;
    email: string;
    currentAddress: string;
    permanentAddress: string;
  }): Promise<void> {
    await test.step("Fill Text Box form", async () => {
      await this.fullName.fill(data.fullName);
      await this.email.fill(data.email);
      await this.currentAddress.fill(data.currentAddress);
      await this.permanentAddress.fill(data.permanentAddress);
    });
  }

  async submit(): Promise<void> {
    await test.step("Submit Text Box form", async () => {
      // Button can be below the fold sometimes
      await this.submitBtn.scrollIntoViewIfNeeded();
      await this.submitBtn.click();
      await expect(this.output).toBeVisible();
    });
  }

  async getOutput(): Promise<{
    name: string;
    email: string;
    currentAddress: string;
    permanentAddress: string;
  }> {
    return await test.step("Read submitted output", async () => {
      const name = (await this.outName.textContent()) ?? "";
      const email = (await this.outEmail.textContent()) ?? "";
      const current = (await this.outCurrentAddress.textContent()) ?? "";
      const permanent = (await this.outPermanentAddress.textContent()) ?? "";

      return {
        name: name.trim(),
        email: email.trim(),
        currentAddress: current.trim(),
        permanentAddress: permanent.trim(),
      };
    });
  }
}
