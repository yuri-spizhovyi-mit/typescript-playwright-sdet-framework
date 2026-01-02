import { test, expect } from "../../../src/core/fixtures/test";
import { InteractionsPage } from "../../../src/apps/demoqa/pages/interactionsPage";
import { SelectablePage } from "../../../src/apps/demoqa/pages/selectablePage";

test.describe("DemoQA Selectable", () => {
  test("should mark item as selected using semantic state @smoke", async ({ page }) => {
    const interactions = new InteractionsPage(page);
    await interactions.openPage();
    await interactions.openMenuItem("Selectable");

    const selectable = new SelectablePage(page);
    await selectable.openPage();
    await selectable.ensureListTab();

    await selectable.selectItemByText("Cras justo odio");

    expect(await selectable.isItemSelected("Cras justo odio")).toBe(true);
  });
});
