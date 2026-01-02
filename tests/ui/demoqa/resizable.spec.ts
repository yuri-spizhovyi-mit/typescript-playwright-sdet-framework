import { test, expect } from "@playwright/test";
import { InteractionsPage } from "../../../src/apps/demoqa/pages/interactionsPage";
import { ResizablePage } from "../../../src/apps/demoqa/pages/resizablePage";

test.describe("DemoQA Resizable", () => {
  test("should resize element", async ({ page }) => {
    
  const interactionsPage = new InteractionsPage(page);
  await interactionsPage.openPage();

  const resizablePage = new ResizablePage(page);
  await resizablePage.openPage();

  const start = await resizablePage.getSize();
  await resizablePage.resizeBy(150, 150);
  const end = await resizablePage.getSize();

  expect(end.width).toBeGreaterThanOrEqual(start.width);
  expect(end.height).toBeGreaterThanOrEqual(start.height);
  });
});
