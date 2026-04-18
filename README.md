# PlaywrightE2ETests

Playwright E2E tests — minimal scaffold.

This repository is a practice Playwright automation repo. All tests in /tests are written against
the sample front-end at:

https://prisonmikedementors101-netizen.github.io/RetailWebAppForQA

## Quick Start

1. cd PlaywrightE2ETests
2. npm install
3. npm run install:browsers
4. Generate auth state: `node setup-auth.mjs` (logs in as alice and saves auth.json)
5. npm test

## Included Tests

| File | Description |
|------|-------------|
| `tests/example.spec.js` | Basic smoke test against example.com |
| `tests/retail.spec.js` | Verifies the RetailWebAppForQA loads successfully |
| `tests/screenshot.spec.js` | Captures a full-page screenshot artifact |
| `tests/signIn.spec.js` | Sign-in flow (see note below) |
| `tests/addToCart.spec.js` | Add to cart from grid and PDP, quantity update, remove item |
| `tests/productDetail.spec.js` | PDP title/price, description, back navigation, Add to Bag button |
| `tests/checkout.spec.js` | Checkout access, form fill & submit, empty cart state |

## Auth & Storage State

Most tests rely on a pre-generated `auth.json` file (Playwright storage state) to run as an
authenticated user. This file is created by logging in as `alice` and saving the browser's
localStorage state. The `playwright.config.js` applies this globally via `storageState: 'auth.json'`.

## ⚠️ Known Issue: signIn.spec.js Fails in Full Suite Run

**`tests/signIn.spec.js` is expected to fail when the full test suite runs together.**

**Why:** The global `playwright.config.js` applies `storageState: 'auth.json'` to all tests,
which pre-populates the browser with an authenticated session. When `signIn.spec.js` runs,
the app already considers the user logged in and does not render the "Sign in" link — causing
the test to time out waiting for an element that is never shown.

**Workaround options:**
- Run `signIn.spec.js` in isolation: `npx playwright test tests/signIn.spec.js --no-use-stored-state`
- Or override the storage state in the test file with an empty context:
  ```js
  test.use({ storageState: { cookies: [], origins: [] } });
  ```
- Or move it to a separate auth-setup project in `playwright.config.js` that runs before the main suite.

Tests save artifacts to the `artifacts/` folder. Use `npx playwright test` to run all tests or
target a specific file: `npx playwright test tests/addToCart.spec.js`
