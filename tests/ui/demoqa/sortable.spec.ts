import { test, expect } from "../../../src/core/fixtures/test";
import { InteractionsPage } from "../../../src/apps/demoqa/pages/interactionsPage";
import { SortablePage } from "../../../src/apps/demoqa/pages/sortablePage";

test.describe("DemoQA Sortable", () => {
  test("should change order in List tab (text-based) @smoke", async ({ page }) => {
    const interactions = new InteractionsPage(page);
    await interactions.openPage();
    await interactions.openMenuItem("Sortable");

    const sortable = new SortablePage(page);
    await sortable.openPage();
    await sortable.ensureListTab();

    const before = await sortable.getOrder();

    // DemoQA default items are typically: One..Six
    await sortable.moveItem("One", "Six");

    const after = await sortable.getOrder();

    expect(after.join("|")).not.toBe(before.join("|"));

    expect(after[after.length - 1]).toBe("One");
  });
});
