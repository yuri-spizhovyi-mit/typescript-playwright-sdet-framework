import { Page } from '@playwright/test';
import { Config } from '../../../core/config/env';

export class BaseSaucePage {
  constructor(protected readonly page: Page) {}

  async open(path: string = ''): Promise<void> {
    const url = ${Config.SAUCE_URL};
    await this.page.goto(url);
    await this.page.waitForLoadState('domcontentloaded');
  }
}
