import type { Page } from "@playwright/test";
import { Config } from "../../../core/config/env";
import { BasePage } from "../../../core/pages/basePage";

export class BaseDemoQAPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async open(path: string): Promise<void> {
    await super.open(Config.DEMOQA_URL, path);
  }
}
