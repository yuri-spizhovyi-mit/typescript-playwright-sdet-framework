import { Page, expect } from '@playwright/test';
import { BaseSaucePage } from './baseSaucePage';

export class InventoryPage extends BaseSaucePage {
  private readonly title = '.title';
  private readonly inventoryItem = '.inventory_item';
  private readonly cartBadge = '.shopping_cart_badge';

  constructor(page: Page) {
    super(page);
  }

  async waitForLoad(): Promise<void> {
    await expect(this.page.locator(this.title)).toBeVisible();
  }

  async isLoaded(): Promise<boolean> {
    return await this.page.locator(this.title).isVisible();
  }

  async getTitle(): Promise<string> {
    return await this.page.textContent(this.title) || '';
  }

  async getItemsCount(): Promise<number> {
    return await this.page.locator(this.inventoryItem).count();
  }

  async addItemToCart(itemName: string): Promise<void> {
    await this.page.locator(	ext=).locator('..').locator('button').click();
  }

  async getCartCount(): Promise<number> {
    const badge = this.page.locator(this.cartBadge);
    if (await badge.isVisible()) {
      const text = await badge.textContent();
      return parseInt(text || '0');
    }
    return 0;
  }
}
