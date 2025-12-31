# JavaScript/TypeScript Playwright SDET Framework

Portfolio-grade SDET automation framework built with TypeScript and Playwright.

## Features

- ✅ TypeScript for type safety
- ✅ Page Object Model architecture
- ✅ API and UI testing
- ✅ Allure reporting
- ✅ GitHub Actions CI/CD
- ✅ Environment-based configuration
- ✅ Parallel execution support

## Installation

\\\ash
npm install
npx playwright install chromium
\\\

## Running Tests

\\\ash
# Run all tests
npm test

# Run smoke tests
npm run test:smoke

# Run API tests only
npm run test:api

# Run with headed browser
npm run test:headed

# Debug mode
npm run test:debug
\\\

## Reporting

\\\ash
# Generate Allure report
npm run allure:generate

# Open Allure report
npm run allure:open
\\\

## Project Structure

\\\
src/
  core/          # Core framework utilities
  apps/          # Page objects per application
  api/           # API clients and schemas
tests/
  ui/            # UI test specs
  api/           # API test specs
\\\

## Environment Variables

Copy \.env.example\ to \.env\ and configure:

\\\ash
cp .env.example .env
\\\

## License

MIT
