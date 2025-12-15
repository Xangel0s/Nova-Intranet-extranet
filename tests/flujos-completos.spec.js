const { test, expect } = require('@playwright/test');

/**
 * Pruebas de Flujos Completos con Video
 * Estas pruebas graban videos completos del flujo de usuario y admin
 */

test.describe('Flujo Completo - Cliente (Usuario)', () => {
  test('flujo completo cliente - desde login hasta logout', async ({ page }) => {
    // Paso 1: Acceder a la página de login
    await page.goto('/cliente/?pagina=login');
    await expect(page.locator('h1')).toContainText('Nova Intranet');
    
    // Paso 2: Realizar login
    await page.fill('input[name="ruc"]', '20123456789');
    await page.fill('input[name="clave"]', 'empresa123');
    await page.click('button[type="submit"]');
    
    // Paso 3: Verificar redirección a órdenes
    await page.waitForURL('**/cliente/?pagina=ordenes', { timeout: 5000 });
    await expect(page.locator('h2')).toContainText('Mis Órdenes');
    await expect(page.locator('.user-info span')).toBeVisible();
    
    // Paso 4: Navegar a perfil
    await page.click('a.nav-link:has-text("Perfil")');
    await expect(page).toHaveURL(/.*pagina=perfil/);
    await expect(page.locator('h2')).toContainText('Mi Perfil');
    
    // Paso 5: Verificar información del perfil
    await expect(page.locator('.profile-info')).toBeVisible();
    
    // Paso 6: Volver a órdenes
    await page.click('a.nav-link:has-text("Órdenes")');
    await expect(page).toHaveURL(/.*pagina=ordenes/);
    
    // Paso 7: Cerrar sesión
    await page.click('a.btn-logout');
    await expect(page).toHaveURL(/.*pagina=login/);
    
    // Paso 8: Verificar que se cerró la sesión (no puede acceder a órdenes)
    await page.goto('/cliente/?pagina=ordenes');
    await expect(page).toHaveURL(/.*pagina=login/);
  });

  test('flujo cliente - validación de campos y errores', async ({ page }) => {
    // Paso 1: Acceder a login
    await page.goto('/cliente/?pagina=login');
    
    // Paso 2: Intentar enviar formulario vacío
    await page.click('button[type="submit"]');
    const errorMessage = page.locator('#errorMessage');
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toContainText('complete todos los campos');
    
    // Paso 3: Intentar login con credenciales inválidas
    await page.fill('input[name="ruc"]', 'ruc_invalido');
    await page.fill('input[name="clave"]', 'password_invalido');
    await page.click('button[type="submit"]');
    await page.waitForTimeout(1000);
    await expect(errorMessage).toContainText('incorrectos');
    
    // Paso 4: Login exitoso
    await page.fill('input[name="ruc"]', '20123456789');
    await page.fill('input[name="clave"]', 'empresa123');
    await page.click('button[type="submit"]');
    await page.waitForURL('**/cliente/?pagina=ordenes');
    await expect(page.locator('h2')).toContainText('Mis Órdenes');
  });
});

