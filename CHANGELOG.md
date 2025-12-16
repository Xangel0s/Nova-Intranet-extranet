# Changelog - Nova Intranet/Extranet

Todos los cambios notables de este proyecto serán documentados en este archivo.

## [2.1.0] - 2024-12-XX

### <i class="fa fa-star"></i> Nuevas Características
- **Sistema de Modales Completo**: Implementación de modales de confirmación y éxito en todas las operaciones CRUD
  - Modales de confirmación para eliminación (usuarios, empresas, PDFs)
  - Modales de éxito/error para crear y editar
  - Limpieza automática de URL para evitar modales al recargar

- **Rediseño de Vista Extranet**: Mejora completa del diseño de documentos del cliente
  - Eliminación del header/navbar para diseño más limpio
  - Título centrado en barra azul de ancho completo
  - Tabla sin bordes visibles para diseño minimalista
  - Footer visible con espaciado correcto
  - Slogan movido debajo del título en rectángulo con bordes

### <i class="fa fa-palette"></i> Mejoras de Diseño
- **Paleta de Colores Nova Solutions**: Aplicación consistente de colores corporativos
  - Azul principal: #1E3A8A
  - Botones y elementos interactivos con colores de marca
  - Eliminación de colores inconsistentes (naranja, cyan)

- **Optimización de Espaciado**:
  - Footer con `margin-top: 60px` para mejor separación
  - Tabla con `margin-bottom: 80px` para respetar espacios
  - Padding ajustado en todos los componentes

### <i class="fa fa-bug"></i> Correcciones de Errores
- **Error de Permisos**: Corregido `tienePermiso()` no definido en `clientesCon.php`
  - Movido `require_once` de `permisosHelper.php` al inicio del archivo

- **Error JSON en Login Extranet**: Corregido error de sintaxis JSON
  - Agregada detección de peticiones AJAX
  - Respuestas JSON correctas con headers apropiados
  - Header `X-Requested-With` en fetch requests

- **Usuarios en Dropdown de Auditoría**: Corregido problema de usuarios no visibles
  - Mejorado método `obtenerUsuariosUnicos()` para manejar usuarios sin campo `usuario`
  - Uso de `COALESCE` para obtener identificador alternativo

- **Admin Inactivo**: Corregido problema de admin mostrándose como inactivo
  - Lógica para forzar `activo = 1` para usuarios admin
  - Script `activar_admin.php` para asegurar estado correcto

### <i class="fa fa-wrench"></i> Optimizaciones
- **Estructura de Código**:
  - Eliminación de mensajes de alerta duplicados (solo modales)
  - Limpieza de código CSS redundante
  - Mejora de organización de archivos

- **Rendimiento**:
  - Optimización de consultas SQL
  - Mejora de carga de recursos CSS/JS

### <i class="fa fa-file-alt"></i> Documentación
- Actualización de README.md con nueva estructura
- Documentación de cambios en CHANGELOG.md

---

## [2.0.0] - 2024-12-XX

### <i class="fa fa-star"></i> Características Principales
- Sistema completo de gestión de usuarios con roles y permisos
- Módulo de auditoría para administradores
- Sistema de notificaciones para PDFs por vencer
- Gestión completa de empresas y documentos
- Paginación en todos los módulos principales

### <i class="fa fa-palette"></i> Diseño
- Dashboard moderno con sidebar y header fijo
- Diseño responsive con hamburger menu
- Sistema de notificaciones con dropdown
- Cards de estadísticas optimizadas

---

## [1.0.0] - 2024-12-XX

### <i class="fa fa-star"></i> Versión Inicial
- Sistema básico de login para clientes y administradores
- Gestión de órdenes y documentos PDF
- Panel de administración básico
- URLs amigables con .htaccess

