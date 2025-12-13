# NovaIntranet - Sistema de Gestión Intranet/Extranet

Sistema completo de gestión para clientes (Intranet) y administradores (Extranet) desarrollado en PHP con arquitectura MVC.

## 📋 Tabla de Contenidos

- [Características](#características)
- [Requisitos](#requisitos)
- [Instalación](#instalación)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [URLs del Sistema](#urls-del-sistema)
- [Credenciales de Prueba](#credenciales-de-prueba)
- [Errores Corregidos](#errores-corregidos)
- [Problemas Conocidos y Soluciones](#problemas-conocidos-y-soluciones)
- [Configuración](#configuración)
- [Desarrollo](#desarrollo)

---

## 🚀 Características

- ✅ Sistema de autenticación para clientes y administradores
- ✅ Gestión de órdenes y documentos PDF
- ✅ Panel de administración completo
- ✅ URLs amigables y limpias
- ✅ Arquitectura MVC
- ✅ Base de datos MySQL
- ✅ Diseño responsive

---

## 📦 Requisitos

- **PHP:** 7.2 o superior
- **MySQL:** 5.5 o superior
- **Apache:** Con mod_rewrite habilitado
- **XAMPP/WAMP:** Para entorno de desarrollo local

---

## 🔧 Instalación

### 1. Clonar el Repositorio

```bash
git clone https://github.com/Xangel0s/Nova-Intranet-extranet.git
cd Nova-Intranet-extranet
```

### 2. Configurar el Entorno

1. Copiar los archivos a `C:\xampp\htdocs\` (o tu directorio web)
2. La estructura debe quedar así:
   ```
   htdocs/
   ├── cliente/
   ├── admin/
   └── crear_db_automaticamente/
   ```

### 3. Instalar Base de Datos

1. Asegúrate de que MySQL esté corriendo
2. Accede a: `http://localhost/crear_db_automaticamente/install.php`
3. El script creará automáticamente:
   - Base de datos `nova_intranet`
   - Tablas necesarias (`clientes`, `pdf`, `usuarios`)
   - Datos de prueba

### 4. Configurar Archivos de Configuración

Los archivos `config.php` ya están configurados para desarrollo local. Si necesitas cambiar la configuración:

- **Cliente:** `cliente/config/config.php`
- **Admin:** `admin/config/config.php`

---

## 📁 Estructura del Proyecto

```
htdocs/
├── cliente/                    # Sistema de Clientes (Intranet)
│   ├── app/
│   │   ├── controlador/        # Controladores MVC
│   │   ├── modelo/             # Modelos de datos
│   │   ├── vista/              # Vistas/Templates
│   │   ├── css/                # Estilos CSS
│   │   └── js/                 # Scripts JavaScript
│   ├── config/
│   │   ├── config.php          # Configuración
│   │   └── sistema.php         # Clase de conexión BD
│   ├── include/                # Recursos compartidos
│   │   ├── css/                # CSS globales
│   │   ├── fonts/              # Fuentes (Font Awesome)
│   │   └── images/             # Imágenes
│   ├── publico/                # Archivos públicos (PDFs)
│   ├── index.php               # Punto de entrada
│   └── .htaccess               # URLs amigables
│
├── admin/                      # Sistema de Administración (Extranet)
│   ├── app/
│   │   ├── controlador/        # Controladores MVC
│   │   ├── modelo/             # Modelos de datos
│   │   ├── vista/              # Vistas/Templates
│   │   ├── css/                # Estilos CSS
│   │   └── js/                 # Scripts JavaScript
│   ├── config/
│   │   ├── config.php          # Configuración
│   │   └── sistema.php         # Clase de conexión BD
│   ├── include/                # Recursos compartidos
│   ├── publico/                # Archivos públicos
│   ├── index.php               # Punto de entrada
│   └── .htaccess               # URLs amigables
│
└── crear_db_automaticamente/    # Script de instalación
    └── install.php              # Instalador de BD
```

---

## 🌐 URLs del Sistema

### Cliente (Intranet)
- **Login:** `http://localhost/cliente`
- **Órdenes:** `http://localhost/cliente/?pagina=ordenes`
- **Perfil:** `http://localhost/cliente/?pagina=perfil`

### Admin (Extranet)
- **Login:** `http://localhost/admin`
- **Dashboard:** `http://localhost/admin/?pagina=inicio`
- **Clientes:** `http://localhost/admin/?pagina=clientes`
- **Órdenes:** `http://localhost/admin/?pagina=ordenes`
- **PDFs:** `http://localhost/admin/?pagina=pdf`
- **Productos:** `http://localhost/admin/?pagina=productos`

---

## 🔑 Credenciales de Prueba

### Cliente (Intranet)
- **RUC:** `20123456789`
- **Contraseña:** `empresa123`

### Admin (Extranet)
- **Usuario:** `admin`
- **Contraseña:** `admin123`

> ⚠️ **Nota:** Estas credenciales se crean automáticamente al ejecutar el script de instalación.

---

## 🐛 Errores Corregidos

### 1. ❌ Error 404 en Login Cliente y Admin

**Problema:**
- Los formularios de login redirigían a URLs incorrectas
- Las rutas en `config.php` no coincidían con la nueva estructura

**Solución:**
- ✅ Actualizado `cliente/config/config.php` → Ruta: `/cliente/`
- ✅ Actualizado `admin/config/config.php` → Ruta: `/admin/`
- ✅ Corregidos `form action` en `login.phtml` de ambos sistemas
- ✅ Corregidas redirecciones en controladores

**Archivos modificados:**
- `cliente/config/config.php`
- `admin/config/config.php`
- `cliente/app/vista/login.phtml`
- `admin/app/vista/login.phtml`
- `cliente/app/controlador/loginCon.php`
- `admin/app/controlador/loginCon.php`

---

### 2. ❌ Error 404 en Fuentes Font Awesome

**Problema:**
- El CSS buscaba archivos con hash `5b62` en el nombre
- Los archivos tenían nombres sin hash

**Solución:**
- ✅ Creados archivos con nombres correctos:
  - `fontawesome-webfont5b62.woff2`
  - `fontawesome-webfont5b62.woff`
  - `fontawesome-webfont5b62.ttf`
  - `fontawesome-webfont5b62.eot`
  - `fontawesome-webfontd41d.eot`
  - `fontawesome-webfont5b62.svg`

**Ubicación:**
- `cliente/include/fonts/`

---

### 3. ❌ Redirección a "#" en Login Cliente

**Problema:**
- El login AJAX no manejaba correctamente las respuestas JSON
- Faltaba el header `Content-Type: application/json`
- El JavaScript no validaba correctamente las respuestas

**Solución:**
- ✅ Agregado header JSON en `cliente/app/modelo/loginModelo.php`
- ✅ Mejorado manejo de errores con JSON válido
- ✅ Mejorada validación de respuestas en JavaScript
- ✅ Agregada validación de campos antes de procesar

**Archivos modificados:**
- `cliente/app/modelo/loginModelo.php`
- `cliente/app/vista/login.phtml`

---

### 4. ❌ Error en Lógica de Login Admin

**Problema:**
- El modelo buscaba usuario por campo `dni` que no existía
- Debería buscar por campo `usuario`

**Solución:**
- ✅ Corregida consulta SQL para usar campo `usuario`
- ✅ Mejorado manejo de errores y redirecciones
- ✅ Agregada validación de campos

**Archivos modificados:**
- `admin/app/modelo/loginModelo.php`
- `admin/app/controlador/loginCon.php`

---

### 5. ❌ Error 403 en Script de Instalación

**Problema:**
- El `.htaccess` en `crear_db_automaticamente/` era muy restrictivo
- Bloqueaba el acceso al script de instalación

**Solución:**
- ✅ Ajustado `.htaccess` para permitir acceso local
- ✅ Script movido a carpeta dedicada para mejor organización

**Archivos modificados:**
- `crear_db_automaticamente/.htaccess`

---

### 6. ❌ Estructura de URLs Larga y Expuesta

**Problema:**
- URLs largas como: `http://localhost/novasolutions/Nova-Intranet-extranet/Intranet-Extranet/intranet/cliente`
- Exponía la estructura interna del proyecto

**Solución:**
- ✅ Reorganizada estructura del proyecto
- ✅ Movidas carpetas `cliente/` y `admin/` a raíz de `htdocs/`
- ✅ Creados archivos `.htaccess` para URLs amigables
- ✅ Actualizadas todas las rutas en archivos de configuración

**Resultado:**
- URLs limpias: `http://localhost/cliente` y `http://localhost/admin`

---

## ⚠️ Problemas Conocidos y Soluciones

### Problema: Error 404 al acceder a rutas

**Causa:** Apache `mod_rewrite` no está habilitado

**Solución:**
1. Abrir `httpd.conf` en XAMPP
2. Buscar `LoadModule rewrite_module`
3. Asegurarse de que NO esté comentado (sin `#` al inicio)
4. Reiniciar Apache

---

### Problema: Error de conexión a base de datos

**Causa:** Credenciales incorrectas o MySQL no está corriendo

**Solución:**
1. Verificar que MySQL esté corriendo en XAMPP
2. Verificar credenciales en `config/config.php`:
   ```php
   define('HOST', 'localhost');
   define('USER', 'root');
   define('PASSWORD', ''); // Cambiar si tienes contraseña
   define('DB_NAME', 'nova_intranet');
   ```
3. Ejecutar el script de instalación: `http://localhost/crear_db_automaticamente/install.php`

---

### Problema: Fuentes Font Awesome no cargan

**Causa:** Archivos de fuentes faltantes o con nombres incorrectos

**Solución:**
1. Verificar que existan los archivos en `cliente/include/fonts/`:
   - `fontawesome-webfont5b62.woff2`
   - `fontawesome-webfont5b62.woff`
   - `fontawesome-webfont5b62.ttf`
2. Si faltan, copiar desde `admin/include/vendors/font-awesome/fonts/` y renombrar

---

### Problema: Sesiones no funcionan

**Causa:** `session_start()` no se ejecuta o permisos incorrectos

**Solución:**
1. Verificar que `session_start()` esté en `config/sistema.php`
2. Verificar permisos de escritura en carpeta de sesiones PHP
3. Limpiar cookies del navegador

---

### Problema: Redirección a "#" después de login

**Causa:** Caché del navegador o respuesta JSON inválida

**Solución:**
1. ✅ **RESUELTO:** Se corrigió el manejo de respuestas JSON
2. Limpiar caché del navegador (Ctrl+Shift+Delete)
3. Hacer hard refresh (Ctrl+F5)

---

### Problema: Error 500 Internal Server Error

**Causa:** Error en PHP o configuración incorrecta

**Solución:**
1. Revisar logs de Apache en `C:\xampp\apache\logs\error.log`
2. Verificar que PHP esté configurado correctamente
3. Verificar permisos de archivos

---

## ⚙️ Configuración

### Configuración de Base de Datos

Editar `cliente/config/config.php` y `admin/config/config.php`:

```php
define('HOST', 'localhost');
define('USER', 'root');
define('PASSWORD', ''); // Tu contraseña de MySQL
define('DB_NAME', 'nova_intranet');
```

### Configuración de Rutas

Las rutas se configuran automáticamente, pero puedes modificarlas en:
- `cliente/config/config.php` → `define('ruta', 'http://'.$_SERVER["HTTP_HOST"].'/cliente/');`
- `admin/config/config.php` → `define('ruta', $protocol . '://' . $_SERVER["HTTP_HOST"] . '/admin/');`

---

## 🔒 Seguridad

### ⚠️ IMPORTANTE - Antes de Subir a Producción:

1. **Eliminar script de instalación:**
   ```bash
   rm -rf crear_db_automaticamente/
   ```

2. **Cambiar credenciales de prueba:**
   - Cambiar contraseñas en base de datos
   - Eliminar usuarios de prueba

3. **Configurar HTTPS:**
   - Usar certificado SSL
   - Forzar redirección HTTP → HTTPS

4. **Ocultar información de errores:**
   - Configurar `display_errors = Off` en `php.ini`
   - Usar logs para debugging

5. **Proteger archivos sensibles:**
   - Verificar que `.htaccess` proteja archivos de configuración
   - No subir `config.php` con credenciales reales

---

## 🛠️ Desarrollo

### Estructura MVC

- **Modelo:** `app/modelo/` - Lógica de negocio y acceso a datos
- **Vista:** `app/vista/` - Templates HTML/PHP
- **Controlador:** `app/controlador/` - Manejo de peticiones

### Agregar Nueva Página

1. Crear controlador: `app/controlador/nuevaPaginaCon.php`
2. Crear vista: `app/vista/nuevaPagina.phtml`
3. Crear modelo (si es necesario): `app/modelo/nuevaPaginaModelo.php`
4. Acceder: `http://localhost/cliente/?pagina=nuevaPagina`

---

## 📝 Changelog

### Versión 2.0 - Reorganización Completa
- ✅ Reorganizada estructura del proyecto
- ✅ URLs limpias y amigables
- ✅ Corregidos todos los errores de login
- ✅ Corregidos errores de Font Awesome
- ✅ Mejorado manejo de errores
- ✅ Script de instalación automatizado

### Versión 1.0 - Versión Inicial
- Sistema básico funcional

---

## 👥 Contribuidores

- **Desarrollador Principal:** Xangel0s
- **Reorganización y Correcciones:** Sistema de correcciones automatizadas

---

## 📄 Licencia

Este proyecto es privado y de uso exclusivo de Nova Solutions S.A.C.

---

## 📞 Soporte

Para reportar problemas o sugerencias, crear un issue en el repositorio de GitHub.

---

**Última actualización:** Diciembre 2024

