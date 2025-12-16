# <i class="fa fa-file"></i> Archivo SQL Unificado - NovaIntranet

## <i class="fa fa-clipboard-list"></i> Descripción

Este documento describe el archivo SQL unificado que contiene toda la estructura de la base de datos y los datos de prueba del sistema NovaIntranet.

## <i class="fa fa-folder"></i> Archivo

**Ubicación:** `crear_db_automaticamente/database_completo.sql`

## <i class="fa fa-database"></i> Contenido del SQL

### 1. Creación de Base de Datos
```sql
CREATE DATABASE IF NOT EXISTS `nova_intranet` 
CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### 2. Tablas Creadas

#### <i class="fa fa-table"></i> Tabla: `clientes`
- **Propósito:** Almacena información de clientes/empresas
- **Campos principales:**
  - `id` - ID único
  - `ruc` - RUC o identificador único (usado para login)
  - `razon_social` - Nombre de la empresa
  - `clave` - Contraseña
  - `correo` - Email de contacto
  - `telefono`, `direccion`, `representante` - Datos adicionales

#### <i class="fa fa-file"></i> Tabla: `pdf`
- **Propósito:** Almacena documentos PDF asociados a clientes
- **Campos principales:**
  - `id` - ID único
  - `id_user` - ID del cliente propietario (FK)
  - `pdf` - Nombre del archivo PDF
  - `estado` - Estado: 0=Observado, 1=Aprobado
  - `vista` - Si fue visualizado: 0=No, 1=Sí
  - `fecha_subida`, `fecha_eliminacion` - Fechas importantes

#### <i class="fa fa-user"></i> Tabla: `usuarios`
- **Propósito:** Almacena usuarios administradores del sistema
- **Campos principales:**
  - `id` - ID único
  - `usuario` - Nombre de usuario (único)
  - `clave` - Contraseña
  - `nombre` - Nombre completo
  - `correo` - Email
  - `rol` - Rol del usuario (admin, supervisor, operador)
  - `activo` - Si el usuario está activo

### 3. Datos de Prueba

#### <i class="fa fa-users"></i> Clientes de Prueba
1. **Nova Solutions S.A.C.**
   - RUC: `20123456789`
   - Contraseña: `empresa123`
   - Email: `contacto@novasolutions.com`

2. **TechCorp Perú S.A.C.**
   - RUC: `20134567890`
   - Contraseña: `techcorp123`
   - Email: `info@techcorp.pe`

3. **Digital Services E.I.R.L.**
   - RUC: `20145678901`
   - Contraseña: `digital123`
   - Email: `contacto@digitalservices.pe`

#### <i class="fa fa-user"></i> Usuarios Administradores de Prueba
1. **admin**
   - Usuario: `admin`
   - Contraseña: `admin123`
   - Rol: `admin`
   - Email: `admin@novasolutions.com`

2. **supervisor**
   - Usuario: `supervisor`
   - Contraseña: `supervisor123`
   - Rol: `supervisor`
   - Email: `supervisor@novasolutions.com`

3. **operador**
   - Usuario: `operador`
   - Contraseña: `operador123`
   - Rol: `operador`
   - Email: `operador@novasolutions.com`

#### <i class="fa fa-file"></i> PDFs de Prueba
- Se crean 5 documentos PDF de ejemplo asociados a los clientes
- Incluyen diferentes estados (aprobados, observados)
- Algunos marcados como visualizados

## <i class="fa fa-rocket"></i> Uso

### Opción 1: Usar el Script de Instalación PHP
```bash
# Acceder vía navegador:
http://localhost/Nova-Intranet-extranet/crear_db_automaticamente/install.php
```

El script `install.php` lee automáticamente el archivo `database_completo.sql` y ejecuta todas las sentencias.

### Opción 2: Ejecutar SQL Directamente
```bash
# Desde MySQL CLI:
mysql -u root -p < crear_db_automaticamente/database_completo.sql

# O desde phpMyAdmin:
# 1. Abrir phpMyAdmin
# 2. Seleccionar "Importar"
# 3. Seleccionar el archivo database_completo.sql
# 4. Ejecutar
```

## <i class="fa fa-check"></i> Ventajas del SQL Unificado

1. **Mantenibilidad:** Todo el SQL en un solo archivo
2. **Versionado:** Fácil de rastrear cambios en Git
3. **Portabilidad:** Puede ejecutarse en cualquier entorno MySQL
4. **Documentación:** Incluye comentarios explicativos
5. **Reutilización:** Puede usarse para backups o migraciones

## <i class="fa fa-lock"></i> Seguridad

<i class="fa fa-exclamation-triangle"></i> **IMPORTANTE:**
- Este archivo contiene datos de prueba
- **NO** usar en producción sin modificar contraseñas
- **NO** subir a repositorios públicos con credenciales reales
- Eliminar datos de prueba antes de producción

## <i class="fa fa-file-alt"></i> Notas

- El archivo usa `INSERT IGNORE` para evitar duplicados
- Las tablas usan `IF NOT EXISTS` para evitar errores
- Todas las tablas usan UTF8MB4 para soporte completo de caracteres
- Se incluyen índices para optimizar consultas
- Se incluyen foreign keys para integridad referencial

## <i class="fa fa-sync"></i> Actualizaciones

Si necesitas modificar la estructura:
1. Editar `database_completo.sql`
2. Ejecutar el script de instalación nuevamente
3. O ejecutar solo las sentencias nuevas en MySQL

---

**Última actualización:** Diciembre 2024

