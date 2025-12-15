const { test, expect } = require('@playwright/test');

/**
 * Pruebas de Navegación
 */

test.describe('Navegación Cliente', () => {
  test.beforeEach(async ({ page }) => {
    // Login primero
    await page.goto('/cliente/?pagina=login');
    await page.fill('input[name="ruc"]', '20123456789');
    await page.fill('input[name="clave"]', 'empresa123');
    await page.click('button[type="submit"]');
    await page.waitForURL('**/cliente/?pagina=ordenes');
  });

  test('debe navegar a la página de órdenes', async ({ page }) => {
    await page.click('a.nav-link:has-text("Órdenes")');
    await expect(page).toHaveURL(/.*pagina=ordenes/);
    await expect(page.locator('h2')).toContainText('Mis Órdenes');
  });

  test('debe navegar a la página de perfil', async ({ page }) => {
    await page.click('a.nav-link:has-text("Perfil")');
    await expect(page).toHaveURL(/.*pagina=perfil/);
    await expect(page.locator('h2')).toContainText('Mi Perfil');
  });

  test('debe mostrar el menú de navegación', async ({ page }) => {
    await expect(page.locator('nav.nav')).toBeVisible();
    await expect(page.locator('a.nav-link:has-text("Órdenes")')).toBeVisible();
    await expect(page.locator('a.nav-link:has-text("Perfil")')).toBeVisible();
  });
});

test.describe('Navegación Admin', () => {
  test.beforeEach(async ({ page }) => {
    // Login primero
    await page.goto('/admin/?pagina=login');
    await page.fill('input[name="usuario"]', 'admin');
    await page.fill('input[name="clave"]', 'admin123');
    await page.click('button[type="submit"]');
    await page.waitForURL('**/admin/?pagina=inicio');
  });

  test('debe navegar a la página de inicio', async ({ page }) => {
    await page.click('a.nav-link:has-text("Inicio")');
    await expect(page).toHaveURL(/.*pagina=inicio/);
    await expect(page.locator('h2')).toContainText('Dashboard');
  });

  test('debe navegar a la página de clientes', async ({ page }) => {
    await page.click('a.nav-link:has-text("Clientes")');
    await expect(page).toHaveURL(/.*pagina=clientes/);
    await expect(page.locator('h2')).toContainText('Clientes');
  });

  test('debe navegar a la página de órdenes', async ({ page }) => {
    await page.click('a.nav-link:has-text("Órdenes")');
    await expect(page).toHaveURL(/.*pagina=ordenes/);
    await expect(page.locator('h2')).toContainText('Órdenes');
  });

  test('debe navegar a la página de PDFs', async ({ page }) => {
    await page.click('a.nav-link:has-text("PDFs")');
    await expect(page).toHaveURL(/.*pagina=pdf/);
    await expect(page.locator('h2')).toContainText('Documentos PDF');
  });

  test('debe mostrar el menú de navegación completo', async ({ page }) => {
    await expect(page.locator('nav.nav')).toBeVisible();
    await expect(page.locator('a.nav-link:has-text("Inicio")')).toBeVisible();
    await expect(page.locator('a.nav-link:has-text("Clientes")')).toBeVisible();
    await expect(page.locator('a.nav-link:has-text("Órdenes")')).toBeVisible();
    await expect(page.locator('a.nav-link:has-text("PDFs")')).toBeVisible();
  });
});

