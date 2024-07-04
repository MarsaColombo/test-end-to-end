import { test, expect } from '@playwright/test';

test('main page', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await expect(page.getByRole('heading')).toContainText('Vite + React');
  await expect(page.getByRole('button')).toContainText('count is 0');
  await expect(page.getByText('Click on the Vite and React')).toBeVisible();
});

test('vite', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await page.getByRole('link', { name: 'Vite logo' }).click();
  await page.goto('https://vitejs.dev/')
});
test('react', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await page.getByRole('link', { name: 'React logo' }).click();
  await page.goto('https://react.dev/')
});