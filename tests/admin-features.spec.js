const { test, expect } = require('@playwright/test');

/**
 * Pruebas de Funcionalidades Admin
 */

test.describe('Funcionalidades Admin', () => {
  test.beforeEach(async ({ page }) => {
    // Login
    await page.goto('/admin/?pagina=login');
    await page.fill('input[name="usuario"]', 'admin');
    await page.fill('input[name="clave"]', 'admin123');
    await page.click('button[type="submit"]');
    await page.waitForURL('**/admin/?pagina=inicio');
  });

  test('debe mostrar el dashboard correctamente', async ({ page }) => {
    await expect(page.locator('h2')).toContainText('Dashboard');
    await expect(page.locator('.header h1')).toContainText('Nova Extranet');
    await expect(page.locator('.stats-grid')).toBeVisible();
  });

  test('debe mostrar estadísticas en el dashboard', async ({ page }) => {
    const statCards = page.locator('.stat-card');
    await expect(statCards).toHaveCount(3);
    
    await expect(page.locator('.stat-card:has-text("Total Clientes")')).toBeVisible();
    await expect(page.locator('.stat-card:has-text("Total PDFs")')).toBeVisible();
    await expect(page.locator('.stat-card:has-text("PDFs Aprobados")')).toBeVisible();
  });

  test('debe mostrar la página de clientes correctamente', async ({ page }) => {
    await page.click('a.nav-link:has-text("Clientes")');
    await expect(page).toHaveURL(/.*pagina=clientes/);
    await expect(page.locator('h2')).toContainText('Clientes');
  });

  test('debe mostrar la página de órdenes correctamente', async ({ page }) => {
    await page.click('a.nav-link:has-text("Órdenes")');
    await expect(page).toHaveURL(/.*pagina=ordenes/);
    await expect(page.locator('h2')).toContainText('Órdenes');
  });

  test('debe mostrar la página de PDFs correctamente', async ({ page }) => {
    await page.click('a.nav-link:has-text("PDFs")');
    await expect(page).toHaveURL(/.*pagina=pdf/);
    await expect(page.locator('h2')).toContainText('Documentos PDF');
  });

  test('debe mostrar información del usuario en el header', async ({ page }) => {
    const userInfo = page.locator('.user-info span');
    await expect(userInfo).toBeVisible();
    await expect(userInfo).not.toBeEmpty();
  });

  test('debe mantener la sesión al navegar entre páginas', async ({ page }) => {
    // Navegar por todas las páginas
    await page.click('a.nav-link:has-text("Clientes")');
    await expect(page).toHaveURL(/.*pagina=clientes/);
    
    await page.click('a.nav-link:has-text("Órdenes")');
    await expect(page).toHaveURL(/.*pagina=ordenes/);
    
    await page.click('a.nav-link:has-text("PDFs")');
    await expect(page).toHaveURL(/.*pagina=pdf/);
    
    // Verificar que aún estamos logueados
    await expect(page.locator('.user-info span')).toBeVisible();
  });
});

