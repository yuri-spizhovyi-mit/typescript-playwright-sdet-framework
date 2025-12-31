# typescript-playwright-sdet-framework

[![TypeScript](https://img.shields.io/badge/typescript-5.x-blue)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/node-20.x-green)](https://nodejs.org/)
[![Playwright](https://img.shields.io/badge/playwright-test-green)](https://playwright.dev/)
[![Allure Report](https://img.shields.io/badge/Allure-Live_Report-blue)](https://yuri-spizhovyi-mit.github.io/typescript-playwright-sdet-framework/)
![Test Suite](https://github.com/yuri-spizhovyi-mit/typescript-playwright-sdet-framework/actions/workflows/test-suite.yml/badge.svg)

---

## Live Test Report

**Allure Report (GitHub Pages):**  
[View live Allure report (GitHub Pages)](https://yuri-spizhovyi-mit.github.io/typescript-playwright-sdet-framework/)

The report is automatically generated and published by GitHub Actions after each CI run.  
It allows reviewers to inspect test results, execution history, and failures without running the project locally.

---

## Project Purpose

This repository demonstrates a **portfolio-grade SDET automation framework** built with **TypeScript** and **Playwright**.

The goal of the project is to showcase:

- Clean and scalable test architecture
- Production-style UI automation practices
- CI/CD-ready reporting and artifacts
- Maintainability, observability, and debuggability of tests

This is not a demo or tutorial repository.  
The structure and decisions reflect how automation frameworks are typically designed and maintained in large engineering organizations.

---

## Technology Stack

- **Language:** TypeScript
- **Runtime:** Node.js 20+
- **UI Automation:** Playwright
- **Test Runner:** Playwright Test
- **Reporting:** Allure (`allure-playwright`)
- **CI/CD:** GitHub Actions
- **Design Patterns:** Page Object Model (POM), fixture-based setup
- **Target Applications:**
  - DemoQA (UI components & interactions)
  - SauceDemo (sample e-commerce UI)
- **API Automation:** Playwright `APIRequestContext` + JSON Schema validation (AJV)

---

## High-Level Architecture

Key architectural principles:

- Clear separation between **test logic** and **page behavior**
- Centralized **browser lifecycle management** via Playwright Test configuration
- Reusable fixtures and utilities for environment setup
- Explicit waits and state-based assertions (no hard sleeps)
- CI-first mindset (headless by default, artifacts on failure)

---

## Project Structure

```text
typescript-playwright-sdet-framework/
│
├── src/
│   ├── core/
│   │   ├── config/
│   │   │   └── env.ts
│   │   ├── pages/
│   │   │   └── BasePage.ts
│   │   └── utils/
│   │       └── dataGenerator.ts
│   │
│   ├── apps/
│   │   ├── demoqa/
│   │   │   └── pages/
│   │   │
│   │   └── saucedemo/
│   │       └── pages/
│   │
│   └── api/
│       ├── jsonplaceholder/
│       │   ├── client.ts
│       │   └── schemas/
│       │
│       └── postman-echo/
│           └── client.ts
│
├── tests/
│   ├── ui/
│   │   ├── demoqa/
│   │   └── saucedemo/
│   │
│   └── api/
│       ├── jsonplaceholder/
│       └── postman-echo/
│
├── test-results/
├── playwright-report/
├── allure-results/
│
├── .github/
│   └── workflows/
│       └── test-suite.yml
│
├── playwright.config.ts
├── package.json
├── package-lock.json
├── tsconfig.json
├── .env.example
└── README.md
```

---

## Test Coverage Overview

### UI Tests (DemoQA)

- Elements
- Widgets
- Interactions (as coverage grows)

### UI Tests (SauceDemo)

- Login flow
- Cart / basic smoke coverage

### API Tests

- JSONPlaceholder
  - Fetch posts
  - JSON Schema validation
- Postman Echo
  - POST echo payload validation

---

## Playwright Configuration

Tags used in the project:

- `@smoke` – fast, critical-path tests (CI default)
- `@full` – extended coverage (future growth)

Example:

```bash
npm run test:smoke
npm run test
```

---

## Fixtures Strategy

Playwright Test fixtures provide a clean, scalable way to manage test dependencies (page objects, API clients, and environment setup).

Typical usage patterns:

- Use built-in fixtures (e.g., `page`, `request`) where possible
- Extend fixtures (`test.extend`) when you need shared setup (auth state, test data, page object factories)
- Keep fixture logic out of tests to reduce duplication

---

## Debugging & Failure Analysis

### Automatic Artifacts

On failure, the framework keeps:

- Trace (retain-on-failure)
- Screenshot (only-on-failure)
- Video (retain-on-failure)

Artifacts are visible in GitHub Actions and in the Allure report.

### Debug mode

```bash
npm run test:debug
```

### Headed mode

```bash
npm run test:headed
```

---

## API Automation Architecture

This framework includes a dedicated API automation layer designed with the same production-grade principles as the UI tests.

### Design Principles

- Clear separation between API client, test logic, schemas, and test data
- Deterministic and CI-safe external APIs
- No assertions inside client code
- Contract validation using JSON Schema (AJV)

### Schema Validation

JSON Schema is used as a first-class contract mechanism.
Positive schema validation is included to demonstrate detection of breaking API changes.

---

## Continuous Integration

### GitHub Actions

The CI pipeline:

- Runs on every push and pull request
- Executes UI and API suites
- Generates Allure results
- Publishes Allure report to GitHub Pages

### Optional Nightly Run

The workflow includes a scheduled trigger:

```yaml
schedule:
  - cron: "0 2 * * *"
```

---

## Allure Reporting

Allure provides:

- Suite-level and test-level visibility
- Duration analytics
- Attachments and logs

The live report is publicly accessible and requires no local setup.

---

## Environment Configuration

Runtime configuration is controlled via environment variables:

- `HEADLESS=true|false`
- `BASE_URL=<target url>`
- `API_BASE_URL=<target api url>` (if applicable)

An example file is provided: `.env.example`

---

## How to Run Locally

```bash
npm ci
npx playwright install --with-deps chromium

npm run test:smoke
npm run test:headed
npm run report
```

### Allure (local)

```bash
npm run allure:generate
npm run allure:open
```

---

## What This Project Demonstrates

- Scalable test architecture
- Maintainable Page Object design
- API + UI automation in one repository
- CI-ready automation with live reporting
- Clear separation of concerns
- Focus on stability, not flakiness
