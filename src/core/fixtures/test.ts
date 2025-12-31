import { test as base, Page } from '@playwright/test';
import { LoginPage } from '../../apps/saucedemo/pages/loginPage';
import { InventoryPage } from '../../apps/saucedemo/pages/inventoryPage';
import { Config } from '../config/env';

type TestFixtures = {
  authenticatedPage: Page;
};

export const test = base.extend<TestFixtures>({
  authenticatedPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.open();
    await loginPage.login(Config.SAUCE_USERNAME, Config.SAUCE_PASSWORD);

    const inventoryPage = new InventoryPage(page);
    await inventoryPage.waitForLoad();

    await use(page);
  },
});

export { expect } from '@playwright/test';
