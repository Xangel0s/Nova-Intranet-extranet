<?php
/**
 * Script de Instalación - NovaIntranet
 * Este script crea automáticamente la base de datos y todas las tablas
 * 
 * ⚠️ IMPORTANTE: Este script debe ser eliminado después de la instalación
 */

// Protección básica: Solo permitir desde localhost
$allowed_ips = ['127.0.0.1', '::1', 'localhost'];
$client_ip = $_SERVER['REMOTE_ADDR'] ?? '';

if (!in_array($client_ip, $allowed_ips) && $_SERVER['HTTP_HOST'] !== 'localhost' && strpos($_SERVER['HTTP_HOST'], '127.0.0.1') === false) {
    die('Acceso denegado. Este script solo puede ejecutarse desde localhost.');
}

error_reporting(E_ALL);
ini_set('display_errors', 1);

// Configuración de base de datos
$host = 'localhost';
$user = 'root';
$password = '';
$dbname = 'nova_intranet';

echo "<!DOCTYPE html>
<html>
<head>
    <meta charset='UTF-8'>
    <title>Instalación NovaIntranet</title>
    <style>
        body { font-family: Arial, sans-serif; max-width: 800px; margin: 50px auto; padding: 20px; background: #f5f5f5; }
        .container { background: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        .success { color: #155724; padding: 12px; background: #d4edda; border: 1px solid #c3e6cb; margin: 10px 0; border-radius: 4px; }
        .error { color: #721c24; padding: 12px; background: #f8d7da; border: 1px solid #f5c6cb; margin: 10px 0; border-radius: 4px; }
        .info { color: #004085; padding: 12px; background: #d1ecf1; border: 1px solid #bee5eb; margin: 10px 0; border-radius: 4px; }
        .warning { color: #856404; padding: 12px; background: #fff3cd; border: 1px solid #ffeaa7; margin: 10px 0; border-radius: 4px; }
        h1 { color: #333; border-bottom: 3px solid #007bff; padding-bottom: 10px; }
        h2 { color: #555; margin-top: 20px; }
        h3 { color: #666; }
        code { background: #f4f4f4; padding: 2px 6px; border-radius: 3px; }
        a { color: #007bff; text-decoration: none; }
        a:hover { text-decoration: underline; }
    </style>
</head>
<body>
    <div class='container'>
        <h1>🔧 Instalación de NovaIntranet</h1>
        
        <div class='warning'>
            <strong>⚠️ ADVERTENCIA DE SEGURIDAD:</strong><br>
            Este script debe ser <strong>eliminado después de la instalación</strong>.<br>
            No dejar este archivo en servidores de producción.
        </div>";

try {
    // Conectar a MySQL (sin base de datos)
    $pdo = new PDO("mysql:host=$host", $user, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    echo "<div class='success'>✓ Conexión a MySQL exitosa</div>";
    
    // Crear base de datos si no existe
    $pdo->exec("CREATE DATABASE IF NOT EXISTS `$dbname` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci");
    echo "<div class='success'>✓ Base de datos '$dbname' creada o ya existe</div>";
    
    // Seleccionar base de datos
    $pdo->exec("USE `$dbname`");
    
    // ============================================
    // CREAR TABLA: clientes
    // ============================================
    $sql_clientes = "CREATE TABLE IF NOT EXISTS `clientes` (
      `id` int(11) NOT NULL AUTO_INCREMENT,
      `ruc` varchar(255) NOT NULL COMMENT 'RUC o identificador único del cliente (usado para login)',
      `razon_social` varchar(255) NOT NULL COMMENT 'Nombre o razón social de la empresa',
      `telefono` varchar(50) DEFAULT NULL COMMENT 'Teléfono de contacto',
      `direccion` text DEFAULT NULL COMMENT 'Dirección de la empresa',
      `representante` varchar(255) DEFAULT NULL COMMENT 'Nombre del representante legal',
      `clave` varchar(255) NOT NULL COMMENT 'Contraseña (texto plano o hash)',
      `correo` varchar(255) DEFAULT NULL COMMENT 'Email de contacto',
      `fecha_registro` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Fecha de registro',
      PRIMARY KEY (`id`),
      UNIQUE KEY `ruc` (`ruc`),
      KEY `idx_correo` (`correo`)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Tabla de clientes/empresas del sistema'";
    
    $pdo->exec($sql_clientes);
    echo "<div class='success'>✓ Tabla 'clientes' creada</div>";
    
    // ============================================
    // CREAR TABLA: pdf
    // ============================================
    $sql_pdf = "CREATE TABLE IF NOT EXISTS `pdf` (
      `id` int(11) NOT NULL AUTO_INCREMENT,
      `id_user` int(11) NOT NULL COMMENT 'ID del cliente propietario del PDF',
      `pdf` varchar(255) NOT NULL COMMENT 'Nombre del archivo PDF',
      `estado` tinyint(1) DEFAULT 0 COMMENT 'Estado: 0=Observado, 1=Aprobado',
      `vista` tinyint(1) DEFAULT 0 COMMENT 'Si fue visualizado: 0=No, 1=Sí',
      `fecha_eliminacion` date DEFAULT NULL COMMENT 'Fecha en que se eliminará automáticamente el PDF',
      `fecha_subida` datetime DEFAULT NULL COMMENT 'Fecha y hora en que se subió el PDF',
      `fecha_creacion` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Fecha de creación del registro',
      PRIMARY KEY (`id`),
      KEY `idx_id_user` (`id_user`),
      KEY `idx_estado` (`estado`),
      KEY `idx_fecha_eliminacion` (`fecha_eliminacion`),
      KEY `idx_fecha_subida` (`fecha_subida`),
      CONSTRAINT `fk_pdf_cliente` FOREIGN KEY (`id_user`) REFERENCES `clientes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Tabla de documentos PDF del sistema'";
    
    $pdo->exec($sql_pdf);
    echo "<div class='success'>✓ Tabla 'pdf' creada</div>";
    
    // ============================================
    // CREAR TABLA: usuarios (administradores)
    // ============================================
    $sql_usuarios = "CREATE TABLE IF NOT EXISTS `usuarios` (
      `id` int(11) NOT NULL AUTO_INCREMENT,
      `usuario` varchar(100) NOT NULL COMMENT 'Nombre de usuario',
      `clave` varchar(255) NOT NULL COMMENT 'Contraseña (hash recomendado)',
      `nombre` varchar(255) DEFAULT NULL COMMENT 'Nombre completo',
      `correo` varchar(255) DEFAULT NULL COMMENT 'Email',
      `rol` varchar(50) DEFAULT 'admin' COMMENT 'Rol del usuario',
      `activo` tinyint(1) DEFAULT 1 COMMENT 'Si el usuario está activo',
      `fecha_registro` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Fecha de registro',
      PRIMARY KEY (`id`),
      UNIQUE KEY `usuario` (`usuario`),
      KEY `idx_correo` (`correo`)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Tabla de usuarios administradores'";
    
    $pdo->exec($sql_usuarios);
    echo "<div class='success'>✓ Tabla 'usuarios' creada</div>";
    
    // ============================================
    // INSERTAR DATOS DE PRUEBA
    // ============================================
    
    // Verificar si ya existen datos
    $stmt = $pdo->query("SELECT COUNT(*) as total FROM clientes");
    $total_clientes = $stmt->fetch(PDO::FETCH_ASSOC)['total'];
    
    if ($total_clientes == 0) {
        // Insertar clientes de prueba
        $pdo->exec("INSERT INTO `clientes` (`ruc`, `razon_social`, `telefono`, `direccion`, `representante`, `clave`, `correo`) 
                    VALUES 
                    ('20123456789', 'Nova Solutions S.A.C.', '977777777', 'Av. Tecnología 123, San Isidro, Lima', 'Director General', 'empresa123', 'contacto@novasolutions.com'),
                    ('admin', 'Usuario Administrador', '999999999', 'Av. Tecnología 123, San Isidro, Lima', 'Admin', 'admin123', 'admin@novasolutions.com'),
                    ('user', 'Usuario Empleado', '988888888', 'Av. Tecnología 456, San Isidro, Lima', 'Usuario', 'user123', 'user@novasolutions.com')");
        echo "<div class='success'>✓ Datos de prueba de clientes insertados</div>";
    } else {
        echo "<div class='info'>ℹ️ Ya existen clientes en la base de datos</div>";
    }
    
    // Verificar usuarios admin
    $stmt = $pdo->query("SELECT COUNT(*) as total FROM usuarios");
    $total_usuarios = $stmt->fetch(PDO::FETCH_ASSOC)['total'];
    
    if ($total_usuarios == 0) {
        // Insertar usuario admin
        $pdo->exec("INSERT INTO `usuarios` (`usuario`, `clave`, `nombre`, `correo`, `rol`, `activo`) 
                    VALUES ('admin', 'admin123', 'Administrador del Sistema', 'admin@novasolutions.com', 'admin', 1)");
        echo "<div class='success'>✓ Usuario administrador creado</div>";
    } else {
        echo "<div class='info'>ℹ️ Ya existen usuarios administradores</div>";
    }
    
    // Verificar tablas creadas
    $stmt = $pdo->query("SHOW TABLES");
    $tables = $stmt->fetchAll(PDO::FETCH_COLUMN);
    
    echo "<div class='success'>✓ Tablas creadas (" . count($tables) . "): " . implode(', ', $tables) . "</div>";
    
    // Verificar usuarios de prueba
    $stmt = $pdo->query("SELECT ruc, razon_social FROM clientes LIMIT 5");
    $clientes = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    echo "<div class='info'><strong>👥 Usuarios de prueba creados:</strong><br>";
    foreach ($clientes as $cliente) {
        echo "- RUC: <strong>" . htmlspecialchars($cliente['ruc']) . "</strong> - " . htmlspecialchars($cliente['razon_social']) . "<br>";
    }
    echo "</div>";
    
    // Verificar usuarios admin
    $stmt = $pdo->query("SELECT usuario, nombre FROM usuarios LIMIT 5");
    $usuarios = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    if (!empty($usuarios)) {
        echo "<div class='info'><strong>👤 Usuarios administradores:</strong><br>";
        foreach ($usuarios as $usuario) {
            echo "- Usuario: <strong>" . htmlspecialchars($usuario['usuario']) . "</strong> - " . htmlspecialchars($usuario['nombre']) . "<br>";
        }
        echo "</div>";
    }
    
    echo "<div class='success'><h2>✅ Instalación completada exitosamente</h2></div>";
    
    echo "<div class='info'>
        <h3>🔑 Credenciales de acceso:</h3>
        <p><strong>Cliente (Intranet):</strong><br>
        🌐 <a href='../cliente' target='_blank'>Ir a Cliente</a><br>
        RUC: <code>20123456789</code><br>
        Contraseña: <code>empresa123</code></p>
        
        <p><strong>Admin (Extranet):</strong><br>
        🌐 <a href='../admin' target='_blank'>Ir a Admin</a><br>
        Usuario: <code>admin</code><br>
        Contraseña: <code>admin123</code></p>
    </div>";
    
    echo "<div class='warning'>
        <strong>⚠️ IMPORTANTE:</strong><br>
        1. Verifica que los archivos <code>config.php</code> estén configurados correctamente<br>
        2. <strong>ELIMINA este archivo (install.php) después de la instalación</strong><br>
        3. No subas este archivo a producción
    </div>";
    
} catch (PDOException $e) {
    echo "<div class='error'>✗ Error de base de datos: " . htmlspecialchars($e->getMessage()) . "</div>";
    echo "<div class='info'>Asegúrate de que MySQL esté ejecutándose y las credenciales sean correctas.</div>";
} catch (Exception $e) {
    echo "<div class='error'>✗ Error: " . htmlspecialchars($e->getMessage()) . "</div>";
}

echo "    </div>
</body>
</html>";
?>

