import { test, expect } from "../../../src/core/fixtures/test";

test.describe("SauceDemo Cart", () => {
  test("should add item to cart @smoke", async ({ inventoryPage, logger }) => {
    logger.info("Adding item to cart", { item: "Sauce Labs Backpack" });

    await inventoryPage.addItemToCart("Sauce Labs Backpack");
    const cartCount = await inventoryPage.getCartCount();

    logger.info("Cart count", { cartCount });
    expect(cartCount).toBe(1);
  });
});
