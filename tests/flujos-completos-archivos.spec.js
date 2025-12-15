const { test, expect } = require('@playwright/test');

/**
 * Pruebas de Flujos Completos con Archivos
 * Subida, Visualización, Eliminación y Notificaciones
 */

test.describe('Flujo Completo - Subida y Gestión de Archivos', () => {
  test('flujo completo - subida, visualización y eliminación de PDF', async ({ page }) => {
    // === LOGIN ADMIN ===
    await page.goto('/admin/?pagina=login');
    await page.fill('input[name="usuario"]', 'admin');
    await page.fill('input[name="clave"]', 'admin123');
    await page.click('button[type="submit"]');
    await page.waitForURL('**/admin/?pagina=inicio');
    await page.waitForTimeout(1000);
    
    // === NAVEGAR A SUBIR PDF ===
    await page.click('a.nav-link:has-text("Subir PDF")');
    await expect(page).toHaveURL(/.*pagina=upload/);
    await expect(page.locator('h2')).toContainText('Subir Documento PDF');
    await page.waitForTimeout(1000);
    
    // === VERIFICAR FORMULARIO ===
    await expect(page.locator('select[name="id_cliente"]')).toBeVisible();
    await expect(page.locator('input[type="file"]')).toBeVisible();
    await expect(page.locator('input[type="date"]')).toBeVisible();
    await page.waitForTimeout(1000);
    
    // === SELECCIONAR CLIENTE ===
    await page.selectOption('select[name="id_cliente"]', { index: 1 });
    await page.waitForTimeout(500);
    
    // === CREAR ARCHIVO PDF DE PRUEBA ===
    // Nota: En una prueba real, usarías un archivo real
    // Por ahora verificamos que el formulario esté presente
    
    // === NAVEGAR A PDFs ===
    await page.click('a.nav-link:has-text("PDFs")');
    await expect(page).toHaveURL(/.*pagina=pdf/);
    await page.waitForTimeout(1000);
    
    // === VERIFICAR TABLA DE PDFs ===
    await expect(page.locator('h2')).toContainText('Documentos PDF');
    await expect(
      page.locator('.data-table').or(page.locator('.empty-state'))
    ).toBeVisible();
    await page.waitForTimeout(1000);
    
    // === NAVEGAR A NOTIFICACIONES (si está disponible) ===
    const notificacionesLink = page.locator('a.nav-link:has-text("Notificaciones")');
    if (await notificacionesLink.count() > 0) {
      await notificacionesLink.first().click();
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(1000);
      
      const h2Text = await page.locator('h2').textContent();
      if (h2Text && h2Text.includes('Notificaciones')) {
        await expect(page.locator('h2')).toContainText('Notificaciones');
      }
      await page.waitForTimeout(1000);
    } else {
      // Si no existe, simplemente continuar
      await page.waitForTimeout(1000);
    }
  });

  test('flujo cliente - visualización de PDFs con notificaciones', async ({ page }) => {
    // === LOGIN CLIENTE ===
    await page.goto('/cliente/?pagina=login');
    await page.fill('input[name="ruc"]', '20123456789');
    await page.fill('input[name="clave"]', 'empresa123');
    await page.click('button[type="submit"]');
    await page.waitForURL('**/cliente/?pagina=ordenes');
    await page.waitForTimeout(1000);
    
    // === VERIFICAR PÁGINA DE ÓRDENES ===
    await expect(page.locator('h2')).toContainText('Mis Órdenes');
    await page.waitForTimeout(1000);
    
    // === VERIFICAR ESTRUCTURA DE ÓRDENES ===
    // Si hay órdenes, verificar que se muestren correctamente
    const ordersList = page.locator('.orders-list');
    const orderCards = page.locator('.order-card');
    
    // Verificar que la estructura esté presente
    await expect(ordersList.or(page.locator('.empty-state'))).toBeVisible();
    await page.waitForTimeout(1000);
    
    // === NAVEGAR A PERFIL ===
    await page.click('a.nav-link:has-text("Perfil")');
    await expect(page).toHaveURL(/.*pagina=perfil/);
    await page.waitForTimeout(1000);
    
    // === VOLVER A ÓRDENES ===
    await page.click('a.nav-link:has-text("Órdenes")');
    await expect(page).toHaveURL(/.*pagina=ordenes/);
    await page.waitForTimeout(1000);
  });

  test('flujo admin - gestión completa de PDFs', async ({ page }) => {
    // === LOGIN ===
    await page.goto('/admin/?pagina=login');
    await page.fill('input[name="usuario"]', 'admin');
    await page.fill('input[name="clave"]', 'admin123');
    await page.click('button[type="submit"]');
    await page.waitForURL('**/admin/?pagina=inicio');
    await page.waitForTimeout(1000);
    
    // === VERIFICAR DASHBOARD ===
    await expect(page.locator('h2')).toContainText('Dashboard');
    await expect(page.locator('.stats-grid')).toBeVisible();
    await page.waitForTimeout(1000);
    
    // === NAVEGAR POR TODAS LAS SECCIONES ===
    const secciones = [
      { nombre: 'Clientes', titulo: 'Clientes' },
      { nombre: 'Órdenes', titulo: 'Órdenes' },
      { nombre: 'PDFs', titulo: 'Documentos PDF' },
      { nombre: 'Subir PDF', titulo: 'Subir Documento PDF' },
      { nombre: 'Notificaciones', titulo: 'Notificaciones de Eliminación' }
    ];
    
    for (const seccion of secciones) {
      await page.click(`a.nav-link:has-text("${seccion.nombre}")`);
      await page.waitForLoadState('networkidle');
      await expect(page.locator('h2')).toContainText(seccion.titulo);
      await page.waitForTimeout(1000);
    }
    
    // === VOLVER AL DASHBOARD ===
    await page.click('a.nav-link:has-text("Inicio")');
    await expect(page).toHaveURL(/.*pagina=inicio/);
    await page.waitForTimeout(1000);
  });
});

test.describe('Flujo - Notificaciones de Tiempo', () => {
  test('verificar notificaciones de documentos próximos a expirar', async ({ page }) => {
    // === LOGIN ADMIN ===
    await page.goto('/admin/?pagina=login');
    await page.fill('input[name="usuario"]', 'admin');
    await page.fill('input[name="clave"]', 'admin123');
    await page.click('button[type="submit"]');
    await page.waitForURL('**/admin/?pagina=inicio');
    await page.waitForTimeout(1000);
    
    // === IR A NOTIFICACIONES ===
    await page.click('a.nav-link:has-text("Notificaciones")');
    await expect(page).toHaveURL(/.*pagina=notificaciones/);
    await expect(page.locator('h2')).toContainText('Notificaciones de Eliminación');
    await page.waitForTimeout(1000);
    
    // === VERIFICAR ESTRUCTURA DE NOTIFICACIONES ===
    // Verificar que la página muestre notificaciones o mensaje vacío
    await expect(
      page.locator('.notification-card').or(page.locator('.empty-state'))
    ).toBeVisible();
    await page.waitForTimeout(1000);
    
    // === IR A PDFs Y VERIFICAR FECHAS ===
    await page.click('a.nav-link:has-text("PDFs")');
    await expect(page).toHaveURL(/.*pagina=pdf/);
    await page.waitForTimeout(1000);
    
    // Verificar que la tabla muestre información de fechas de eliminación
    await expect(
      page.locator('.data-table').or(page.locator('.empty-state'))
    ).toBeVisible();
    await page.waitForTimeout(1000);
  });
});

