import type { Locator, Page } from "@playwright/test";

export class BasePage {
  constructor(protected readonly page: Page) {}

  async goto(url: string): Promise<void> {
    await this.page.goto(url, { waitUntil: "domcontentloaded" });
  }

  async safeClick(target: Locator, name = "element"): Promise<void> {
    await target.waitFor({ state: "visible" });
    await target.scrollIntoViewIfNeeded();
    await target.click({ timeout: 10_000 });
  }

  async safeFill(
    target: Locator,
    value: string,
    name = "field"
  ): Promise<void> {
    await target.waitFor({ state: "visible" });
    await target.scrollIntoViewIfNeeded();
    await target.fill(value);
  }

  async text(target: Locator): Promise<string> {
    await target.waitFor({ state: "visible" });
    return (await target.innerText()).trim();
  }

  async waitForUrlContains(part: string): Promise<void> {
    await this.page.waitForURL((url) => url.toString().includes(part), {
      timeout: 15_000,
    });
  }
}
