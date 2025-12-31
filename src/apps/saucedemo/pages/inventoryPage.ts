import { test, expect, type Locator, type Page } from "@playwright/test";
import { BaseSaucePage } from "./baseSaucePage";

export class InventoryPage extends BaseSaucePage {
  private readonly title: Locator;
  private readonly inventoryItems: Locator;
  private readonly cartBadge: Locator;

  constructor(page: Page) {
    super(page);
    this.title = page.locator(".title");
    this.inventoryItems = page.locator(".inventory_item");
    this.cartBadge = page.locator(".shopping_cart_badge");
  }

  async waitForLoad(): Promise<void> {
    await test.step("Wait for Inventory page to load", async () => {
      await expect(this.title).toBeVisible();
    });
  }

  async isLoaded(): Promise<boolean> {
    return await this.title.isVisible();
  }

  async getTitle(): Promise<string> {
    return await test.step("Read Inventory page title", async () => {
      return await this.text(this.title, "inventory title");
    });
  }

  async getItemsCount(): Promise<number> {
    return await test.step("Count inventory items", async () => {
      return await this.inventoryItems.count();
    });
  }

  async addItemToCart(itemName: string): Promise<void> {
    await test.step(`Add item to cart: ${itemName}`, async () => {
      const item = this.inventoryItems.filter({ hasText: itemName });
      const addBtn = item.locator("button");

      await this.safeClick(addBtn, `add-to-cart button for ${itemName}`);
    });
  }

  async getCartCount(): Promise<number> {
    return await test.step("Read cart badge count", async () => {
      if (await this.cartBadge.isVisible()) {
        const raw = (await this.cartBadge.textContent())?.trim() ?? "0";
        const num = Number(raw);
        return Number.isFinite(num) ? num : 0;
      }
      return 0;
    });
  }
}
