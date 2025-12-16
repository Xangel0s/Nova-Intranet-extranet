# Pruebas con Video - Nova Intranet

Este documento explica cómo ejecutar las pruebas que generan videos de los flujos completos del sistema.

## <i class="fa fa-video"></i> Pruebas con Video

Se han creado pruebas específicas que graban videos completos de los flujos de usuario y administrador.

### Archivos de Pruebas

1. **`flujos-completos.spec.js`** - Pruebas de flujo completo con video
2. **`flujos-video.spec.js`** - Pruebas optimizadas para generar videos demostrativos

## <i class="fa fa-rocket"></i> Ejecutar Pruebas con Video

### Ejecutar todas las pruebas de flujo
```bash
npm run test:flujos
```

### Ejecutar pruebas de video (optimizadas para demostración)
```bash
npm run test:videos
```

### Ejecutar con navegador visible
```bash
npm run test:flujos:headed
npm run test:videos:headed
```

## <i class="fa fa-folder"></i> Ubicación de los Videos

Los videos se guardan automáticamente en:
```
test-results/
  └── [nombre-prueba]/
      └── video.webm
```

## <i class="fa fa-film"></i> Flujos Grabados

### Flujo Cliente (Usuario)
1. Acceso a página de login
2. Login con credenciales
3. Visualización de órdenes
4. Navegación a perfil
5. Visualización de información del perfil
6. Navegación de regreso a órdenes
7. Cierre de sesión
8. Verificación de logout

### Flujo Admin
1. Acceso a página de login
2. Login con credenciales de administrador
3. Visualización del dashboard con estadísticas
4. Navegación a sección de Clientes
5. Navegación a sección de Órdenes
6. Navegación a sección de PDFs
7. Regreso al dashboard
8. Cierre de sesión
9. Verificación de logout

### Flujo Comparativo
- Comparación lado a lado de funcionalidades cliente vs admin
- Demostración de diferencias en permisos y opciones disponibles

## <i class="fa fa-cog"></i> Configuración de Video

Los videos están configurados en `playwright.config.js`:
- **Resolución:** 1280x720
- **Formato:** WebM
- **Activación:** Automática en todas las pruebas

## <i class="fa fa-clipboard-list"></i> Comandos Útiles

### Ver solo pruebas que pasaron
```bash
npm run test:flujos -- --reporter=list
```

### Ejecutar una prueba específica
```bash
npx playwright test tests/flujos-video.spec.js -g "flujo completo cliente"
```

### Ver reporte HTML con videos
```bash
npx playwright show-report
```

## <i class="fa fa-bullseye"></i> Uso de los Videos

Los videos generados pueden usarse para:
- **Documentación:** Mostrar cómo funciona el sistema
- **Capacitación:** Enseñar a nuevos usuarios
- **Demostración:** Presentar el sistema a clientes
- **QA:** Revisar el comportamiento del sistema
- **Debugging:** Identificar problemas visuales

## <i class="fa fa-file-alt"></i> Notas

- Los videos incluyen pausas estratégicas para mejor visualización
- Las pruebas están optimizadas para generar videos claros y comprensibles
- Los videos se generan automáticamente, incluso si la prueba falla
- Los videos se guardan en formato WebM (compatible con la mayoría de navegadores)

## <i class="fa fa-search"></i> Ver Videos

1. Ejecutar las pruebas:
   ```bash
   npm run test:videos
   ```

2. Abrir el reporte HTML:
   ```bash
   npx playwright show-report
   ```

3. En el reporte, hacer clic en cualquier prueba para ver el video asociado

## <i class="fa fa-film"></i> Ejemplo de Uso

```bash
# Ejecutar pruebas de video
npm run test:videos

# Ver reporte con videos
npx playwright show-report

# Los videos estarán disponibles en el reporte HTML
# Haz clic en cualquier prueba para reproducir el video
```

