import { Page } from '@playwright/test';
import { BaseSaucePage } from './baseSaucePage';

export class LoginPage extends BaseSaucePage {
  private readonly usernameInput = '[data-test=\"username\"]';
  private readonly passwordInput = '[data-test=\"password\"]';
  private readonly loginButton = '[data-test=\"login-button\"]';
  private readonly errorMessage = '[data-test=\"error\"]';

  constructor(page: Page) {
    super(page);
  }

  async open(): Promise<void> {
    await super.open('');
  }

  async login(username: string, password: string): Promise<void> {
    await this.page.fill(this.usernameInput, username);
    await this.page.fill(this.passwordInput, password);
    await this.page.click(this.loginButton);
  }

  async getErrorText(): Promise<string> {
    return await this.page.textContent(this.errorMessage) || '';
  }
}
