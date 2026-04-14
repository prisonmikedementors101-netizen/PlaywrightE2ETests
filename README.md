Playwright E2E tests — minimal scaffold.

This repository is a practice Playwright automation repo. All tests in /tests are written against
the sample front-end at:

https://prisonmikedementors101-netizen.github.io/RetailWebAppForQA

Quick start:

1. cd PlaywrightE2ETests
2. npm install
3. npm run install:browsers
4. npm test

Included tests:
- tests/example.spec.js — a basic smoke test (example.com)
- tests/retail.spec.js — verifies the RetailWebAppForQA loads
- tests/screenshot.spec.js — captures a screenshot artifact of the app

Tests save artifacts to the artifacts/ folder. Use `npx playwright test` to run all tests or run an individual test file.

If you want, I can add CI (GitHub Actions) to run the suite on push, or expand tests to cover flows like login, cart, and checkout.
