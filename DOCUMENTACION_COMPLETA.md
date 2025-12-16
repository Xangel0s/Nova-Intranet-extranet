# <i class="fa fa-book"></i> Documentación Completa - Nova Intranet/Extranet

**Sistema de Gestión Integral para Nova Solutions S.A.C.**

---

## <i class="fa fa-clipboard-list"></i> Tabla de Contenidos

1. [Descripción General](#descripción-general)
2. [Características del Sistema](#características-del-sistema)
3. [Arquitectura y Estructura](#arquitectura-y-estructura)
4. [Módulos Implementados](#módulos-implementados)
5. [Sistema de Usuarios y Permisos](#sistema-de-usuarios-y-permisos)
6. [Base de Datos](#base-de-datos)
7. [Instalación y Configuración](#instalación-y-configuración)
8. [Diseño y UI/UX](#diseño-y-uiux)
9. [Errores Corregidos](#errores-corregidos)
10. [Seguridad](#seguridad)
11. [Desarrollo y Contribución](#desarrollo-y-contribución)
12. [Changelog](#changelog)

---

## <i class="fa fa-book-open"></i> Descripción General

**Nova Intranet/Extranet** es un sistema completo de gestión desarrollado en PHP con arquitectura MVC (Modelo-Vista-Controlador) que permite:

- **Intranet**: Gestión interna de usuarios, empresas, documentos PDF y auditoría
- **Extranet**: Portal para clientes donde pueden visualizar y descargar sus documentos

El sistema está diseñado para ser escalable, seguro y fácil de mantener, siguiendo las mejores prácticas de desarrollo web.

### Tecnologías Utilizadas

- **Backend**: PHP 7.2+
- **Base de Datos**: MySQL 5.5+
- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Servidor Web**: Apache con mod_rewrite
- **Arquitectura**: MVC (Modelo-Vista-Controlador)
- **Testing**: Playwright (E2E)

---

## <i class="fa fa-rocket"></i> Características del Sistema

### <i class="fa fa-star"></i> Características Principales

#### 1. **Sistema de Autenticación**
- Login seguro para usuarios de intranet
- Login para clientes en extranet (por RUC)
- Sesiones PHP con protección CSRF
- Logout seguro con limpieza de sesiones

#### 2. **Gestión de Usuarios (Intranet)**
- <i class="fa fa-check"></i> Crear, editar, eliminar usuarios
- <i class="fa fa-check"></i> Sistema de roles: Admin, Editor, Visualizador
- <i class="fa fa-check"></i> Activación/desactivación de usuarios
- <i class="fa fa-check"></i> Campo "Área" para organización
- <i class="fa fa-check"></i> Protección del usuario admin
- <i class="fa fa-check"></i> Paginación en tabla de usuarios

#### 3. **Gestión de Empresas/Clientes**
- <i class="fa fa-check"></i> CRUD completo de empresas
- <i class="fa fa-check"></i> Asociación de documentos PDF a empresas
- <i class="fa fa-check"></i> Paginación en tabla de empresas
- <i class="fa fa-check"></i> Validación de datos

#### 4. **Gestión de Documentos PDF**
- <i class="fa fa-check"></i> Subida de archivos PDF
- <i class="fa fa-check"></i> Asociación a empresas/clientes
- <i class="fa fa-check"></i> Fechas de vencimiento
- <i class="fa fa-check"></i> Notificaciones de documentos por vencer
- <i class="fa fa-check"></i> Visualización y descarga
- <i class="fa fa-check"></i> Paginación en listado de PDFs
- <i class="fa fa-check"></i> Filtros por empresa y estado

#### 5. **Módulo de Auditoría (Solo Admin)**
- <i class="fa fa-check"></i> Registro de todas las acciones de usuarios
- <i class="fa fa-check"></i> Filtros avanzados:
  - Por usuario (dropdown con autocompletado)
  - Por acción (dropdown con autocompletado)
  - Por módulo (dropdown con autocompletado)
  - Por fecha
- <i class="fa fa-check"></i> Estadísticas en cards
- <i class="fa fa-check"></i> Paginación
- <i class="fa fa-check"></i> Registro de IP y User Agent
- <i class="fa fa-check"></i> Exclusivo para intranet (no registra acciones de extranet)

#### 6. **Sistema de Notificaciones**
- <i class="fa fa-check"></i> Notificaciones de PDFs próximos a vencer
- <i class="fa fa-check"></i> Contador en header
- <i class="fa fa-check"></i> Dropdown con lista de documentos
- <i class="fa fa-check"></i> Enlaces directos a documentos

#### 7. **Sistema de Modales**
- <i class="fa fa-check"></i> Modales de confirmación para eliminaciones
- <i class="fa fa-check"></i> Modales de éxito/error para operaciones
- <i class="fa fa-check"></i> Limpieza automática de URL para evitar reaparición
- <i class="fa fa-check"></i> Diseño consistente en todo el sistema

#### 8. **Extranet (Portal de Clientes)**
- <i class="fa fa-check"></i> Login por RUC y contraseña
- <i class="fa fa-check"></i> Visualización de documentos propios
- <i class="fa fa-check"></i> Descarga de PDFs
- <i class="fa fa-check"></i> Diseño minimalista y profesional
- <i class="fa fa-check"></i> Footer siempre visible
- <i class="fa fa-check"></i> Responsive design

---

## <i class="fa fa-building"></i> Arquitectura y Estructura

### Estructura del Proyecto

```
Nova-intranet/
├── intranet/                      # Sistema de Administración Interna
│   ├── app/
│   │   ├── controlador/           # Controladores MVC
│   │   │   ├── inicioCon.php      # Dashboard principal
│   │   │   ├── usuariosCon.php    # Gestión de usuarios
│   │   │   ├── clientesCon.php    # Gestión de empresas
│   │   │   ├── pdfCon.php         # Gestión de PDFs
│   │   │   ├── auditoriaCon.php   # Módulo de auditoría
│   │   │   ├── perfilCon.php      # Perfil de usuario
│   │   │   ├── loginCon.php       # Autenticación
│   │   │   └── logoutCon.php      # Cerrar sesión
│   │   ├── modelo/                # Modelos de datos
│   │   │   ├── usuariosModelo.php
│   │   │   ├── clientesModelo.php
│   │   │   ├── pdfModelo.php
│   │   │   ├── auditoriaModelo.php
│   │   │   └── dashboardModelo.php
│   │   ├── vista/                 # Vistas/Templates
│   │   │   ├── inicio.phtml       # Dashboard
│   │   │   ├── usuarios.phtml     # Lista de usuarios
│   │   │   ├── usuario-form.phtml  # Formulario usuario
│   │   │   ├── clientes.phtml     # Lista de empresas
│   │   │   ├── cliente-form.phtml  # Formulario empresa
│   │   │   ├── pdfs.phtml         # Lista de PDFs
│   │   │   ├── pdf-cliente.phtml  # PDFs por cliente
│   │   │   ├── pdf-vencer.phtml   # PDFs por vencer
│   │   │   ├── auditoria.phtml    # Auditoría
│   │   │   ├── perfil.phtml       # Perfil usuario
│   │   │   ├── login.phtml        # Login
│   │   │   └── _header.phtml      # Header compartido
│   │   └── helpers/                # Funciones auxiliares
│   │       └── permisosHelper.php # Sistema de permisos
│   ├── config/
│   │   ├── config.php             # Configuración general
│   │   └── sistema.php            # Clase de conexión BD
│   ├── include/
│   │   ├── css/
│   │   │   └── main.css           # Estilos principales
│   │   └── js/                    # Scripts JavaScript
│   ├── publico/                   # Archivos públicos (PDFs)
│   ├── index.php                  # Punto de entrada
│   └── .htaccess                  # URLs amigables
│
├── extranet/                      # Portal de Clientes
│   ├── app/
│   │   ├── controlador/
│   │   │   ├── loginCon.php       # Login cliente
│   │   │   ├── logoutCon.php      # Cerrar sesión
│   │   │   └── ordenesCon.php     # Documentos cliente
│   │   ├── modelo/
│   │   │   ├── loginModelo.php
│   │   │   └── ordenesModelo.php
│   │   └── vista/
│   │       ├── login.phtml         # Login cliente
│   │       └── ordenes.phtml       # Documentos cliente
│   ├── config/
│   │   ├── config.php
│   │   └── sistema.php
│   ├── include/
│   │   ├── css/
│   │   │   └── main.css
│   │   └── img/                   # Imágenes (logos, etc.)
│   ├── index.php
│   └── .htaccess
│
├── crear_db_automaticamente/      # Scripts de instalación
│   ├── install.php                # Instalador web
│   ├── install-cli.php            # Instalador CLI
│   └── README.md
│
├── tests/                         # Pruebas E2E con Playwright
│   ├── auth.spec.js
│   ├── navigation.spec.js
│   ├── admin-features.spec.js
│   ├── client-features.spec.js
│   └── README.md
│
├── README.md                      # Documentación principal
├── CHANGELOG.md                   # Historial de cambios
├── DOCUMENTACION_COMPLETA.md      # Este archivo
├── .gitignore                     # Archivos ignorados por Git
├── package.json                   # Dependencias Node.js
└── playwright.config.js           # Configuración Playwright
```

### Arquitectura MVC

El sistema sigue el patrón **Modelo-Vista-Controlador**:

- **Modelo**: Lógica de negocio y acceso a datos (`app/modelo/`)
- **Vista**: Presentación y templates HTML (`app/vista/`)
- **Controlador**: Manejo de peticiones HTTP (`app/controlador/`)

**Flujo de una petición:**
1. Usuario accede a una URL: `intranet/?pagina=usuarios`
2. `index.php` recibe la petición
3. `index.php` carga el controlador correspondiente: `usuariosCon.php`
4. El controlador carga el modelo: `usuariosModelo.php`
5. El modelo consulta la base de datos
6. El controlador carga la vista: `usuarios.phtml`
7. La vista renderiza los datos y muestra al usuario

---

## <i class="fa fa-box"></i> Módulos Implementados

### 1. Módulo de Usuarios

**Ubicación**: `intranet/app/controlador/usuariosCon.php`

**Funcionalidades**:
- Listar usuarios con paginación
- Crear nuevo usuario (con validación de campos)
- Editar usuario existente
- Eliminar usuario (con protección del admin)
- Activar/desactivar usuario
- Asignar rol y permisos
- Asignar área

**Campos del Usuario**:
- `usuario`: Nombre de usuario único
- `nombre`: Nombre completo
- `correo`: Email
- `rol`: admin, editor, visualizador
- `area`: Área de trabajo
- `activo`: Estado (1 = activo, 0 = inactivo)
- `password`: Contraseña (hash MD5)

**Permisos por Rol**:
- **Admin**: Acceso completo + módulo de auditoría
- **Editor**: Crear, editar, eliminar (excepto usuarios)
- **Visualizador**: Solo lectura

### 2. Módulo de Empresas/Clientes

**Ubicación**: `intranet/app/controlador/clientesCon.php`

**Funcionalidades**:
- Listar empresas con paginación
- Crear nueva empresa
- Editar empresa existente
- Eliminar empresa
- Ver PDFs asociados a una empresa

**Campos de la Empresa**:
- `id`: ID único
- `ruc`: RUC de la empresa
- `razon_social`: Nombre de la empresa
- `direccion`: Dirección
- `telefono`: Teléfono
- `correo`: Email
- `fecha_creacion`: Fecha de registro

### 3. Módulo de PDFs

**Ubicación**: `intranet/app/controlador/pdfCon.php`

**Funcionalidades**:
- Listar todos los PDFs con paginación
- Subir nuevo PDF
- Asociar PDF a empresa/cliente
- Establecer fecha de vencimiento
- Eliminar PDF
- Ver PDFs por cliente
- Ver PDFs próximos a vencer (con filtros)
- Descargar PDF

**Campos del PDF**:
- `id`: ID único
- `id_cliente`: ID de la empresa asociada
- `nombre_archivo`: Nombre del archivo
- `ruta`: Ruta del archivo en el servidor
- `fecha_subida`: Fecha de carga
- `fecha_vencimiento`: Fecha de vencimiento
- `descripcion`: Descripción opcional

### 4. Módulo de Auditoría

**Ubicación**: `intranet/app/controlador/auditoriaCon.php`

**Funcionalidades**:
- Registrar todas las acciones de usuarios (solo intranet)
- Filtrar por usuario, acción, módulo, fecha
- Ver estadísticas de acciones
- Paginación de registros
- Exportar datos (futuro)

**Acciones Registradas**:
- Crear, editar, eliminar (usuarios, empresas, PDFs)
- Login, logout
- Visualización de módulos

**Campos de Auditoría**:
- `id`: ID único
- `usuario`: Usuario que realizó la acción
- `accion`: Acción realizada (crear, editar, eliminar, etc.)
- `modulo`: Módulo afectado (usuarios, empresas, pdfs, etc.)
- `detalles`: Detalles adicionales (JSON)
- `ip`: Dirección IP
- `user_agent`: Navegador y SO
- `fecha`: Fecha y hora de la acción

**Acceso**: Solo usuarios con rol `admin`

### 5. Módulo de Dashboard

**Ubicación**: `intranet/app/controlador/inicioCon.php`

**Funcionalidades**:
- Mostrar estadísticas generales:
  - Total de usuarios
  - Total de empresas
  - Total de PDFs
  - PDFs próximos a vencer
- Accesos rápidos a módulos principales
- Notificaciones de documentos por vencer

### 6. Módulo de Perfil

**Ubicación**: `intranet/app/controlador/perfilCon.php`

**Funcionalidades**:
- Ver información del usuario logueado
- Editar perfil (nombre, correo, contraseña)
- Cambiar contraseña

### 7. Módulo Extranet (Clientes)

**Ubicación**: `extranet/app/controlador/ordenesCon.php`

**Funcionalidades**:
- Login por RUC y contraseña
- Ver documentos propios de la empresa
- Descargar documentos PDF
- Cerrar sesión

**Características de Diseño**:
- Sin header/navbar (diseño limpio)
- Título centrado en barra azul
- Tabla sin bordes visibles
- Footer siempre visible
- Slogan en rectángulo con bordes

---

## <i class="fa fa-users"></i> Sistema de Usuarios y Permisos

### Roles del Sistema

#### 1. **Admin**
- <i class="fa fa-check"></i> Acceso completo a todos los módulos
- <i class="fa fa-check"></i> Gestión de usuarios (crear, editar, eliminar, activar/desactivar)
- <i class="fa fa-check"></i> Gestión de empresas
- <i class="fa fa-check"></i> Gestión de PDFs
- <i class="fa fa-check"></i> Acceso al módulo de auditoría
- <i class="fa fa-check"></i> Ver estadísticas completas

#### 2. **Editor**
- <i class="fa fa-check"></i> Crear, editar, eliminar empresas
- <i class="fa fa-check"></i> Crear, editar, eliminar PDFs
- <i class="fa fa-check"></i> Ver usuarios (sin editar)
- <i class="fa fa-times"></i> No puede gestionar usuarios
- <i class="fa fa-times"></i> No tiene acceso a auditoría

#### 3. **Visualizador**
- <i class="fa fa-check"></i> Ver usuarios
- <i class="fa fa-check"></i> Ver empresas
- <i class="fa fa-check"></i> Ver PDFs
- <i class="fa fa-times"></i> No puede crear, editar o eliminar
- <i class="fa fa-times"></i> No tiene acceso a auditoría

### Sistema de Permisos

El sistema utiliza el helper `permisosHelper.php` que contiene la función `tienePermiso()`:

```php
function tienePermiso($usuario, $accion, $modulo) {
    // Lógica de verificación de permisos
    // Retorna true/false
}
```

**Uso en Controladores**:
```php
require_once __DIR__ . '/../helpers/permisosHelper.php';

if (!tienePermiso($_SESSION['usuario'], 'editar', 'usuarios')) {
    header('Location: ?pagina=inicio&error=sin_permisos');
    exit;
}
```

### Protección del Usuario Admin

El usuario `admin` está protegido contra:
- Eliminación
- Desactivación forzada (siempre activo)
- Modificación de rol (siempre admin)

---

## <i class="fa fa-database"></i> Base de Datos

### Estructura de Tablas

#### Tabla: `usuarios`
```sql
CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario VARCHAR(50) UNIQUE NOT NULL,
    nombre VARCHAR(100),
    correo VARCHAR(100),
    password VARCHAR(32) NOT NULL,  -- MD5 hash
    rol ENUM('admin', 'editor', 'visualizador') DEFAULT 'visualizador',
    area VARCHAR(100),
    activo TINYINT(1) DEFAULT 1,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### Tabla: `clientes`
```sql
CREATE TABLE clientes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    ruc VARCHAR(20) UNIQUE NOT NULL,
    razon_social VARCHAR(200) NOT NULL,
    direccion TEXT,
    telefono VARCHAR(20),
    correo VARCHAR(100),
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### Tabla: `pdf`
```sql
CREATE TABLE pdf (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_cliente INT NOT NULL,
    nombre_archivo VARCHAR(255) NOT NULL,
    ruta VARCHAR(500) NOT NULL,
    descripcion TEXT,
    fecha_subida TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_vencimiento DATE,
    FOREIGN KEY (id_cliente) REFERENCES clientes(id) ON DELETE CASCADE
);
```

#### Tabla: `auditoria`
```sql
CREATE TABLE auditoria (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario VARCHAR(50) NOT NULL,
    accion VARCHAR(50) NOT NULL,
    modulo VARCHAR(50) NOT NULL,
    detalles TEXT,
    ip VARCHAR(45),
    user_agent TEXT,
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_usuario (usuario),
    INDEX idx_fecha (fecha),
    INDEX idx_modulo (modulo)
);
```

### Scripts de Instalación

**Ubicación**: `crear_db_automaticamente/`

1. **install.php**: Instalador web
   - Acceso: `http://localhost/crear_db_automaticamente/install.php`
   - Crea base de datos y tablas
   - Inserta datos de prueba

2. **install-cli.php**: Instalador por línea de comandos
   ```bash
   php crear_db_automaticamente/install-cli.php
   ```

### Datos de Prueba

**Usuario Admin**:
- Usuario: `admin`
- Contraseña: `admin123`
- Rol: `admin`

**Cliente de Prueba**:
- RUC: `20123456789`
- Contraseña: `empresa123`

---

## <i class="fa fa-cog"></i> Instalación y Configuración

### Requisitos Previos

- **PHP**: 7.2 o superior
- **MySQL**: 5.5 o superior
- **Apache**: Con `mod_rewrite` habilitado
- **XAMPP/WAMP**: Para desarrollo local

### Pasos de Instalación

#### 1. Clonar el Repositorio

```bash
git clone https://github.com/Xangel0s/Nova-Intranet-extranet.git
cd Nova-Intranet-extranet
```

#### 2. Copiar a Directorio Web

Copiar el proyecto a `C:\xampp\htdocs\Nova-intranet` (o tu directorio web)

#### 3. Configurar Base de Datos

1. Asegurar que MySQL esté corriendo
2. Acceder a: `http://localhost/crear_db_automaticamente/install.php`
3. El script creará:
   - Base de datos `nova_intranet`
   - Todas las tablas necesarias
   - Datos de prueba

#### 4. Configurar Archivos de Configuración

**Intranet**: `intranet/config/config.php`
```php
define('HOST', 'localhost');
define('USER', 'root');
define('PASSWORD', '');
define('DB_NAME', 'nova_intranet');
define('ruta', 'http://'.$_SERVER["HTTP_HOST"].'/intranet/');
```

**Extranet**: `extranet/config/config.php`
```php
define('HOST', 'localhost');
define('USER', 'root');
define('PASSWORD', '');
define('DB_NAME', 'nova_intranet');
define('ruta', 'http://'.$_SERVER["HTTP_HOST"].'/extranet/');
```

#### 5. Verificar Permisos

- Asegurar permisos de escritura en `intranet/publico/` (para PDFs)
- Asegurar permisos de escritura en carpetas de sesiones PHP

#### 6. Habilitar mod_rewrite (Apache)

1. Abrir `httpd.conf` en XAMPP
2. Buscar `LoadModule rewrite_module`
3. Asegurar que NO esté comentado (sin `#`)
4. Reiniciar Apache

### URLs del Sistema

**Intranet**:
- Login: `http://localhost/intranet`
- Dashboard: `http://localhost/intranet/?pagina=inicio`
- Usuarios: `http://localhost/intranet/?pagina=usuarios`
- Empresas: `http://localhost/intranet/?pagina=clientes`
- PDFs: `http://localhost/intranet/?pagina=pdfs`
- Auditoría: `http://localhost/intranet/?pagina=auditoria`

**Extranet**:
- Login: `http://localhost/extranet`
- Documentos: `http://localhost/extranet/?pagina=ordenes`

---

## <i class="fa fa-palette"></i> Diseño y UI/UX

### Paleta de Colores Nova Solutions

- **Azul Principal**: `#1E3A8A`
- **Azul Claro**: `#3B82F6`
- **Verde Éxito**: `#10B981`
- **Rojo Error**: `#EF4444`
- **Gris Claro**: `#F3F4F6`
- **Gris Oscuro**: `#6B7280`

### Componentes de Diseño

#### 1. **Modales**
- Modales de confirmación (eliminación)
- Modales de éxito/error
- Animaciones suaves
- Limpieza automática de URL

#### 2. **Dropdowns Personalizados**
- Autocompletado en tiempo real
- Navegación con teclado
- Filtrado dinámico
- Diseño consistente

#### 3. **Cards de Estadísticas**
- Diseño compacto
- Iconos Font Awesome
- Colores según tipo de dato
- Responsive

#### 4. **Tablas**
- Paginación
- Filtros
- Ordenamiento (futuro)
- Diseño limpio sin bordes visibles (extranet)

#### 5. **Formularios**
- Validación en frontend y backend
- Mensajes de error claros
- Campos requeridos marcados
- Diseño responsive

### Responsive Design

- **Desktop**: Layout completo con sidebar
- **Tablet**: Sidebar colapsable
- **Mobile**: Hamburger menu, sidebar oculto

### Mejoras de UX Implementadas

1. **Modales en lugar de `confirm()`**: Mejor experiencia visual
2. **Limpieza de URL**: Los modales no reaparecen al recargar
3. **Filtros con autocompletado**: Búsqueda rápida y eficiente
4. **Notificaciones**: Contador y dropdown con lista
5. **Paginación**: Navegación fácil en listas largas
6. **Feedback visual**: Estados de carga, éxito, error

---

## <i class="fa fa-bug"></i> Errores Corregidos

### 1. Error de Sintaxis PHP
**Error**: `Parse error: syntax error, unexpected token "catch"`
**Ubicación**: `usuariosModelo.php`
**Solución**: Corregidos bloques `try-catch` anidados incorrectamente

### 2. Columna 'area' No Existente
**Error**: `Unknown column 'area' in 'field list'`
**Solución**: 
- Script para agregar columna si no existe
- Fallback en consultas SQL

### 3. Usuario Admin No Visible
**Error**: Admin no aparecía en tabla de usuarios
**Solución**: Eliminado filtro `WHERE rol != 'admin'` en consulta

### 4. Admin Mostrándose como Inactivo
**Error**: Admin aparecía como "INACTIVO"
**Solución**: 
- Lógica para forzar `activo = 1` en admin
- Script `activar_admin.php` para asegurar estado

### 5. Error de Permisos
**Error**: `Call to undefined function tienePermiso()`
**Ubicación**: `clientesCon.php`
**Solución**: Movido `require_once` de `permisosHelper.php` al inicio

### 6. Error JSON en Login Extranet
**Error**: `SyntaxError: Unexpected token '<'`
**Solución**: 
- Detección de peticiones AJAX
- Headers JSON correctos
- Header `X-Requested-With` en fetch

### 7. Usuarios No Aparecen en Dropdown de Auditoría
**Error**: Dropdown vacío o incompleto
**Solución**: 
- Consulta mejorada en `obtenerUsuariosUnicos()`
- Uso de `COALESCE` para manejar NULLs

### 8. Diseño Roto en Extranet con Errores
**Error**: Layout se rompía con mensajes de error
**Solución**: CSS robusto para mensajes de error

### 9. Filtros No Aplicaban Correctamente
**Error**: Filtros redirigían a inicio
**Solución**: 
- Corregido `action` de formularios
- Agregados inputs hidden para parámetros

### 10. Sidebar Marcaba Múltiples Items
**Error**: "PDFs" y "PDFs por Vencer" se marcaban juntos
**Solución**: Lógica mejorada en `_header.phtml`

---

## <i class="fa fa-lock"></i> Seguridad

### Medidas de Seguridad Implementadas

#### 1. **Autenticación**
- Contraseñas hasheadas (MD5)
- Sesiones PHP seguras
- Timeout de sesión
- Protección contra fuerza bruta (futuro)

#### 2. **Autorización**
- Sistema de roles y permisos
- Verificación en cada acción
- Protección de rutas sensibles

#### 3. **Validación de Datos**
- Validación en frontend (JavaScript)
- Validación en backend (PHP)
- Sanitización de inputs
- Prepared statements (SQL injection)

#### 4. **Protección de Archivos**
- `.htaccess` protege archivos sensibles
- PDFs en carpeta `publico/` con acceso controlado
- No exposición de rutas internas

#### 5. **Auditoría**
- Registro de todas las acciones
- IP y User Agent registrados
- Historial completo de cambios

### Recomendaciones para Producción

1. **Eliminar Scripts de Instalación**:
   ```bash
   rm -rf crear_db_automaticamente/
   ```

2. **Cambiar Credenciales**:
   - Cambiar contraseñas por defecto
   - Eliminar usuarios de prueba

3. **Configurar HTTPS**:
   - Certificado SSL
   - Redirección HTTP → HTTPS

4. **Ocultar Errores**:
   - `display_errors = Off` en `php.ini`
   - Usar logs para debugging

5. **Mejorar Seguridad de Contraseñas**:
   - Migrar de MD5 a `password_hash()` (bcrypt)
   - Implementar política de contraseñas fuertes

6. **Protección CSRF**:
   - Tokens CSRF en formularios
   - Verificación en controladores

7. **Rate Limiting**:
   - Límite de intentos de login
   - Protección contra DDoS

---

## <i class="fa fa-tools"></i> Desarrollo y Contribución

### Estructura MVC

Para agregar un nuevo módulo:

1. **Crear Controlador**: `app/controlador/nuevoModuloCon.php`
```php
<?php
require_once __DIR__ . '/../config/config.php';
require_once __DIR__ . '/../config/sistema.php';
require_once __DIR__ . '/../modelo/nuevoModuloModelo.php';

class NuevoModuloControlador {
    public function listar() {
        $modelo = new NuevoModuloModelo();
        $datos = $modelo->obtenerTodos();
        require_once __DIR__ . '/../vista/nuevoModulo.phtml';
    }
}
```

2. **Crear Modelo**: `app/modelo/nuevoModuloModelo.php`
```php
<?php
class NuevoModuloModelo {
    private $sistema;
    
    public function __construct() {
        $this->sistema = new Sistema();
    }
    
    public function obtenerTodos() {
        $sql = "SELECT * FROM nueva_tabla";
        return $this->sistema->consultar($sql);
    }
}
```

3. **Crear Vista**: `app/vista/nuevoModulo.phtml`
```php
<?php require_once __DIR__ . '/_header.phtml'; ?>
<!-- Contenido HTML -->
<?php require_once __DIR__ . '/_footer.phtml'; ?>
```

4. **Agregar Ruta en `index.php`**:
```php
case 'nuevoModulo':
    require_once __DIR__ . '/app/controlador/nuevoModuloCon.php';
    $controlador = new NuevoModuloControlador();
    $controlador->listar();
    break;
```

### Testing

**Playwright E2E Tests**:
```bash
# Instalar dependencias
npm install

# Ejecutar pruebas
npm test

# Modo UI interactivo
npm run test:ui
```

**Archivos de Prueba**:
- `tests/auth.spec.js`: Autenticación
- `tests/navigation.spec.js`: Navegación
- `tests/admin-features.spec.js`: Funcionalidades admin
- `tests/client-features.spec.js`: Funcionalidades cliente

### Convenciones de Código

- **Nombres de archivos**: camelCase (ej: `usuariosCon.php`)
- **Clases**: PascalCase (ej: `UsuariosControlador`)
- **Variables**: camelCase (ej: `$nombreUsuario`)
- **Constantes**: UPPER_SNAKE_CASE (ej: `DB_NAME`)
- **Indentación**: 4 espacios
- **Comentarios**: En español

### Git Workflow

1. Crear branch para nueva feature
2. Hacer commits descriptivos
3. Push a GitHub
4. Crear Pull Request
5. Code review
6. Merge a `main`

---

## <i class="fa fa-file-alt"></i> Changelog

Ver archivo `CHANGELOG.md` para historial completo de cambios.

### Versión 2.1.0 (Actual)
- Sistema de modales completo
- Rediseño de vista extranet
- Optimizaciones de diseño
- Correcciones de errores

### Versión 2.0.0
- Sistema de usuarios con roles
- Módulo de auditoría
- Notificaciones de PDFs por vencer
- Paginación en todos los módulos

### Versión 1.0.0
- Sistema básico funcional
- Login cliente/admin
- Gestión de órdenes y PDFs

---

## <i class="fa fa-phone"></i> Soporte y Contacto

- **Repositorio**: https://github.com/Xangel0s/Nova-Intranet-extranet
- **Issues**: Crear issue en GitHub para reportar problemas
- **Desarrollador Principal**: Xangel0s

---

## <i class="fa fa-file"></i> Licencia

Este proyecto es privado y de uso exclusivo de **Nova Solutions S.A.C.**

---

**Última actualización**: Diciembre 2024

**Versión del Documento**: 1.0

---

## <i class="fa fa-link"></i> Enlaces Útiles

- [README Principal](README.md)
- [Changelog](CHANGELOG.md)
- [Documentación de Pruebas](tests/README.md)
- [Script de Instalación](crear_db_automaticamente/README.md)

