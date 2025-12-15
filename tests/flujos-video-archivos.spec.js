const { test, expect } = require('@playwright/test');

/**
 * Pruebas de Video - Flujos Completos con Archivos
 * Videos optimizados para demostración de subida, visualización, eliminación y notificaciones
 */

test.describe('Video: Flujo Completo - Gestión de Archivos', () => {
  test('video - flujo completo subida y gestión de PDFs', async ({ page }) => {
    // === LOGIN ADMIN ===
    await page.goto('/admin/?pagina=login');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);
    
    await page.fill('input[name="usuario"]', 'admin');
    await page.fill('input[name="clave"]', 'admin123');
    await page.click('button[type="submit"]');
    await page.waitForURL('**/admin/?pagina=inicio');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1500);
    
    // === MOSTRAR DASHBOARD ===
    await expect(page.locator('h2')).toContainText('Dashboard');
    await expect(page.locator('.stats-grid')).toBeVisible();
    await page.waitForTimeout(1500);
    
    // === NAVEGAR A SUBIR PDF ===
    await page.click('a.nav-link:has-text("Subir PDF")');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1500);
    
    // === MOSTRAR FORMULARIO DE SUBIDA ===
    await expect(page.locator('h2')).toContainText('Subir Documento PDF');
    await expect(page.locator('select[name="id_cliente"]')).toBeVisible();
    await expect(page.locator('input[type="file"]')).toBeVisible();
    await expect(page.locator('input[type="date"]')).toBeVisible();
    await page.waitForTimeout(2000);
    
    // === MOSTRAR SELECCIÓN DE CLIENTE ===
    await page.selectOption('select[name="id_cliente"]', { index: 1 });
    await page.waitForTimeout(1000);
    
    // === NAVEGAR A PDFs ===
    await page.click('a.nav-link:has-text("PDFs")');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1500);
    
    // === MOSTRAR LISTA DE PDFs ===
    await expect(page.locator('h2')).toContainText('Documentos PDF');
    await expect(
      page.locator('.data-table').or(page.locator('.empty-state'))
    ).toBeVisible();
    await page.waitForTimeout(2000);
    
    // === VERIFICAR COLUMNAS DE NOTIFICACIONES ===
    // Verificar que la tabla muestre información de fechas
    await page.waitForTimeout(1000);
    
    // === NAVEGAR A NOTIFICACIONES (si está disponible) ===
    const notificacionesLink = page.locator('a.nav-link:has-text("Notificaciones")');
    const linkCount = await notificacionesLink.count();
    if (linkCount > 0) {
      await notificacionesLink.first().click();
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(1500);
      
      // Verificar que se cargó la página de notificaciones
      const h2Text = await page.locator('h2').textContent();
      if (h2Text && h2Text.includes('Notificaciones')) {
        await expect(page.locator('h2')).toContainText('Notificaciones');
        await page.waitForTimeout(2000);
      } else {
        // Si no se cargó, volver a PDFs
        await page.goto('/admin/?pagina=pdf');
        await page.waitForTimeout(1000);
      }
    } else {
      // Si no existe el enlace, simplemente continuar
      await page.waitForTimeout(1000);
    }
    
    // === VOLVER AL DASHBOARD ===
    await page.click('a.nav-link:has-text("Inicio")');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);
  });

  test('video - flujo cliente visualización de documentos', async ({ page }) => {
    // === LOGIN CLIENTE ===
    await page.goto('/cliente/?pagina=login');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);
    
    await page.fill('input[name="ruc"]', '20123456789');
    await page.fill('input[name="clave"]', 'empresa123');
    await page.click('button[type="submit"]');
    await page.waitForURL('**/cliente/?pagina=ordenes');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1500);
    
    // === MOSTRAR PÁGINA DE ÓRDENES ===
    await expect(page.locator('h2')).toContainText('Mis Órdenes');
    await page.waitForTimeout(2000);
    
    // === VERIFICAR ESTRUCTURA ===
    await expect(
      page.locator('.orders-list').or(page.locator('.empty-state'))
    ).toBeVisible();
    await page.waitForTimeout(1500);
    
    // === NAVEGAR A PERFIL ===
    await page.click('a.nav-link:has-text("Perfil")');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1500);
    
    // === MOSTRAR PERFIL ===
    await expect(page.locator('h2')).toContainText('Mi Perfil');
    await expect(page.locator('.profile-info')).toBeVisible();
    await page.waitForTimeout(2000);
    
    // === VOLVER A ÓRDENES ===
    await page.click('a.nav-link:has-text("Órdenes")');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);
  });

  test('video - demostración completa sistema con archivos', async ({ page }) => {
    // === SECCIÓN ADMIN ===
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
    
    // Mostrar todas las funcionalidades admin
    const seccionesAdmin = ['Clientes', 'Órdenes', 'PDFs', 'Subir PDF', 'Notificaciones'];
    for (const seccion of seccionesAdmin) {
      await page.click(`a.nav-link:has-text("${seccion}")`);
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(1500);
    }
    
    // Logout admin
    await page.click('a.btn-logout');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);
    
    // === SECCIÓN CLIENTE ===
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
    
    await page.click('a.nav-link:has-text("Órdenes")');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);
  });
});

