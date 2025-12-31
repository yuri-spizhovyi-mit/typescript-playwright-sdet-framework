import { Page } from '@playwright/test';
import { BaseDemoQAPage } from './baseDemoQaPage';

export class ElementsPage extends BaseDemoQAPage {
  private readonly pageReady = '.left-pannel';
  private readonly sideMenuItems = '.element-list .menu-list li';

  constructor(page: Page) {
    super(page);
  }

  async openPage(): Promise<void> {
    await this.open('elements');
  }

  async isLoaded(): Promise<boolean> {
    return await this.page.locator(this.pageReady).isVisible();
  }

  async openMenuItem(itemName: string): Promise<void> {
    await this.page.locator(this.sideMenuItems).filter({ hasText: itemName }).click();
  }
}
