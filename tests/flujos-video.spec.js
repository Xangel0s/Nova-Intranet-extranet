const { test, expect } = require('@playwright/test');

/**
 * Pruebas de Flujos con Video - Versión Extendida
 * Estas pruebas están diseñadas específicamente para generar videos
 * que muestren el flujo completo del sistema
 */

test.describe('Video: Flujo Completo Cliente', () => {
  test('video - flujo completo cliente desde cero', async ({ page }) => {
    // Inicio: Mostrar página de login
    await page.goto('/cliente/?pagina=login');
    await page.waitForLoadState('networkidle');
    await expect(page.locator('h1')).toContainText('Nova Intranet');
    
    // Mostrar formulario de login
    await page.waitForTimeout(1000);
    
    // Llenar formulario paso a paso
    await page.fill('input[name="ruc"]', '20123456789');
    await page.waitForTimeout(500);
    await page.fill('input[name="clave"]', 'empresa123');
    await page.waitForTimeout(500);
    
    // Enviar formulario
    await page.click('button[type="submit"]');
    
    // Esperar redirección
    await page.waitForURL('**/cliente/?pagina=ordenes', { timeout: 5000 });
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);
    
    // Mostrar página de órdenes
    await expect(page.locator('h2')).toContainText('Mis Órdenes');
    await expect(page.locator('.user-info span')).toBeVisible();
    await page.waitForTimeout(1000);
    
    // Navegar a perfil
    await page.click('a.nav-link:has-text("Perfil")');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);
    
    // Mostrar perfil
    await expect(page.locator('h2')).toContainText('Mi Perfil');
    await expect(page.locator('.profile-info')).toBeVisible();
    await page.waitForTimeout(1000);
    
    // Volver a órdenes
    await page.click('a.nav-link:has-text("Órdenes")');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);
    
    // Cerrar sesión
    await page.click('a.btn-logout');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);
    
    // Verificar logout
    await expect(page).toHaveURL(/.*pagina=login/);
  });
});

test.describe('Video: Flujo Completo Admin', () => {
  test('video - flujo completo admin desde cero', async ({ page }) => {
    // Inicio: Mostrar página de login
    await page.goto('/admin/?pagina=login');
    await page.waitForLoadState('networkidle');
    await expect(page.locator('h1')).toContainText('Nova Extranet');
    await page.waitForTimeout(1000);
    
    // Llenar formulario
    await page.fill('input[name="usuario"]', 'admin');
    await page.waitForTimeout(500);
    await page.fill('input[name="clave"]', 'admin123');
    await page.waitForTimeout(500);
    
    // Enviar formulario
    await page.click('button[type="submit"]');
    
    // Esperar redirección al dashboard
    await page.waitForURL('**/admin/?pagina=inicio', { timeout: 5000 });
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);
    
    // Mostrar dashboard con estadísticas
    await expect(page.locator('h2')).toContainText('Dashboard');
    await expect(page.locator('.stats-grid')).toBeVisible();
    await expect(page.locator('.stat-card')).toHaveCount(3);
    await page.waitForTimeout(1500);
    
    // Navegar a Clientes
    await page.click('a.nav-link:has-text("Clientes")');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);
    await expect(page.locator('h2')).toContainText('Clientes');
    await page.waitForTimeout(1000);
    
    // Navegar a Órdenes
    await page.click('a.nav-link:has-text("Órdenes")');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);
    await expect(page.locator('h2')).toContainText('Órdenes');
    await page.waitForTimeout(1000);
    
    // Navegar a PDFs
    await page.click('a.nav-link:has-text("PDFs")');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);
    await expect(page.locator('h2')).toContainText('Documentos PDF');
    await page.waitForTimeout(1000);
    
    // Volver al Dashboard
    await page.click('a.nav-link:has-text("Inicio")');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);
    
    // Cerrar sesión
    await page.click('a.btn-logout');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);
    
    // Verificar logout
    await expect(page).toHaveURL(/.*pagina=login/);
  });
});

test.describe('Video: Demostración Completa del Sistema', () => {
  test('video - demostración completa cliente y admin', async ({ page }) => {
    // ========== SECCIÓN CLIENTE ==========
    await page.goto('/cliente/?pagina=login');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);
    
    // Login cliente
    await page.fill('input[name="ruc"]', '20123456789');
    await page.fill('input[name="clave"]', 'empresa123');
    await page.click('button[type="submit"]');
    await page.waitForURL('**/cliente/?pagina=ordenes');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1500);
    
    // Mostrar funcionalidades cliente
    await page.click('a.nav-link:has-text("Perfil")');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1500);
    
    // Logout cliente
    await page.click('a.btn-logout');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);
    
    // ========== SECCIÓN ADMIN ==========
    await page.goto('/admin/?pagina=login');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);
    
    // Login admin
    await page.fill('input[name="usuario"]', 'admin');
    await page.fill('input[name="clave"]', 'admin123');
    await page.click('button[type="submit"]');
    await page.waitForURL('**/admin/?pagina=inicio');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1500);
    
    // Mostrar todas las secciones admin
    const secciones = ['Clientes', 'Órdenes', 'PDFs'];
    for (const seccion of secciones) {
      await page.click(`a.nav-link:has-text("${seccion}")`);
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(1500);
    }
    
    // Volver al dashboard
    await page.click('a.nav-link:has-text("Inicio")');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);
    
    // Logout admin
    await page.click('a.btn-logout');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);
  });
});

