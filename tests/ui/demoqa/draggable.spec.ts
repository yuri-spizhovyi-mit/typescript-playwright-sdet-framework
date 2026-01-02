import { test, expect } from "../../../src/core/fixtures/test";
import { InteractionsPage } from "../../../src/apps/demoqa/pages/interactionsPage";
import { DraggablePage } from "../../../src/apps/demoqa/pages/draggablePage";

test.describe("DemoQA Draggable", () => {
  test("should drag element to new position @smoke", async ({ page }) => {
    const interactionsPage = new InteractionsPage(page);
    await interactionsPage.openPage();
    await interactionsPage.openMenuItem("Dragabble");

    const draggablePage = new DraggablePage(page);
    await draggablePage.openPage();

    const start = await draggablePage.getPosition();
    await draggablePage.dragBy(100, 50);
    const end = await draggablePage.getPosition();

    expect(end.x).not.toBe(start.x);
    expect(end.y).not.toBe(start.y);
  });
});
