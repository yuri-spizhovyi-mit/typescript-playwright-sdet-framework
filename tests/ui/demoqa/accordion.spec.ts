import { test, expect } from "../../../src/core/fixtures/test";
import { WidgetsPage } from "../../../src/apps/demoqa/pages/widgetsPage";
import { AccordionPage } from "../../../src/apps/demoqa/pages/accordionPage";

test.describe("DemoQA Accordion", () => {
  test("should expand section and show content @smoke", async ({ page }) => {
const widgets = new WidgetsPage(page);
  await widgets.openPage();
  await widgets.openMenuItem("Accordian");

  const accordion = new AccordionPage(page);
  await accordion.openPage();

  await accordion.openSection(1);

  const visible = await accordion.isSectionOpen(1);
  expect(visible).toBe(true);
  });
});
