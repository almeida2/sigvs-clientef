import { test, expect } from '@playwright/test';

test('cadastrar cliente com sucesso', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await page.getByRole('link', { name: 'Cadastrar cliente' }).click();
  await page.getByRole('textbox', { name: '000.000.000-' }).click();
  await page.getByRole('textbox', { name: '000.000.000-' }).fill('39752341640');
  await page.getByRole('textbox', { name: 'Digite o nome completo' }).click();
  await page.getByRole('textbox', { name: 'Digite o nome completo' }).fill('Jose da Silva');
  await page.getByRole('textbox', { name: 'Digite o nome completo' }).press('Tab');
  await page.getByRole('textbox', { name: '-000' }).fill('01310000');
  await page.getByRole('textbox', { name: '-000' }).press('Tab');
  await page.getByRole('textbox', { name: 'email@exemplo.com' }).fill('silva@gmail.com');
  await page.getByRole('textbox', { name: 'email@exemplo.com' }).press('Tab');
  await page.getByRole('textbox', { name: 'Apto, Bloco, etc.' }).fill('1');
  await page.getByRole('textbox', { name: 'Apto, Bloco, etc.' }).press('Tab');
  await page.getByRole('button', { name: 'Cadastrar' }).click();
  await expect(page.locator('#root')).toContainText('Cliente cadastrado com sucesso');
});