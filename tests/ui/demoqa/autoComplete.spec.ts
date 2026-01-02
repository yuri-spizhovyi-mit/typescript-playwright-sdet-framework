import { test, expect } from "../../../src/core/fixtures/test";
import { WidgetsPage } from "../../../src/apps/demoqa/pages/widgetsPage";
import { AutoCompletePage } from "../../../src/apps/demoqa/pages/autoCompletePage";

test.describe("DemoQA Auto Complete", () => {
  test("should add multiple colors @smoke", async ({ page }) => {
    const widgetsPage = new WidgetsPage(page);
    await widgetsPage.openPage();
    await widgetsPage.openMenuItem("Auto Complete");

    const autoCompletePage = new AutoCompletePage(page);
    await autoCompletePage.openPage();

    await autoCompletePage.addMultiColor("Red");
    await autoCompletePage.addMultiColor("Blue");

    const selected = await autoCompletePage.getMultiSelectedValues();
    expect(selected).toContain("Red");
    expect(selected).toContain("Blue");
  });

  test("should select single color", async ({ page }) => {
    const widgetsPage = new WidgetsPage(page);
    await widgetsPage.openPage();
    await widgetsPage.openMenuItem("Auto Complete");

    const autoCompletePage = new AutoCompletePage(page);
    await autoCompletePage.openPage();

    await autoCompletePage.setSingleColor("Green");
    expect(await autoCompletePage.getSingleSelectedValue()).toBe("Green");
  });
});
