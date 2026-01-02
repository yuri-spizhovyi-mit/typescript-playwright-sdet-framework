import { test, expect } from "../../../src/core/fixtures/test";
import { WidgetsPage } from "../../../src/apps/demoqa/pages/widgetsPage";
import { SliderPage } from "../../../src/apps/demoqa/pages/sliderPage";

test.describe("DemoQA Slider", () => {
  test("should change value using keyboard only @smoke", async ({ page }) => {
    const widgets = new WidgetsPage(page);
    await widgets.openPage();
    await widgets.openMenuItem("Slider");

    const slider = new SliderPage(page);
    await slider.openPage();

    const initial = await slider.getValue();

    await slider.moveRight(5);

    const increased = await slider.getValue();
    expect(increased).toBeGreaterThan(initial);

    await slider.moveLeft(3);

    const decreased = await slider.getValue();
    expect(decreased).toBeLessThan(increased);
  });
});
