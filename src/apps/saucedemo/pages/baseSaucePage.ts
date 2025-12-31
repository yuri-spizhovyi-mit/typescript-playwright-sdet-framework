import type { Page } from "@playwright/test";
import { Config } from "../../../core/config/env";
import { BasePage } from "../../../core/pages/basePage";

export class BaseSaucePage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async open(path = ""): Promise<void> {
    await super.open(Config.SAUCE_URL, path);
  }
}
