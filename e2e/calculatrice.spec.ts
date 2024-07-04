import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/');
});
test('Presence des opérateurs', async ({ page }) => {
  await expect(page.getByRole('button', { name: 'sum' })).toBeVisible();
  await page.getByRole('button', { name: 'sum' }).click();
  await expect(page.getByRole('button', { name: 'soustraction' })).toBeVisible();
  await page.getByRole('button', { name: 'soustraction' }).click();
  await expect(page.getByRole('button', { name: 'multiplication' })).toBeVisible();
  await page.getByRole('button', { name: 'multiplication' }).click();
  await expect(page.getByRole('button', { name: '=' })).toBeVisible();
  await page.getByRole('button', { name: '=' }).click();
});
test('Calcul de base', async ({ page }) => {
    await page.getByRole('button', { name: '1' }).click();
    await page.getByRole('button', { name: 'sum' }).click();
    await page.getByRole('button', { name: '4' }).click();
    await page.getByRole('button', { name: '=' }).click();
    await expect(page.getByRole('banner')).toContainText('5');
  });
  test('Remettre le résultat 0', async ({ page }) => {
    await expect(page.locator('.btnClear')).toBeVisible()
    await page.getByRole('button', { name: 'C', exact: true }).click();
    await page.getByText('0').first().click();
  });
  test('Avoir un button d\'égalité en rouge', async ({ page }) => {
    await expect(page.locator('.btnEqual')).toBeVisible()
    await expect(page.locator('.btnEqual')).toHaveCSS('color', 'rgb(255, 0, 0)')
    await page.getByRole('button', { name: '=', exact: true }).click();
  });


