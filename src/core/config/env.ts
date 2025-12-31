import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../../.env') });

export class Config {
  // Browser
  static readonly HEADLESS = process.env.HEADLESS === 'true';
  static readonly BROWSER = process.env.BROWSER || 'chromium';

  // URLs
  static readonly SAUCE_URL = process.env.SAUCE_URL || 'https://www.saucedemo.com';
  static readonly DEMOQA_URL = process.env.DEMOQA_URL || 'https://demoqa.com';
  static readonly POSTMAN_ECHO_URL = process.env.POSTMAN_ECHO_URL || 'https://postman-echo.com';
  static readonly JSONPLACEHOLDER_URL = process.env.JSONPLACEHOLDER_URL || 'https://jsonplaceholder.typicode.com';

  // Credentials
  static readonly SAUCE_USERNAME = process.env.SAUCE_USERNAME || 'standard_user';
  static readonly SAUCE_PASSWORD = process.env.SAUCE_PASSWORD || 'secret_sauce';
  static readonly SAUCE_LOCKED_OUT_USER = process.env.SAUCE_LOCKED_OUT_USER || 'locked_out_user';

  // Timeouts
  static readonly DEFAULT_TIMEOUT = parseInt(process.env.DEFAULT_TIMEOUT || '10000');
  static readonly LONG_TIMEOUT = parseInt(process.env.LONG_TIMEOUT || '30000');
  static readonly SHORT_TIMEOUT = parseInt(process.env.SHORT_TIMEOUT || '5000');

  // CI
  static readonly CI = process.env.CI === 'true';
}
