import { test, expect } from "../../../src/core/fixtures/test";
import { WebTablesPage } from "../../../src/apps/demoqa/pages/webTablesPage";
import { DataGenerator } from "../../../src/core/utils/dataGenerator";

test.describe("DemoQA Web Tables — Validation", () => {
  test("@regression should not submit form with empty required fields", async ({
    page,
  }) => {
    const webTables = new WebTablesPage(page);

    await webTables.openPage();
    await webTables.openAddModal();

    // submit empty form
    await page.locator("#submit").click();

    // modal must remain open
    await expect(page.locator(".modal-content")).toBeVisible();
  });

  test("@regression should not submit with invalid email format", async ({
    page,
  }) => {
    const webTables = new WebTablesPage(page);

    await webTables.openPage();
    await webTables.openAddModal();

    await page.fill("#firstName", DataGenerator.firstName());
    await page.fill("#lastName", DataGenerator.lastName());
    await page.fill("#userEmail", "invalid-email"); // controlled invalid
    await page.fill("#age", "30");
    await page.fill("#salary", "5000");
    await page.fill("#department", "QA");

    await page.locator("#submit").click();

    await expect(page.locator(".modal-content")).toBeVisible();
  });

  test("@regression should not submit with non-numeric age", async ({
    page,
  }) => {
    const webTables = new WebTablesPage(page);

    await webTables.openPage();
    await webTables.openAddModal();

    await page.fill("#firstName", DataGenerator.firstName());
    await page.fill("#lastName", DataGenerator.lastName());
    await page.fill("#userEmail", DataGenerator.email());
    await page.fill("#age", "abc"); // invalid
    await page.fill("#salary", "5000");
    await page.fill("#department", "QA");

    await page.locator("#submit").click();

    await expect(page.locator(".modal-content")).toBeVisible();
  });

  test("@regression should not submit with negative age", async ({ page }) => {
    const webTables = new WebTablesPage(page);

    await webTables.openPage();
    await webTables.openAddModal();

    await page.fill("#firstName", DataGenerator.firstName());
    await page.fill("#lastName", DataGenerator.lastName());
    await page.fill("#userEmail", DataGenerator.email());
    await page.fill("#age", "-1"); // invalid
    await page.fill("#salary", "5000");
    await page.fill("#department", "QA");

    await page.locator("#submit").click();

    await expect(page.locator(".modal-content")).toBeVisible();
  });
});
