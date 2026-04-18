const { test, expect } = require('@playwright/test');

test.use({ storageState: 'auth.json' });
const BASE = 'https://prisonmikedementors101-netizen.github.io/RetailWebAppForQA';

test('Product detail page shows correct title and price', async ({ page }) => {
  await page.goto(BASE, { waitUntil: 'networkidle' });
  // Click the first product title/image to open PDP
  await page.locator('.product-card').first().locator('.product-card-link').first().click();
  await page.waitForLoadState('networkidle');
  await expect(page.locator('.pdp-title')).toBeVisible();
  await expect(page.locator('.pdp-price')).toBeVisible();
  const price = await page.locator('.pdp-price').innerText();
  expect(price).toMatch(/\$[\d.]+/);
});

test('Product detail page shows description', async ({ page }) => {
  await page.goto(BASE, { waitUntil: 'networkidle' });
  await page.locator('.product-card').nth(1).locator('.product-card-link').first().click();
  await page.waitForLoadState('networkidle');
  await expect(page.locator('.pdp-description-box')).toBeVisible();
  const descText = await page.locator('.pdp-description-box').innerText();
  expect(descText.length).toBeGreaterThan(10);
});

test('Back to Collection link navigates home', async ({ page }) => {
  await page.goto(BASE, { waitUntil: 'networkidle' });
  await page.locator('.product-card').nth(2).locator('.product-card-link').first().click();
  await page.waitForLoadState('networkidle');
  await expect(page.locator('.back-breadcrumb')).toBeVisible();
  await page.locator('.back-breadcrumb').click();
  await expect(page).toHaveURL(new RegExp('RetailWebAppForQA', 'i'));
  await expect(page.locator('.product-card').first()).toBeVisible();
});

test('Add to Shopping Bag button is visible and enabled', async ({ page }) => {
  await page.goto(BASE, { waitUntil: 'networkidle' });
  await page.locator('.product-card').nth(3).locator('.product-card-link').first().click();
  await page.waitForLoadState('networkidle');
  const btn = page.locator('.pdp-add-btn');
  await expect(btn).toBeVisible();
  await expect(btn).toBeEnabled();
});
