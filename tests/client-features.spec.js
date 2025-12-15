const { test, expect } = require('@playwright/test');

/**
 * Pruebas de Funcionalidades Cliente
 */

test.describe('Funcionalidades Cliente', () => {
  test.beforeEach(async ({ page }) => {
    // Login
    await page.goto('/cliente/?pagina=login');
    await page.fill('input[name="ruc"]', '20123456789');
    await page.fill('input[name="clave"]', 'empresa123');
    await page.click('button[type="submit"]');
    await page.waitForURL('**/cliente/?pagina=ordenes');
  });

  test('debe mostrar la página de órdenes correctamente', async ({ page }) => {
    await expect(page.locator('h2')).toContainText('Mis Órdenes');
    await expect(page.locator('.header h1')).toContainText('Nova Intranet');
    await expect(page.locator('.user-info span')).toBeVisible();
  });

  test('debe mostrar información del usuario en el header', async ({ page }) => {
    const userInfo = page.locator('.user-info span');
    await expect(userInfo).toBeVisible();
    await expect(userInfo).not.toBeEmpty();
  });

  test('debe mostrar el botón de cerrar sesión', async ({ page }) => {
    const logoutBtn = page.locator('a.btn-logout');
    await expect(logoutBtn).toBeVisible();
    await expect(logoutBtn).toContainText('Cerrar Sesión');
  });

  test('debe mostrar la página de perfil correctamente', async ({ page }) => {
    await page.click('a.nav-link:has-text("Perfil")');
    await expect(page).toHaveURL(/.*pagina=perfil/);
    await expect(page.locator('h2')).toContainText('Mi Perfil');
  });

  test('debe mostrar información del perfil', async ({ page }) => {
    await page.click('a.nav-link:has-text("Perfil")');
    await page.waitForLoadState('networkidle');
    
    // Verificar que hay información del perfil
    const profileInfo = page.locator('.profile-info');
    await expect(profileInfo).toBeVisible();
  });

  test('debe mantener la sesión al navegar entre páginas', async ({ page }) => {
    // Navegar a perfil
    await page.click('a.nav-link:has-text("Perfil")');
    await expect(page).toHaveURL(/.*pagina=perfil/);
    
    // Volver a órdenes
    await page.click('a.nav-link:has-text("Órdenes")');
    await expect(page).toHaveURL(/.*pagina=ordenes/);
    
    // Verificar que aún estamos logueados
    await expect(page.locator('.user-info span')).toBeVisible();
  });
});

