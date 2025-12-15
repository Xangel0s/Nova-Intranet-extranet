const { test, expect } = require('@playwright/test');

/**
 * Pruebas de Validación de Consola
 * Verificar que no haya errores en la consola del navegador
 */

test.describe('Validación de Consola - Cliente', () => {
  test('no debe tener errores en consola en login', async ({ page }) => {
    const errors = [];
    
    page.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });
    
    page.on('pageerror', error => {
      errors.push(error.message);
    });
    
    await page.goto('/cliente/?pagina=login');
    await page.waitForLoadState('networkidle');
    
    expect(errors).toHaveLength(0);
  });

  test('no debe tener errores en consola después de login', async ({ page }) => {
    const errors = [];
    
    page.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });
    
    page.on('pageerror', error => {
      errors.push(error.message);
    });
    
    // Login
    await page.goto('/cliente/?pagina=login');
    await page.fill('input[name="ruc"]', '20123456789');
    await page.fill('input[name="clave"]', 'empresa123');
    await page.click('button[type="submit"]');
    await page.waitForURL('**/cliente/?pagina=ordenes');
    await page.waitForLoadState('networkidle');
    
    expect(errors).toHaveLength(0);
  });

  test('no debe tener errores 404 de recursos', async ({ page }) => {
    const failedRequests = [];
    
    page.on('requestfailed', request => {
      if (request.resourceType() !== 'document') {
        failedRequests.push({
          url: request.url(),
          failure: request.failure()?.errorText
        });
      }
    });
    
    await page.goto('/cliente/?pagina=login');
    await page.waitForLoadState('networkidle');
    
    // Filtrar solo errores 404
    const notFoundErrors = failedRequests.filter(req => 
      req.failure && req.failure.includes('net::ERR_')
    );
    
    expect(notFoundErrors).toHaveLength(0);
  });

  test('no debe tener errores en consola en página de órdenes', async ({ page }) => {
    const errors = [];
    
    page.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });
    
    page.on('pageerror', error => {
      errors.push(error.message);
    });
    
    // Login y navegar
    await page.goto('/cliente/?pagina=login');
    await page.fill('input[name="ruc"]', '20123456789');
    await page.fill('input[name="clave"]', 'empresa123');
    await page.click('button[type="submit"]');
    await page.waitForURL('**/cliente/?pagina=ordenes');
    await page.waitForLoadState('networkidle');
    
    expect(errors).toHaveLength(0);
  });

  test('no debe tener errores en consola en página de perfil', async ({ page }) => {
    const errors = [];
    
    page.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });
    
    page.on('pageerror', error => {
      errors.push(error.message);
    });
    
    // Login y navegar
    await page.goto('/cliente/?pagina=login');
    await page.fill('input[name="ruc"]', '20123456789');
    await page.fill('input[name="clave"]', 'empresa123');
    await page.click('button[type="submit"]');
    await page.waitForURL('**/cliente/?pagina=ordenes');
    await page.click('a.nav-link:has-text("Perfil")');
    await page.waitForLoadState('networkidle');
    
    expect(errors).toHaveLength(0);
  });
});

test.describe('Validación de Consola - Admin', () => {
  test('no debe tener errores en consola en login', async ({ page }) => {
    const errors = [];
    
    page.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });
    
    page.on('pageerror', error => {
      errors.push(error.message);
    });
    
    await page.goto('/admin/?pagina=login');
    await page.waitForLoadState('networkidle');
    
    expect(errors).toHaveLength(0);
  });

  test('no debe tener errores en consola después de login', async ({ page }) => {
    const errors = [];
    
    page.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });
    
    page.on('pageerror', error => {
      errors.push(error.message);
    });
    
    // Login
    await page.goto('/admin/?pagina=login');
    await page.fill('input[name="usuario"]', 'admin');
    await page.fill('input[name="clave"]', 'admin123');
    await page.click('button[type="submit"]');
    await page.waitForURL('**/admin/?pagina=inicio');
    await page.waitForLoadState('networkidle');
    
    expect(errors).toHaveLength(0);
  });

  test('no debe tener errores 404 de recursos', async ({ page }) => {
    const failedRequests = [];
    
    page.on('requestfailed', request => {
      if (request.resourceType() !== 'document') {
        failedRequests.push({
          url: request.url(),
          failure: request.failure()?.errorText
        });
      }
    });
    
    await page.goto('/admin/?pagina=login');
    await page.waitForLoadState('networkidle');
    
    // Filtrar solo errores 404
    const notFoundErrors = failedRequests.filter(req => 
      req.failure && req.failure.includes('net::ERR_')
    );
    
    expect(notFoundErrors).toHaveLength(0);
  });

  test('no debe tener errores en consola en todas las páginas admin', async ({ page }) => {
    const errors = [];
    
    page.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });
    
    page.on('pageerror', error => {
      errors.push(error.message);
    });
    
    // Login
    await page.goto('/admin/?pagina=login');
    await page.fill('input[name="usuario"]', 'admin');
    await page.fill('input[name="clave"]', 'admin123');
    await page.click('button[type="submit"]');
    await page.waitForURL('**/admin/?pagina=inicio');
    
    // Navegar por todas las páginas
    const pages = ['inicio', 'clientes', 'ordenes', 'pdf'];
    
    for (const pageName of pages) {
      await page.goto(`/admin/?pagina=${pageName}`);
      await page.waitForLoadState('networkidle');
    }
    
    expect(errors).toHaveLength(0);
  });
});

