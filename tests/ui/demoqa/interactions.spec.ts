import { test, expect } from "../../../src/core/fixtures/test";
import { InteractionsPage } from "../../../src/apps/demoqa/pages/interactionsPage";

test("DemoQA Interactions page opens @smoke", async ({ page }) => {
  const interactions = new InteractionsPage(page);
  await interactions.openPage();
  expect(await interactions.isLoaded()).toBeTruthy();
});
