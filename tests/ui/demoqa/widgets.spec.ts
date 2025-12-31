import { test, expect } from "../../../src/core/fixtures/test";
import { WidgetsPage } from "../../../src/apps/demoqa/pages/widgetsPage";

test("DemoQA Widgets page opens @smoke", async ({ page }) => {
  const widgets = new WidgetsPage(page);
  await widgets.openPage();
  expect(await widgets.isLoaded()).toBeTruthy();
});
