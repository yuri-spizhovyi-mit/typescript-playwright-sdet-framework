import { test, expect, type Locator, type Page } from "@playwright/test";
import { BaseDemoQAPage } from "./baseDemoQaPage";

export type WebTableUser = {
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  salary: number;
  department: string;
};

export class WebTablesPage extends BaseDemoQAPage {
  // Page header
  private readonly header: Locator;

  // Table
  private readonly rows: Locator;
  private readonly searchBox: Locator;

  // Buttons
  private readonly addBtn: Locator;

  // Modal + form
  private readonly modal: Locator;
  private readonly firstName: Locator;
  private readonly lastName: Locator;
  private readonly email: Locator;
  private readonly age: Locator;
  private readonly salary: Locator;
  private readonly department: Locator;
  private readonly submitBtn: Locator;

  constructor(page: Page) {
    super(page);

    this.header = page.locator(".main-header");

    this.rows = page.locator(".rt-tbody .rt-tr-group");
    this.searchBox = page.locator("#searchBox");
    this.addBtn = page.locator("#addNewRecordButton");

    this.modal = page.locator(".modal-content");
    this.firstName = page.locator("#firstName");
    this.lastName = page.locator("#lastName");
    this.email = page.locator("#userEmail");
    this.age = page.locator("#age");
    this.salary = page.locator("#salary");
    this.department = page.locator("#department");
    this.submitBtn = page.locator("#submit");
  }

  async openPage(): Promise<void> {
    await test.step("Open DemoQA Web Tables page", async () => {
      await this.open("webtables");
      await this.waitForLoad();
    });
  }

  async waitForLoad(): Promise<void> {
    await test.step("Wait for Web Tables page to load", async () => {
      await expect(this.page).toHaveURL(/webtables/);
      await expect(this.addBtn).toBeVisible();
      await expect(this.rows.first()).toBeVisible();
    });
  }

  async openAddModal(): Promise<void> {
    await test.step("Open Add Record modal", async () => {
      await this.addBtn.click();
      await expect(this.modal).toBeVisible();
    });
  }

  async addUser(user: WebTableUser): Promise<void> {
    await test.step(`Add user ${user.email}`, async () => {
      await this.openAddModal();

      await this.firstName.fill(user.firstName);
      await this.lastName.fill(user.lastName);
      await this.email.fill(user.email);
      await this.age.fill(String(user.age));
      await this.salary.fill(String(user.salary));
      await this.department.fill(user.department);

      await this.submitBtn.click();
      await expect(this.modal).toBeHidden();
    });
  }

  async search(value: string): Promise<void> {
    await test.step(`Search table for "${value}"`, async () => {
      await this.searchBox.fill(value);
    });
  }

  async getRowByEmail(email: string): Promise<Locator | null> {
    const count = await this.rows.count();

    for (let i = 0; i < count; i++) {
      const row = this.rows.nth(i);
      const text = await row.textContent();

      if (text?.includes(email)) {
        return row;
      }
    }
    return null;
  }

  async getRowCount(): Promise<number> {
    return this.rows.count();
  }
}