test.describe('Flujo Completo - Admin', () => {
  test('flujo completo admin - desde login hasta logout', async ({ page }) => {
    // Paso 1: Acceder a la página de login
    await page.goto('/admin/?pagina=login');
    await expect(page.locator('h1')).toContainText('Nova Extranet');
    
    // Paso 2: Realizar login
    await page.fill('input[name="usuario"]', 'admin');
    await page.fill('input[name="clave"]', 'admin123');
    await page.click('button[type="submit"]');
    
    // Paso 3: Verificar redirección al dashboard
    await page.waitForURL('**/admin/?pagina=inicio', { timeout: 5000 });
    await expect(page.locator('h2')).toContainText('Dashboard');
    await expect(page.locator('.stats-grid')).toBeVisible();
    
    // Paso 4: Verificar estadísticas
    await expect(page.locator('.stat-card')).toHaveCount(3);
    await expect(page.locator('.stat-card:has-text("Total Clientes")')).toBeVisible();
    
    // Paso 5: Navegar a Clientes
    await page.click('a.nav-link:has-text("Clientes")');
    await expect(page).toHaveURL(/.*pagina=clientes/);
    await expect(page.locator('h2')).toContainText('Clientes');
    
    // Paso 6: Navegar a Órdenes
    await page.click('a.nav-link:has-text("Órdenes")');
    await expect(page).toHaveURL(/.*pagina=ordenes/);
    await expect(page.locator('h2')).toContainText('Órdenes');
    
    // Paso 7: Navegar a PDFs
    await page.click('a.nav-link:has-text("PDFs")');
    await expect(page).toHaveURL(/.*pagina=pdf/);
    await expect(page.locator('h2')).toContainText('Documentos PDF');
    
    // Paso 8: Volver al Dashboard
    await page.click('a.nav-link:has-text("Inicio")');
    await expect(page).toHaveURL(/.*pagina=inicio/);
    
    // Paso 9: Cerrar sesión
    await page.click('a.btn-logout');
    await expect(page).toHaveURL(/.*pagina=login/);
    
    // Paso 10: Verificar que se cerró la sesión
    await page.goto('/admin/?pagina=inicio');
    await expect(page).toHaveURL(/.*pagina=login/);
  });

  test('flujo admin - validación de campos y errores', async ({ page }) => {
    // Paso 1: Acceder a login
    await page.goto('/admin/?pagina=login');
    
    // Paso 2: Intentar login con credenciales inválidas
    await page.fill('input[name="usuario"]', 'usuario_invalido');
    await page.fill('input[name="clave"]', 'password_invalido');
    await page.click('button[type="submit"]');
    await page.waitForTimeout(1000);
    
    const errorMessage = page.locator('.error-message');
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toContainText('incorrectos');
    
    // Paso 3: Login exitoso
    await page.fill('input[name="usuario"]', 'admin');
    await page.fill('input[name="clave"]', 'admin123');
    await page.click('button[type="submit"]');
    await page.waitForURL('**/admin/?pagina=inicio');
    await expect(page.locator('h2')).toContainText('Dashboard');
  });

  test('flujo admin - navegación completa por todas las secciones', async ({ page }) => {
    // Login
    await page.goto('/admin/?pagina=login');
    await page.fill('input[name="usuario"]', 'admin');
    await page.fill('input[name="clave"]', 'admin123');
    await page.click('button[type="submit"]');
    await page.waitForURL('**/admin/?pagina=inicio');
    
    // Navegar por todas las secciones
    const secciones = [
      { nombre: 'Inicio', url: 'inicio', titulo: 'Dashboard' },
      { nombre: 'Clientes', url: 'clientes', titulo: 'Clientes' },
      { nombre: 'Órdenes', url: 'ordenes', titulo: 'Órdenes' },
      { nombre: 'PDFs', url: 'pdf', titulo: 'Documentos PDF' }
    ];
    
    for (const seccion of secciones) {
      await page.click(`a.nav-link:has-text("${seccion.nombre}")`);
      await expect(page).toHaveURL(new RegExp(`.*pagina=${seccion.url}`));
      await expect(page.locator('h2')).toContainText(seccion.titulo);
      await page.waitForTimeout(500); // Pausa para el video
    }
    
    // Verificar que la sesión se mantiene
    await expect(page.locator('.user-info span')).toBeVisible();
  });
});

test.describe('Flujo Completo - Comparación Cliente vs Admin', () => {
  test('comparar funcionalidades cliente y admin', async ({ page }) => {
    // === FLUJO CLIENTE ===
    await page.goto('/cliente/?pagina=login');
    await page.fill('input[name="ruc"]', '20123456789');
    await page.fill('input[name="clave"]', 'empresa123');
    await page.click('button[type="submit"]');
    await page.waitForURL('**/cliente/?pagina=ordenes');
    
    // Verificar que cliente ve sus órdenes
    await expect(page.locator('h2')).toContainText('Mis Órdenes');
    await expect(page.locator('nav.nav')).toBeVisible();
    
    // Logout cliente
    await page.click('a.btn-logout');
    await expect(page).toHaveURL(/.*pagina=login/);
    
    // === FLUJO ADMIN ===
    await page.goto('/admin/?pagina=login');
    await page.fill('input[name="usuario"]', 'admin');
    await page.fill('input[name="clave"]', 'admin123');
    await page.click('button[type="submit"]');
    await page.waitForURL('**/admin/?pagina=inicio');
    
    // Verificar que admin ve dashboard con estadísticas
    await expect(page.locator('h2')).toContainText('Dashboard');
    await expect(page.locator('.stats-grid')).toBeVisible();
    await expect(page.locator('.stat-card')).toHaveCount(3);
    
    // Verificar que admin tiene más opciones de navegación
    const navLinks = page.locator('nav.nav a.nav-link');
    const count = await navLinks.count();
    expect(count).toBeGreaterThanOrEqual(4); // Inicio, Clientes, Órdenes, PDFs
  });
});

