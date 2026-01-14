import { test, expect } from "../../../src/core/fixtures/test";
import { WebTablesPage } from "../../../src/apps/demoqa/pages/webTablesPage";
import { DataGenerator } from "../../../src/core/utils/dataGenerator";

test.describe("DemoQA Web Tables — Delete", () => {
  test("@smoke should delete a row", async ({ page }) => {
    const webTables = new WebTablesPage(page);
    const user = DataGenerator.webTableUser();

    await webTables.openPage();
    await webTables.addUser(user);

    expect(await webTables.rowExists(user.email)).toBeTruthy();

    await webTables.deleteRow(user.email);

    expect(await webTables.rowExists(user.email)).toBeFalsy();
  });
});
