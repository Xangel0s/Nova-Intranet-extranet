# Script de Instalación Automática - NovaIntranet

## ⚠️ ADVERTENCIA DE SEGURIDAD

**Este script debe ser eliminado después de la instalación.**

No dejar este archivo en servidores de producción o accesibles públicamente.

## 📋 Descripción

Este script automatiza la instalación de la base de datos del sistema NovaIntranet.

## 🚀 Uso

1. Asegúrate de que MySQL esté ejecutándose
2. Accede a: `http://localhost/crear_db_automaticamente/install.php`
3. El script creará automáticamente:
   - La base de datos `nova_intranet`
   - Todas las tablas necesarias (clientes, pdf, usuarios)
   - Los datos de prueba

## 🔒 Seguridad

- El script solo puede ejecutarse desde localhost
- Incluye protección básica contra acceso remoto
- **IMPORTANTE:** Eliminar después de la instalación

## 📝 Requisitos

- PHP 7.2+
- MySQL 5.5+
- Extensiones PHP: PDO, PDO_MySQL
- Acceso a MySQL con permisos de CREATE DATABASE

## ✅ Después de la Instalación

1. Verifica que la base de datos se creó correctamente
2. Verifica que los archivos `config.php` estén configurados
3. **ELIMINA esta carpeta completa** antes de subir a producción

## 📊 Tablas Creadas

- **clientes** - Información de empresas/clientes
- **pdf** - Documentos PDF del sistema
- **usuarios** - Usuarios administradores

## 🔑 Credenciales de Prueba

### Cliente:
- RUC: `20123456789`
- Contraseña: `empresa123`

### Admin:
- Usuario: `admin`
- Contraseña: `admin123`

