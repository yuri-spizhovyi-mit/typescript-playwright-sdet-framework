import { test, expect, type Locator, type Page } from "@playwright/test";
import { BaseDemoQAPage } from "./baseDemoQaPage";
import { debugLocator } from "../../../core/utils/locatorDebug";
export class CheckBoxPage extends BaseDemoQAPage {
  private readonly header: Locator;
  private readonly expandAllBtn: Locator;
  private readonly collapseAllBtn: Locator;

  private readonly treeLabel: Locator;
  private readonly nodeTitle: Locator;

  private readonly resultItems: Locator;

  constructor(page: Page) {
    super(page);

    // ✅ Page readiness (same spirit as Python)
    this.header = page.locator("h1", { hasText: "Check Box" });

    // Controls
    this.expandAllBtn = page.locator("button[title='Expand all']");
    this.collapseAllBtn = page.locator("button[title='Collapse all']");

    // Tree
    this.treeLabel = page.locator(".rct-tree label");
    this.nodeTitle = page.locator(".rct-title");

    // Output
    this.resultItems = page.locator("#result span.text-success");
  }

async openPage(): Promise<void> {
  await test.step("Open Check Box page", async () => {
    await this.open("checkbox");

    // ✅ Python-equivalent readiness check
    await expect(this.page.locator("h1", { hasText: "Check Box" })).toBeVisible();

  });
}


async expandAll(): Promise<void> {
  await test.step("Expand all nodes", async () => {
    await this.expandAllBtn.click();
  });
}



  async collapseAll(): Promise<void> {
    await test.step("Collapse all nodes", async () => {
      await this.collapseAllBtn.click();
    });
  }


async select(itemName: string): Promise<void> {
  await test.step(`Select checkbox item: "${itemName}"`, async () => {
    const labels = this.page.locator("label");

    // 🔎 DEBUG
    await debugLocator(this.page, labels, "All labels");
    await debugLocator(
      this.page,
      this.page.locator(".rct-title"),
      "All rct-title nodes"
    );

    const label = labels
      .filter({
        has: this.page.locator(".rct-title", { hasText: itemName }),
      })
      .first();

    // 🔎 DEBUG specific locator
    await debugLocator(this.page, label, `Label for "${itemName}"`);

    await label.locator(".rct-checkbox").click();
  });
}



  async selectedItems(): Promise<string[]> {
    return await test.step("Read selected items", async () => {
      // Result list appears after a real toggle
      await expect(this.resultItems.first()).toBeVisible();
      return await this.resultItems.allTextContents();
    });
  }
}
