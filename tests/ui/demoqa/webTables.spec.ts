import { test, expect } from "../../../src/core/fixtures/test";
import { WebTablesPage } from "../../../src/apps/demoqa/pages/webTablesPage";
import { DataGenerator } from "../../../src/core/utils/dataGenerator";

test.describe("DemoQA Web Tables", () => {
  test("should add a new user to web tables @smoke", async ({ page }) => {
    const webTables = new WebTablesPage(page);

    const user = {
      firstName: DataGenerator.firstName(),
      lastName: DataGenerator.lastName(),
      email: DataGenerator.email(),
      age: 30,
      salary: 5000,
      department: "QA",
    };

    await webTables.openPage();
    await webTables.addUser(user);

    const row = await webTables.getRowByEmail(user.email);
    expect(row).not.toBeNull();
  });
});
