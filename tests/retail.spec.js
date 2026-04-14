const { test, expect } = require('@playwright/test');

test('Retail web app loads', async ({ page }) => {
  const url = 'https://prisonmikedementors101-netizen.github.io/RetailWebAppForQA';
  const resp = await page.goto(url, { waitUntil: 'networkidle' });
  expect(resp).not.toBeNull();
  // expect a 2xx/3xx response
  expect(resp.status()).toBeLessThan(400);
  await expect(page).toHaveURL(new RegExp('RetailWebAppForQA', 'i'));
});

