const { test, expect } = require('@playwright/test');

test.use({ storageState: 'auth.json' });
const BASE = 'https://prisonmikedementors101-netizen.github.io/RetailWebAppForQA';

test('Add product to cart from product grid', async ({ page }) => {
  await page.goto(BASE, { waitUntil: 'networkidle' });
  await page.getByText('Add to Cart').first().click();
  await page.locator('aside.cart-drawer.open').waitFor({ state: 'visible' });
  await expect(page.locator('aside.cart-drawer.open h3')).toContainText('Your Bag');
  await expect(page.locator('.cart-item .cart-item-title').first()).toBeVisible();
});

test('Add product to cart from product detail page', async ({ page }) => {
  await page.goto(BASE, { waitUntil: 'networkidle' });
  // Navigate to PDP via click (SPA routing)
  await page.locator('.product-card').first().locator('.product-card-link').first().click();
  await page.waitForLoadState('networkidle');
  await expect(page.locator('.pdp-title')).toBeVisible();
  await page.locator('.pdp-add-btn').click();
  await page.locator('aside.cart-drawer.open').waitFor({ state: 'visible' });
  await expect(page.locator('.cart-item .cart-item-title').first()).toBeVisible();
});

test('Cart updates quantity correctly', async ({ page }) => {
  await page.goto(BASE, { waitUntil: 'networkidle' });
  await page.getByText('Add to Cart').first().click();
  await page.locator('aside.cart-drawer.open').waitFor({ state: 'visible' });
  const plus = page.locator('.cart-item .qty-btn').filter({ hasText: '+' }).first();
  await plus.click();
  const qtyText = await page.locator('.cart-item-controls span').first().innerText();
  expect(qtyText.trim()).toBe('2');
});

test('Remove item from cart', async ({ page }) => {
  await page.goto(BASE, { waitUntil: 'networkidle' });
  await page.getByText('Add to Cart').first().click();
  await page.locator('aside.cart-drawer.open').waitFor({ state: 'visible' });
  await page.locator('.cart-item').getByRole('button', { name: /Remove/i }).click();
  await expect(page.locator('.empty-msg')).toBeVisible();
});
