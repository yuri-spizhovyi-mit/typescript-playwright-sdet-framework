import { test, type Page, type Locator } from "@playwright/test";
import { BaseSaucePage } from "./baseSaucePage";

export class LoginPage extends BaseSaucePage {
  private readonly usernameInput: Locator;
  private readonly passwordInput: Locator;
  private readonly loginButton: Locator;
  private readonly errorMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.usernameInput = page.locator('[data-test="username"]');
    this.passwordInput = page.locator('[data-test="password"]');
    this.loginButton = page.locator('[data-test="login-button"]');
    this.errorMessage = page.locator('[data-test="error"]');
  }

  async open(): Promise<void> {
    await test.step("Open SauceDemo login page", async () => {
      await super.open("");
    });
  }

  async login(username: string, password: string): Promise<void> {
    await test.step("Login with provided credentials", async () => {
      await this.safeFill(this.usernameInput, username, "username");
      await this.safeFill(this.passwordInput, password, "password");
      await this.safeClick(this.loginButton, "login button");
    });
  }

  async getErrorText(): Promise<string> {
    return await test.step("Read login error message", async () => {
      return (await this.errorMessage.textContent())?.trim() ?? "";
    });
  }
}
