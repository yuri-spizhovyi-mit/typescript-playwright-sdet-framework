import { test, expect } from "../../../src/core/fixtures/test";
import { WebTablesPage } from "../../../src/apps/demoqa/pages/webTablesPage";
import { DataGenerator } from "../../../src/core/utils/dataGenerator";

test.describe("DemoQA Web Tables", () => {
  test("should add a new user to web tables @smoke", async ({ page }) => {
    const webTables = new WebTablesPage(page);

    const user = DataGenerator.webTableUser();

    await webTables.openPage();
    await webTables.addUser(user);

    const row = await webTables.getRowByEmail(user.email);
    expect(row).not.toBeNull();
  });
});
