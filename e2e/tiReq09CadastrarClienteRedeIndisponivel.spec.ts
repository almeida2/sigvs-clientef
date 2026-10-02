import { test, expect } from '@playwright/test';

test('cadastrar cliente com dados validos sem rede disponivel', async ({ page }) => {
  // Navega para página inicial menu
  await page.goto('http://localhost:5173/');
  await page.getByRole('link', { name: 'Cadastrar cliente' }).click();
  await page.getByRole('textbox', { name: '000.000.000-' }).click();
  await page.getByRole('textbox', { name: '000.000.000-' }).fill('64684325024');
  await page.getByRole('textbox', { name: '000.000.000-' }).press('Tab');
  await page.getByRole('textbox', { name: 'Digite o nome completo' }).fill('silva');
  await page.getByRole('textbox', { name: 'Digite o nome completo' }).press('Tab');
  await page.getByRole('textbox', { name: '-000' }).fill('01300000000');
  await page.getByRole('textbox', { name: '-000' }).press('Tab');
  await page.getByRole('textbox', { name: 'email@exemplo.com' }).fill('jose@gmail.com');
  await page.getByRole('textbox', { name: 'email@exemplo.com' }).press('Tab');
  await page.getByRole('textbox', { name: 'Apto, Bloco, etc.' }).fill('12');
  await page.getByRole('button', { name: 'Cadastrar' }).click();
  await expect(page.getByText('Failed to fetch')).toBeVisible();
  //dependendo do browser a resposta pode ser diferente
  await expect(page.locator('#root')).toContainText('Failed to fetch');
});