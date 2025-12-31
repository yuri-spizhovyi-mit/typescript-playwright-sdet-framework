import { test, expect } from '../../../src/core/fixtures/test';
import { InventoryPage } from '../../../src/apps/saucedemo/pages/inventoryPage';

test.describe('SauceDemo Cart', () => {
  test('should add item to cart @smoke', async ({ authenticatedPage }) => {
    const inventoryPage = new InventoryPage(authenticatedPage);
    
    await inventoryPage.addItemToCart('Sauce Labs Backpack');
    const cartCount = await inventoryPage.getCartCount();
    
    expect(cartCount).toBe(1);
  });
});
