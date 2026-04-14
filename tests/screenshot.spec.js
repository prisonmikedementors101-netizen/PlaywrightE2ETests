const { test } = require('@playwright/test');
const path = require('path');

test('capture screenshot of retail app', async ({ page }) => {
  const url = 'https://prisonmikedementors101-netizen.github.io/RetailWebAppForQA';
  await page.goto(url, { waitUntil: 'networkidle' });
  const outDir = path.join(__dirname, '..', 'artifacts');
  await page.screenshot({ path: outDir + '/retail_screenshot.png', fullPage: true });
});

