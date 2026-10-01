import { test, expect } from '@playwright/test';

test('navegar do menu para a tela de cadastro de cliente', async ({ page }) => {
  // Acessa a página inicial onde fica o menu
  await page.goto('http://localhost:5173/');

  // Verifica se estamos na tela inicial (menu)
  await expect(page.locator('.top-bar')).toHaveText('Sistema Integrado de Gestão');

  // Clica no link para ir para a tela de cadastro
  await page.getByRole('link', { name: 'Cadastrar cliente' }).click();

  // Verifica se a URL mudou para a rota de cadastro
  await expect(page).toHaveURL(/.*\/clientes\/cadastrar/);

  // Verifica se o título da tela de cadastro está visível
  await expect(page.getByRole('heading', { name: 'Cadastrar Cliente' })).toBeVisible();
});
