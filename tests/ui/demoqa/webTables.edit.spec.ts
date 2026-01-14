import { test, expect } from "../../../src/core/fixtures/test";
import { WebTablesPage } from "../../../src/apps/demoqa/pages/webTablesPage";
import { DataGenerator } from "../../../src/core/utils/dataGenerator";

test.describe("DemoQA Web Tables — Edit", () => {
  test("@smoke should edit existing row", async ({ page }) => {
    const webTables = new WebTablesPage(page);
    const user = DataGenerator.webTableUser();

    await webTables.openPage();
    await webTables.addUser(user);

    await webTables.openEditModal(user.email);
    await page.locator("#salary").fill("9000");
    await page.locator("#submit").click();

    const row = await webTables.getRowByEmail(user.email);
    expect(row).not.toBeNull();
    expect(await row?.textContent()).toContain("9000");
  });
});
