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

test('Calcul de base - Addition', async ({ page }) => {
  await page.getByRole('button', { name: '1' }).click();
  await page.getByRole('button', { name: 'sum' }).click();
  await page.getByRole('button', { name: '4' }).click();
  await page.getByRole('button', { name: '=' }).click();
  await expect(page.getByRole('banner')).toContainText('5');
});

test('Calcul de base - Soustraction', async ({ page }) => {
  await page.getByRole('button', { name: '9' }).click();
  await page.getByRole('button', { name: 'soustraction' }).click();
  await page.getByRole('button', { name: '4' }).click();
  await page.getByRole('button', { name: '=' }).click();
  await expect(page.getByRole('banner')).toContainText('5');
});

test('Calcul de base - Multiplication', async ({ page }) => {
  await page.getByRole('button', { name: '6' }).click();
  await page.getByRole('button', { name: 'multiplication' }).click();
  await page.getByRole('button', { name: '7' }).click();
  await page.getByRole('button', { name: '=' }).click();
  await expect(page.getByRole('banner')).toContainText('42');
});

test('Remettre le résultat à 0', async ({ page }) => {
  await expect(page.locator('.btnClear')).toBeVisible();
  await page.getByRole('button', { name: 'C', exact: true }).click();
  await expect(page.getByRole('banner')).toContainText('0');
});

test('Avoir un bouton d\'égalité en rouge', async ({ page }) => {
  await expect(page.locator('.btnEqual')).toBeVisible();
  await expect(page.locator('.btnEqual')).toHaveCSS('color', 'rgb(255, 0, 0)');
  await page.getByRole('button', { name: '=', exact: true }).click();
});

test('Opérations en chaîne', async ({ page }) => {
  await page.getByRole('button', { name: '2' }).click();
  await page.getByRole('button', { name: 'sum' }).click();
  await page.getByRole('button', { name: '3' }).click();
  await page.getByRole('button', { name: 'multiplication' }).click();
  await page.getByRole('button', { name: '4' }).click();
  await page.getByRole('button', { name: '=' }).click();
  await expect(page.getByRole('banner')).toContainText('20');
});

test('Gestion des grands nombres', async ({ page }) => {
    await page.getByRole('button', { name: '9' }).click();
    await page.getByRole('button', { name: '9' }).click();
    await page.getByRole('button', { name: '9' }).click();
    await page.getByRole('button', { name: '9' }).click();
    await page.getByRole('button', { name: '9' }).click();
    await page.getByRole('button', { name: 'multiplication' }).click();
    await page.getByRole('button', { name: '9' }).click();
    await page.getByRole('button', { name: '9' }).click();
    await page.getByRole('button', { name: '9' }).click();
    await page.getByRole('button', { name: '9' }).click();
    await page.getByRole('button', { name: '9' }).click();
    await page.getByRole('button', { name: '=' }).click();
    await expect(page.locator('.screen')).toContainText('9999800001');
  });

test('Vérification de l\'échange des chiffres 3 et 5', async ({ page }) => {
  await page.getByRole('button', { name: '5' }).click();
  await page.getByRole('button', { name: '3' }).click();
  await expect(page.locator('.screen')).toContainText('53');
});
test('Opérations multiples avec priorité', async ({ page }) => {
    await page.getByRole('button', { name: '2' }).click();
    await page.getByRole('button', { name: 'sum' }).click();
    await page.getByRole('button', { name: '3' }).click();
    await page.getByRole('button', { name: 'multiplication' }).click();
    await page.getByRole('button', { name: '4' }).click();
    await page.getByRole('button', { name: 'soustraction' }).click();
    await page.getByRole('button', { name: '5' }).click();
    await page.getByRole('button', { name: '=' }).click();
    await expect(page.getByRole('banner')).toContainText('15');
  });
  
  test('Opération sur le résultat précédent', async ({ page }) => {
    await page.getByRole('button', { name: '5' }).click();
    await page.getByRole('button', { name: 'sum' }).click();
    await page.getByRole('button', { name: '3' }).click();
    await page.getByRole('button', { name: '=' }).click();
    await page.getByRole('button', { name: 'multiplication' }).click();
    await page.getByRole('button', { name: '2' }).click();
    await page.getByRole('button', { name: '=' }).click();
    await expect(page.getByRole('banner')).toContainText('16');
  });
  
  test('Alternance entre additions et soustractions', async ({ page }) => {
    await page.getByRole('button', { name: '1' }).click();
    await page.getByRole('button', { name: '0' }).click();
    await page.getByRole('button', { name: 'sum' }).click();
    await page.getByRole('button', { name: '5' }).click();
    await page.getByRole('button', { name: 'soustraction' }).click();
    await page.getByRole('button', { name: '3' }).click();
    await page.getByRole('button', { name: 'sum' }).click();
    await page.getByRole('button', { name: '8' }).click();
    await page.getByRole('button', { name: '=' }).click();
    await expect(page.getByRole('banner')).toContainText('20');
  });
  
  test('Multiplication de grands nombres', async ({ page }) => {
    await page.getByRole('button', { name: '1' }).click();
    await page.getByRole('button', { name: '2' }).click();
    await page.getByRole('button', { name: '3' }).click();
    await page.getByRole('button', { name: '4' }).click();
    await page.getByRole('button', { name: 'multiplication' }).click();
    await page.getByRole('button', { name: '5' }).click();
    await page.getByRole('button', { name: '6' }).click();
    await page.getByRole('button', { name: '7' }).click();
    await page.getByRole('button', { name: '8' }).click();
    await page.getByRole('button', { name: '=' }).click();
    await expect(page.locator('.screen')).toContainText('7006652');
  });
  
  test('Opérations répétées avec le même opérateur', async ({ page }) => {
    await page.getByRole('button', { name: '5' }).click();
    await page.getByRole('button', { name: 'sum' }).click();
    await page.getByRole('button', { name: '3' }).click();
    await page.getByRole('button', { name: 'sum' }).click();
    await page.getByRole('button', { name: '2' }).click();
    await page.getByRole('button', { name: 'sum' }).click();
    await page.getByRole('button', { name: '1' }).click();
    await page.getByRole('button', { name: '=' }).click();
    await expect(page.getByRole('banner')).toContainText('11');
  });
  
  test('Alternance entre tous les opérateurs', async ({ page }) => {
    await page.getByRole('button', { name: '1' }).click();
    await page.getByRole('button', { name: '0' }).click();
    await page.getByRole('button', { name: 'sum' }).click();
    await page.getByRole('button', { name: '5' }).click();
    await page.getByRole('button', { name: 'multiplication' }).click();
    await page.getByRole('button', { name: '3' }).click();
    await page.getByRole('button', { name: 'soustraction' }).click();
    await page.getByRole('button', { name: '5' }).click();
    await page.getByRole('button', { name: '=' }).click();
    await expect(page.getByRole('banner')).toContainText('40');
  });