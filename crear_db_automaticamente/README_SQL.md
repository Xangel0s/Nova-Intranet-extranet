# 📄 Archivo SQL Unificado - NovaIntranet

## 📋 Descripción

Este documento describe el archivo SQL unificado que contiene toda la estructura de la base de datos y los datos de prueba del sistema NovaIntranet.

## 📁 Archivo

**Ubicación:** `crear_db_automaticamente/database_completo.sql`

## 🗄️ Contenido del SQL

### 1. Creación de Base de Datos
```sql
CREATE DATABASE IF NOT EXISTS `nova_intranet` 
CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### 2. Tablas Creadas

#### 📊 Tabla: `clientes`
- **Propósito:** Almacena información de clientes/empresas
- **Campos principales:**
  - `id` - ID único
  - `ruc` - RUC o identificador único (usado para login)
  - `razon_social` - Nombre de la empresa
  - `clave` - Contraseña
  - `correo` - Email de contacto
  - `telefono`, `direccion`, `representante` - Datos adicionales

#### 📄 Tabla: `pdf`
- **Propósito:** Almacena documentos PDF asociados a clientes
- **Campos principales:**
  - `id` - ID único
  - `id_user` - ID del cliente propietario (FK)
  - `pdf` - Nombre del archivo PDF
  - `estado` - Estado: 0=Observado, 1=Aprobado
  - `vista` - Si fue visualizado: 0=No, 1=Sí
  - `fecha_subida`, `fecha_eliminacion` - Fechas importantes

#### 👤 Tabla: `usuarios`
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

#### 👥 Clientes de Prueba
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

#### 👤 Usuarios Administradores de Prueba
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

#### 📄 PDFs de Prueba
- Se crean 5 documentos PDF de ejemplo asociados a los clientes
- Incluyen diferentes estados (aprobados, observados)
- Algunos marcados como visualizados

## 🚀 Uso

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

## ✅ Ventajas del SQL Unificado

1. **Mantenibilidad:** Todo el SQL en un solo archivo
2. **Versionado:** Fácil de rastrear cambios en Git
3. **Portabilidad:** Puede ejecutarse en cualquier entorno MySQL
4. **Documentación:** Incluye comentarios explicativos
5. **Reutilización:** Puede usarse para backups o migraciones

## 🔒 Seguridad

⚠️ **IMPORTANTE:**
- Este archivo contiene datos de prueba
- **NO** usar en producción sin modificar contraseñas
- **NO** subir a repositorios públicos con credenciales reales
- Eliminar datos de prueba antes de producción

## 📝 Notas

- El archivo usa `INSERT IGNORE` para evitar duplicados
- Las tablas usan `IF NOT EXISTS` para evitar errores
- Todas las tablas usan UTF8MB4 para soporte completo de caracteres
- Se incluyen índices para optimizar consultas
- Se incluyen foreign keys para integridad referencial

## 🔄 Actualizaciones

Si necesitas modificar la estructura:
1. Editar `database_completo.sql`
2. Ejecutar el script de instalación nuevamente
3. O ejecutar solo las sentencias nuevas en MySQL

---

**Última actualización:** Diciembre 2024

