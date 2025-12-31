import { test, expect } from "../../../src/core/fixtures/test";
import { LoginPage } from "../../../src/apps/saucedemo/pages/loginPage";
import { InventoryPage } from "../../../src/apps/saucedemo/pages/inventoryPage";
import { Config } from "../../../src/core/config/env";

test.describe("SauceDemo Login", () => {
  test("should login successfully with valid credentials @smoke", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.open();
    await loginPage.login(Config.SAUCE_USERNAME, Config.SAUCE_PASSWORD);

    const inventoryPage = new InventoryPage(page);
    await inventoryPage.waitForLoad();

    const title = await inventoryPage.getTitle();
    expect(title).toContain("Products");
  });

  test("should show error with locked out user", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.open();
    await loginPage.login(Config.SAUCE_LOCKED_OUT_USER, Config.SAUCE_PASSWORD);

    const errorText = await loginPage.getErrorText();
    expect(errorText.toLowerCase()).toContain("locked out");
  });
});
