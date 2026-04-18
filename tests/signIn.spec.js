import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://prisonmikedementors101-netizen.github.io/RetailWebAppForQA/');
  await page.getByRole('link', { name: 'Sign in' }).click();
  await page.getByRole('textbox', { name: 'Username' }).click();
  await page.getByRole('textbox', { name: 'Username' }).fill('alice');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('password1');
  await page.getByRole('button', { name: 'Sign in' }).click();
});