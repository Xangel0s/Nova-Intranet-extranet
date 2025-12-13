# 🔗 Links para Validación Completa del Sistema

## 📋 Índice
1. [Login Cliente (Intranet)](#1-login-cliente-intranet)
2. [Login Admin (Extranet)](#2-login-admin-extranet)
3. [Instalación Base de Datos](#3-instalación-base-de-datos)
4. [Páginas Principales](#4-páginas-principales)
5. [Credenciales de Prueba](#5-credenciales-de-prueba)

---

## 1. LOGIN CLIENTE (INTRANET)

### URLs Principales:
- **Login Principal:** `http://localhost/cliente`
- **Login Directo:** `http://localhost/cliente/?pagina=login`
- **Dashboard (después de login):** `http://localhost/cliente/?pagina=ordenes`

### Características:
- ✅ Login con RUC y contraseña
- ✅ Validación AJAX mejorada
- ✅ Redirección automática después de login exitoso
- ✅ Manejo de errores mejorado

---

## 2. LOGIN ADMIN (EXTRANET)

### URLs Principales:
- **Login Principal:** `http://localhost/admin`
- **Login Directo:** `http://localhost/admin/?pagina=login`
- **Dashboard (después de login):** `http://localhost/admin/?pagina=inicio`

### Características:
- ✅ Login con usuario y contraseña
- ✅ Redirección automática después de login exitoso
- ✅ Manejo de sesiones con cookies
- ✅ Mensajes de error personalizados

---

## 3. INSTALACIÓN BASE DE DATOS

### URL:
- **Instalador:** `http://localhost/crear_db_automaticamente/install.php`

### Funcionalidad:
- ✅ Crea la base de datos `nova_intranet` automáticamente
- ✅ Crea todas las tablas necesarias (`clientes`, `pdf`, `usuarios`)
- ✅ Inserta datos de prueba
- ✅ Muestra credenciales de prueba al finalizar

### Nota:
⚠️ **Importante:** Ejecutar este script solo una vez. Si la base de datos ya existe, mostrará mensajes informativos.

---

## 4. PÁGINAS PRINCIPALES

### Cliente (Intranet):
- **Ordenes:** `http://localhost/cliente/?pagina=ordenes`
- **Perfil:** `http://localhost/cliente/?pagina=perfil`
- **PDFs:** `http://localhost/cliente/?pagina=pdfs`

### Admin (Extranet):
- **Inicio/Dashboard:** `http://localhost/admin/?pagina=inicio`
- **Clientes:** `http://localhost/admin/?pagina=clientes`
- **Ordenes:** `http://localhost/admin/?pagina=ordenes`
- **PDFs:** `http://localhost/admin/?pagina=pdf`
- **Productos:** `http://localhost/admin/?pagina=productos`
- **Perfil:** `http://localhost/admin/?pagina=perfil`

---

## 5. CREDENCIALES DE PRUEBA

### 🔑 Credenciales Creadas Automáticamente:

#### **CLIENTE (INTRANET):**
- **RUC:** `20123456789`
- **Contraseña:** `empresa123`
- **Empresa:** Nova Solutions S.A.C.

#### **ADMIN (EXTRANET):**
- **Usuario:** `admin`
- **Contraseña:** `admin123`
- **Nombre:** Administrador del Sistema

### 📝 Otros Usuarios de Prueba (Cliente):
- **RUC:** `admin` | **Contraseña:** `admin123`
- **RUC:** `user` | **Contraseña:** `user123`

### ⚠️ IMPORTANTE:
Estas credenciales se crean automáticamente al ejecutar el script de instalación (`install.php`).
Si ya ejecutaste el script, estas credenciales ya están disponibles.

---

## 🔍 CHECKLIST DE VALIDACIÓN

### ✅ Pre-requisitos:
- [ ] Apache corriendo en XAMPP
- [ ] MySQL corriendo en XAMPP
- [ ] Base de datos instalada (ejecutar `install.php`)

### ✅ Validación Cliente:
- [ ] Acceder a `http://localhost/cliente`
- [ ] Verificar que carga el formulario de login
- [ ] Probar login con credenciales válidas
- [ ] Verificar redirección a `?pagina=ordenes`
- [ ] Probar login con credenciales inválidas
- [ ] Verificar que muestra error sin redirigir a "#"

### ✅ Validación Admin:
- [ ] Acceder a `http://localhost/admin`
- [ ] Verificar que carga el formulario de login
- [ ] Probar login con credenciales válidas
- [ ] Verificar redirección a `?pagina=inicio`
- [ ] Probar login con credenciales inválidas
- [ ] Verificar que muestra error correctamente

### ✅ Validación Base de Datos:
- [ ] Ejecutar `http://localhost/crear_db_automaticamente/install.php`
- [ ] Verificar que crea la base de datos
- [ ] Verificar que crea las tablas
- [ ] Verificar que inserta datos de prueba
- [ ] Anotar credenciales de prueba mostradas

---

## 🛠️ SOLUCIÓN DE PROBLEMAS

### Error 404:
- Verificar que Apache esté corriendo
- Verificar que los archivos estén en `C:\xampp\htdocs\`
- Limpiar caché del navegador (Ctrl+F5)

### Error de conexión a BD:
- Verificar que MySQL esté corriendo
- Verificar credenciales en `config/config.php`
- Ejecutar el script de instalación

### Error de sesión:
- Verificar que `session_start()` esté en `config/sistema.php`
- Limpiar cookies del navegador
- Verificar permisos de escritura en carpeta de sesiones

### Redirección a "#":
- ✅ **RESUELTO:** Se corrigió el manejo de respuestas JSON
- Limpiar caché del navegador si persiste

---

## 📝 NOTAS FINALES

- **Puerto por defecto:** 80 (http://localhost)
- **Base de datos:** `nova_intranet`
- **Usuario MySQL:** `root` (sin contraseña por defecto en XAMPP)
- **Estructura:** MVC (Modelo-Vista-Controlador)
- **Sesiones:** PHP `$_SESSION['id_nova']`

---

**Última actualización:** $(Get-Date -Format "yyyy-MM-dd HH:mm:ss")

