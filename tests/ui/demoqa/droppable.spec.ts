import { test, expect } from "@playwright/test";
import { InteractionsPage } from "../../../src/apps/demoqa/pages/interactionsPage";
import { DroppablePage } from "../../../src/apps/demoqa/pages/droppablePage";

test.describe("DemoQA Droppable", () => {
  test("should drop element successfully @smoke", async ({ page }) => {
    const interactionsPage = new InteractionsPage(page);
    await interactionsPage.openPage();
    await interactionsPage.openMenuItem("Droppable");

    const droppablePage = new DroppablePage(page);
    await droppablePage.openPage();

    await droppablePage.dragToDrop();

    const dropText = await droppablePage.getDropText();
    expect(dropText).toContain("Dropped!");
  });
});
