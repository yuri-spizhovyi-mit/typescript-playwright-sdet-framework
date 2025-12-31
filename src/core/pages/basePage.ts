import type { Locator, Page } from "@playwright/test";

export class BasePage {
  constructor(protected readonly page: Page) {}

  // --- navigation ---
  async goto(url: string): Promise<void> {
    await this.page.goto(url, { waitUntil: "domcontentloaded" });
  }

  async open(baseUrl: string, path = ""): Promise<void> {
    const url = path ? `${baseUrl.replace(/\/$/, "")}/${path}` : baseUrl;
    await this.goto(url);
  }

  // --- waits ---
  async waitForDomReady(): Promise<void> {
    await this.page.waitForLoadState("domcontentloaded");
  }

  async waitForNetworkIdle(): Promise<void> {
    await this.page.waitForLoadState("networkidle");
  }

  async expectVisible(target: Locator, name = "element"): Promise<void> {
    await target.waitFor({ state: "visible", timeout: 10_000 });
  }

  async expectHidden(target: Locator, name = "element"): Promise<void> {
    await target.waitFor({ state: "hidden", timeout: 10_000 });
  }

  // --- stable actions ---
  async safeClick(target: Locator, name = "element"): Promise<void> {
    await this.expectVisible(target, name);
    await target.scrollIntoViewIfNeeded();
    await target.click({ timeout: 10_000 });
  }

  async safeFill(target: Locator, value: string, name = "field"): Promise<void> {
    await this.expectVisible(target, name);
    await target.scrollIntoViewIfNeeded();
    await target.fill(value);
  }

  async safeType(
    target: Locator,
    value: string,
    name = "field",
    delayMs = 15
  ): Promise<void> {
    await this.expectVisible(target, name);
    await target.scrollIntoViewIfNeeded();
    await target.fill("");
    await target.type(value, { delay: delayMs });
  }

  async text(target: Locator, name = "element"): Promise<string> {
    await this.expectVisible(target, name);
    return (await target.innerText()).trim();
  }

  async waitForUrlContains(part: string): Promise<void> {
    await this.page.waitForURL((url) => url.toString().includes(part), {
      timeout: 15_000,
    });
  }
}
