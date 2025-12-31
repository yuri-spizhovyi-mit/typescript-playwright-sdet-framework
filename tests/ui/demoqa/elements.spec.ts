import { test, expect } from "@playwright/test";
import { ElementsPage } from "../../../src/apps/demoqa/pages/elementsPage";

test.describe("DemoQA Elements", () => {
  test("should load elements page @smoke", async ({ page }) => {
    const elementsPage = new ElementsPage(page);
    await elementsPage.openPage();

    expect(await elementsPage.isLoaded()).toBeTruthy();
  });
});
