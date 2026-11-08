import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto(' http://localhost:5173/');
  await page.getByRole('heading', { name: 'LISTAR' }).click();

  var pagina = page.getByRole('heading', { name: 'Gestão de Clientes' })
  // Expect a title "to contain" a substring.;
  await expect(page.locator('#tituloOperacao')).toContainText('LISTAR');
 await page.goto('http://localhost:5173/');
 await page.getByRole('button', { name: 'Cadastrar', exact: true }).click();
 await page.getByRole('textbox', { name: 'Nome Completo *' }).click();
 await page.getByRole('textbox', { name: 'Nome Completo *' }).fill('Joao da silva');
 await page.getByRole('textbox', { name: 'Nome Completo *' }).press('Tab');
 await page.getByRole('textbox', { name: 'E-mail *' }).fill('joao@gmail.com');
 await page.getByRole('textbox', { name: 'E-mail *' }).press('Tab');
  await page.getByRole('textbox', { name: 'CPF *' }).fill('47225514059');
 await page.getByRole('textbox', { name: 'CPF *' }).press('Tab');
 await page.getByRole('textbox', { name: 'Telefone *' }).fill('(11) 1111-11111');
 await page.getByRole('textbox', { name: 'CEP *' }).click();
 await page.getByRole('textbox', { name: 'CEP *' }).fill('04330-020');
 await page.getByRole('textbox', { name: 'CEP *' }).press('Tab');
 await page.getByRole('textbox', { name: 'Endereço *' }).press('Tab');
 await page.getByRole('textbox', { name: 'Bairro *' }).press('Tab');
 await page.getByRole('textbox', { name: 'Cidade *' }).press('Tab');
 await page.getByRole('textbox', { name: 'UF *' }).press('Tab');
 await page.getByRole('textbox', { name: 'Complemento' }).fill('1');
 await page.getByRole('textbox', { name: 'Complemento' }).press('Tab');
 await page.getByRole('button', { name: 'Cadastrar Cliente' }).click();
 await expect(page.getByTestId('form-feedback')).toContainText('Por favor, corrija os erros apontados no formulário antes de continuar.');
});
