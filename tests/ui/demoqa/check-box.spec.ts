import { test, expect } from "../../../src/core/fixtures/test";
import { ElementsPage } from "../../../src/apps/demoqa/pages/elementsPage";
import { CheckBoxPage } from "../../../src/apps/demoqa/pages/checkBoxPage";

test.describe("DemoQA Check Box", () => {
  test("should select checkbox item and show it in results @smoke", async ({ page }) => {
    const elements = new ElementsPage(page);
    await elements.openPage();
    await elements.openMenuItem("Check Box");

    const checkBox = new CheckBoxPage(page);
    await checkBox.openPage();

    await checkBox.expandAll();
    await checkBox.select("Desktop");

    const selected = (await checkBox.selectedItems()).map((s) => s.trim().toLowerCase());
    expect(selected).toContain("desktop");
  });
});
