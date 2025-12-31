import { test as base, expect, type Page, type TestInfo } from "@playwright/test";
import { LoginPage } from '../../apps/saucedemo/pages/loginPage';
import { InventoryPage } from '../../apps/saucedemo/pages/inventoryPage';
import { Config } from '../config/env';
import { Logger } from '../utils/logger';


type TestFixtures = {
  authenticatedPage: Page;
  inventoryPage: InventoryPage;
  logger: Logger;
};

export const test = base.extend<TestFixtures>({

    logger: async ({}, use, testInfo: TestInfo) => {
    const scope = testInfo.titlePath.join(" > ");
    await use(new Logger({ scope }));
  },
  authenticatedPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.open();
    await loginPage.login(Config.SAUCE_USERNAME, Config.SAUCE_PASSWORD);

    const inventoryPage = new InventoryPage(page);
    await inventoryPage.waitForLoad();

    await use(page);
  },

    inventoryPage: async ({ authenticatedPage }, use) => {
    await use(new InventoryPage(authenticatedPage));
  },
});

export { expect };
