<?php
/**
 * Script de Instalación CLI - NovaIntranet
 * Este script crea automáticamente la base de datos y todas las tablas
 * Para ejecutar desde línea de comandos: php install-cli.php
 */

error_reporting(E_ALL);
ini_set('display_errors', 1);

// Configuración de base de datos
$host = 'localhost';
$user = 'root';
$password = '';
$dbname = 'nova_intranet';

echo "🔧 Instalación de NovaIntranet (CLI)\n";
echo "=====================================\n\n";

try {
    // Conectar a MySQL (sin base de datos)
    $pdo = new PDO("mysql:host=$host", $user, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    echo "✓ Conexión a MySQL exitosa\n";
    
    // Crear base de datos si no existe
    $pdo->exec("CREATE DATABASE IF NOT EXISTS `$dbname` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci");
    echo "✓ Base de datos '$dbname' creada o ya existe\n";
    
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
    echo "✓ Tabla 'clientes' creada\n";
    
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
    echo "✓ Tabla 'pdf' creada\n";
    
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
    echo "✓ Tabla 'usuarios' creada\n";
    
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
        echo "✓ Datos de prueba de clientes insertados\n";
    } else {
        echo "ℹ️ Ya existen clientes en la base de datos\n";
    }
    
    // Verificar usuarios admin
    $stmt = $pdo->query("SELECT COUNT(*) as total FROM usuarios");
    $total_usuarios = $stmt->fetch(PDO::FETCH_ASSOC)['total'];
    
    if ($total_usuarios == 0) {
        // Insertar usuario admin
        $pdo->exec("INSERT INTO `usuarios` (`usuario`, `clave`, `nombre`, `correo`, `rol`, `activo`) 
                    VALUES ('admin', 'admin123', 'Administrador del Sistema', 'admin@novasolutions.com', 'admin', 1)");
        echo "✓ Usuario administrador creado\n";
    } else {
        echo "ℹ️ Ya existen usuarios administradores\n";
    }
    
    // Verificar tablas creadas
    $stmt = $pdo->query("SHOW TABLES");
    $tables = $stmt->fetchAll(PDO::FETCH_COLUMN);
    
    echo "✓ Tablas creadas (" . count($tables) . "): " . implode(', ', $tables) . "\n";
    
    echo "\n✅ Instalación completada exitosamente\n\n";
    
    echo "🔑 Credenciales de acceso:\n";
    echo "Cliente (Intranet):\n";
    echo "  RUC: 20123456789\n";
    echo "  Contraseña: empresa123\n\n";
    echo "Admin (Extranet):\n";
    echo "  Usuario: admin\n";
    echo "  Contraseña: admin123\n\n";
    
} catch (PDOException $e) {
    echo "✗ Error de base de datos: " . $e->getMessage() . "\n";
    echo "Asegúrate de que MySQL esté ejecutándose y las credenciales sean correctas.\n";
    exit(1);
} catch (Exception $e) {
    echo "✗ Error: " . $e->getMessage() . "\n";
    exit(1);
}

