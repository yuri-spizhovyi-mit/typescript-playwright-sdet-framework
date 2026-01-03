import { test, expect } from "../../../src/core/fixtures/test";
import { ElementsPage } from "../../../src/apps/demoqa/pages/elementsPage";
import { RadioButtonPage } from "../../../src/apps/demoqa/pages/radioButtonPage";

test.describe("DemoQA Radio Button", () => {
  test("should select Yes and show result text @smoke", async ({ page }) => {
    const elements = new ElementsPage(page);
    await elements.openPage();
    await elements.openMenuItem("Radio Button");

    const radio = new RadioButtonPage(page);
    await radio.openPage();

    await radio.selectYes();

    const result = await radio.getResultText();
    expect(result).toContain("Yes");

    const isNoDisabled = await radio.isNoDisabled();
    expect(isNoDisabled).toBe(true);
  });
});
