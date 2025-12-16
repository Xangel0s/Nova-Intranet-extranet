# Pruebas E2E con Playwright - Nova Intranet

Este directorio contiene las pruebas end-to-end (E2E) para el sistema Nova Intranet/Extranet utilizando Playwright.

## <i class="fa fa-clipboard-list"></i> Requisitos Previos

1. **Node.js** instalado (versión 14 o superior)
2. **Apache** corriendo en `http://localhost`
3. **MySQL** corriendo con la base de datos `nova_intranet` configurada
4. Base de datos instalada ejecutando: `http://localhost/crear_db_automaticamente/install.php`

## <i class="fa fa-rocket"></i> Instalación

1. Instalar dependencias:
```bash
npm install
```

2. Instalar navegadores de Playwright:
```bash
npx playwright install
```

## <i class="fa fa-flask"></i> Ejecutar Pruebas

### Ejecutar todas las pruebas
```bash
npm test
```

### Ejecutar pruebas en modo headed (con navegador visible)
```bash
npm run test:headed
```

### Ejecutar pruebas con UI interactiva
```bash
npm run test:ui
```

### Ejecutar pruebas en modo debug
```bash
npm run test:debug
```

### Ejecutar pruebas específicas
```bash
npx playwright test tests/auth.spec.js
npx playwright test tests/navigation.spec.js
npx playwright test tests/console-validation.spec.js
```

## <i class="fa fa-folder"></i> Estructura de Pruebas

- **auth.spec.js**: Pruebas de autenticación (login cliente/admin, logout)
- **navigation.spec.js**: Pruebas de navegación entre páginas
- **console-validation.spec.js**: Validación de errores en consola del navegador
- **client-features.spec.js**: Pruebas de funcionalidades del cliente
- **admin-features.spec.js**: Pruebas de funcionalidades del admin

## <i class="fa fa-key"></i> Credenciales de Prueba

### Cliente (Intranet)
- **RUC:** `20123456789`
- **Contraseña:** `empresa123`

### Admin (Extranet)
- **Usuario:** `admin`
- **Contraseña:** `admin123`

## <i class="fa fa-chart-bar"></i> Ver Reportes

Después de ejecutar las pruebas, se genera un reporte HTML:
```bash
npx playwright show-report
```

## <i class="fa fa-cog"></i> Configuración

La configuración de Playwright está en `playwright.config.js`. Puedes modificar:
- Base URL
- Navegadores a probar
- Timeouts
- Screenshots y videos

## <i class="fa fa-bug"></i> Solución de Problemas

### Error: "Cannot find module '@playwright/test'"
Ejecuta: `npm install`

### Error: "Base URL not accessible"
Asegúrate de que Apache esté corriendo en `http://localhost`

### Error: "Database connection failed"
Ejecuta el script de instalación de la base de datos primero

## <i class="fa fa-file-alt"></i> Notas

- Las pruebas asumen que el servidor está corriendo en `http://localhost`
- Las pruebas requieren que la base de datos esté configurada con datos de prueba
- Algunas pruebas pueden fallar si la base de datos no tiene los datos esperados

