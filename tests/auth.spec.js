const { test, expect } = require('@playwright/test');

/**
 * Pruebas de Autenticación
 * Cliente (Intranet) y Admin (Extranet)
 */

test.describe('Autenticación Cliente (Intranet)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/cliente/?pagina=login');
  });

  test('debe mostrar el formulario de login', async ({ page }) => {
    await expect(page.locator('h1')).toContainText('Nova Intranet');
    await expect(page.locator('input[name="ruc"]')).toBeVisible();
    await expect(page.locator('input[name="clave"]')).toBeVisible();
    await expect(page.locator('button[type="submit"]')).toBeVisible();
  });

  test('debe validar campos vacíos', async ({ page }) => {
    await page.click('button[type="submit"]');
    
    const errorMessage = page.locator('#errorMessage');
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toContainText('complete todos los campos');
  });

  test('debe mostrar error con credenciales inválidas', async ({ page }) => {
    await page.fill('input[name="ruc"]', 'invalid_ruc');
    await page.fill('input[name="clave"]', 'invalid_password');
    await page.click('button[type="submit"]');
    
    // Esperar respuesta AJAX
    await page.waitForTimeout(1000);
    
    const errorMessage = page.locator('#errorMessage');
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toContainText('incorrectos');
  });

  test('debe hacer login exitoso con credenciales válidas', async ({ page }) => {
    await page.fill('input[name="ruc"]', '20123456789');
    await page.fill('input[name="clave"]', 'empresa123');
    await page.click('button[type="submit"]');
    
    // Esperar redirección
    await page.waitForURL('**/cliente/?pagina=ordenes', { timeout: 5000 });
    
    // Verificar que estamos en la página de órdenes
    await expect(page).toHaveURL(/.*pagina=ordenes/);
    await expect(page.locator('h2')).toContainText('Mis Órdenes');
  });

  test('debe redirigir a login si no hay sesión', async ({ page }) => {
    await page.goto('/cliente/?pagina=ordenes');
    
    // Debe redirigir a login
    await expect(page).toHaveURL(/.*pagina=login/);
  });
});

test.describe('Autenticación Admin (Extranet)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/admin/?pagina=login');
  });

  test('debe mostrar el formulario de login', async ({ page }) => {
    await expect(page.locator('h1')).toContainText('Nova Extranet');
    await expect(page.locator('input[name="usuario"]')).toBeVisible();
    await expect(page.locator('input[name="clave"]')).toBeVisible();
    await expect(page.locator('button[type="submit"]')).toBeVisible();
  });

  test('debe mostrar error con credenciales inválidas', async ({ page }) => {
    await page.fill('input[name="usuario"]', 'invalid_user');
    await page.fill('input[name="clave"]', 'invalid_password');
    await page.click('button[type="submit"]');
    
    // Esperar respuesta
    await page.waitForTimeout(1000);
    
    const errorMessage = page.locator('.error-message');
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toContainText('incorrectos');
  });

  test('debe hacer login exitoso con credenciales válidas', async ({ page }) => {
    await page.fill('input[name="usuario"]', 'admin');
    await page.fill('input[name="clave"]', 'admin123');
    await page.click('button[type="submit"]');
    
    // Esperar redirección
    await page.waitForURL('**/admin/?pagina=inicio', { timeout: 5000 });
    
    // Verificar que estamos en el dashboard
    await expect(page).toHaveURL(/.*pagina=inicio/);
    await expect(page.locator('h2')).toContainText('Dashboard');
  });

  test('debe redirigir a login si no hay sesión', async ({ page }) => {
    await page.goto('/admin/?pagina=inicio');
    
    // Debe redirigir a login
    await expect(page).toHaveURL(/.*pagina=login/);
  });
});

test.describe('Logout', () => {
  test('debe cerrar sesión en cliente', async ({ page }) => {
    // Login primero
    await page.goto('/cliente/?pagina=login');
    await page.fill('input[name="ruc"]', '20123456789');
    await page.fill('input[name="clave"]', 'empresa123');
    await page.click('button[type="submit"]');
    await page.waitForURL('**/cliente/?pagina=ordenes');
    
    // Hacer logout
    await page.click('a.btn-logout');
    
    // Debe redirigir a login
    await expect(page).toHaveURL(/.*pagina=login/);
  });

  test('debe cerrar sesión en admin', async ({ page }) => {
    // Login primero
    await page.goto('/admin/?pagina=login');
    await page.fill('input[name="usuario"]', 'admin');
    await page.fill('input[name="clave"]', 'admin123');
    await page.click('button[type="submit"]');
    await page.waitForURL('**/admin/?pagina=inicio');
    
    // Hacer logout
    await page.click('a.btn-logout');
    
    // Debe redirigir a login
    await expect(page).toHaveURL(/.*pagina=login/);
  });
});

