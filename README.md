# playwright-tempo-app

End-to-end test suite for the [Tempo](https://tempo-timetracker.vercel.app) application, built with [Playwright](https://playwright.dev) and TypeScript.

## Stack

- [Playwright](https://playwright.dev) — test runner & browser automation
- [TypeScript](https://www.typescriptlang.org) — type-safe test code
- [Allure](https://allurereport.org) — test reporting
- [QASphere](https://qasphere.com) — test case management

## Project structure

```
src/
  data/         # Test data: users, error messages
  fixtures/     # Playwright fixture extensions
  helpers/      # Utility helpers (API, dates)
  pages/        # Page Object Models
  tests/        # Test specs organised by feature
```

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Install Playwright browsers:
   ```bash
   npx playwright install
   ```

3. Copy the environment template and fill in your values:
   ```bash
   cp .env.example .env
   ```

| Variable | Description |
|---|---|
| `BASE_URL` | App URL (e.g. `https://tempo-timetracker.vercel.app`) |
| `QAS_TOKEN` | QASphere API token |
| `QAS_URL` | QASphere instance URL |
| `QAS_PROJECT_CODE` | QASphere project code |
| `VALID_USERNAME` | Email of a valid test user |
| `VALID_PASSWORD` | Password of the valid test user |
| `VALID_DISPLAY_NAME` | Display name shown in the sidebar for the valid test user |

## Running tests

```bash
# Run all tests
npm test

# Run a specific test case
npx playwright test --grep "TEM-1"

# Run with browser visible
npm run test:headed

# Run in UI mode
npm run test:ui
```

## Reports

```bash
# Open Playwright HTML report
npm run report

# Generate & open Allure report
npm run allure:generate
npm run allure:open

# Upload results to QASphere
npm run qasphere:upload
```

## Test cases

| ID | Title | Tags |
|---|---|---|
| TEM-1 | Successful login with valid credentials | smoke |
| TEM-2 | Login with invalid password | negative |
| TEM-3 | Login with unregistered email | negative |
| TEM-4 | Sign up — new account | smoke |
| TEM-5 | Sign up — duplicate email | negative |
| TEM-6 | Toggle between login and sign-up | smoke |
| TEM-7 | Forgot password link | smoke |
| TEM-8 | Session persistence | smoke |
| TEM-9 | Sign out from sidebar | smoke |
| TEM-10 | Deactivated account blocked | negative |
| TEM-11 | Unauthenticated redirect | smoke |
