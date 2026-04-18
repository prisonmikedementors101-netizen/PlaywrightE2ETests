const { test, expect } = require('@playwright/test');

const BASE = 'https://prisonmikedementors101-netizen.github.io/RetailWebAppForQA';

test.use({ storageState: 'auth.json' });

test('Checkout page is accessible after adding item to cart', async ({ page }) => {
  await page.goto(BASE, { waitUntil: 'networkidle' });
  await page.getByText('Add to Cart').first().click();
  await page.locator('aside.cart-drawer.open').waitFor({ state: 'visible' });
  await page.locator('.cart-footer .checkout-btn').click();
  await expect(page).toHaveURL(/checkout/);
  await expect(page.getByRole('heading', { name: 'Guest Checkout' })).toBeVisible();
});

test('Checkout form fills and submits successfully', async ({ page }) => {
  await page.goto(BASE, { waitUntil: 'networkidle' });
  await page.getByText('Add to Cart').first().click();
  await page.locator('aside.cart-drawer.open').waitFor({ state: 'visible' });
  await page.locator('.cart-footer .checkout-btn').click();
  await expect(page).toHaveURL(/checkout/);

  await page.fill('#email', 'test@example.com');
  await page.fill('#firstName', 'Test');
  await page.fill('#lastName', 'User');
  await page.fill('#cardNumber', '4111 1111 1111 1111');
  await page.fill('#expiry', '12/26');
  await page.fill('#cvv', '123');

  await page.locator('button[type="submit"]').click();
  await expect(page).toHaveURL(/order-confirmation/, { timeout: 10000 });
});

test.describe('Empty cart checkout', () => {
  test.use({ storageState: { cookies: [], origins: [] } });

  test('Empty cart shows empty state on checkout page', async ({ page }) => {
    await page.goto(BASE, { waitUntil: 'networkidle' });
    // Navigate to checkout via hash/SPA without adding items
    await page.evaluate(() => { window.history.pushState({}, '', '/RetailWebAppForQA/checkout'); });
    await page.dispatchEvent('body', 'popstate');
    await page.waitForTimeout(1000);
    // The app should show empty cart state or redirect
    const url = page.url();
    const bodyText = await page.locator('body').innerText();
    // Either redirected away from checkout or shows empty bag message
    expect(
      url.includes('checkout') === false || bodyText.toLowerCase().includes('empty') || bodyText.toLowerCase().includes('bag')
    ).toBeTruthy();
  });
});
