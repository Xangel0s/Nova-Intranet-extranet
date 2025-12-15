-- ============================================
-- Script SQL Unificado - NovaIntranet
-- Base de Datos y Datos de Prueba
-- ============================================

-- Crear base de datos
CREATE DATABASE IF NOT EXISTS `nova_intranet` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Usar la base de datos
USE `nova_intranet`;

-- ============================================
-- TABLA: clientes
-- ============================================
CREATE TABLE IF NOT EXISTS `clientes` (
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Tabla de clientes/empresas del sistema';

-- ============================================
-- TABLA: pdf
-- ============================================
CREATE TABLE IF NOT EXISTS `pdf` (
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Tabla de documentos PDF del sistema';

-- ============================================
-- TABLA: usuarios (administradores)
-- ============================================
CREATE TABLE IF NOT EXISTS `usuarios` (
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Tabla de usuarios administradores';

-- ============================================
-- DATOS DE PRUEBA: clientes
-- ============================================
INSERT IGNORE INTO `clientes` (`ruc`, `razon_social`, `telefono`, `direccion`, `representante`, `clave`, `correo`) VALUES
('20123456789', 'Nova Solutions S.A.C.', '977777777', 'Av. Tecnología 123, San Isidro, Lima', 'Director General', 'empresa123', 'contacto@novasolutions.com'),
('20134567890', 'TechCorp Perú S.A.C.', '988888888', 'Av. Principal 456, Miraflores, Lima', 'Gerente General', 'techcorp123', 'info@techcorp.pe'),
('20145678901', 'Digital Services E.I.R.L.', '999999999', 'Jr. Comercio 789, Surco, Lima', 'Administrador', 'digital123', 'contacto@digitalservices.pe');

-- ============================================
-- DATOS DE PRUEBA: usuarios (administradores)
-- ============================================
INSERT IGNORE INTO `usuarios` (`usuario`, `clave`, `nombre`, `correo`, `rol`, `activo`) VALUES
('admin', 'admin123', 'Administrador del Sistema', 'admin@novasolutions.com', 'admin', 1),
('supervisor', 'supervisor123', 'Supervisor General', 'supervisor@novasolutions.com', 'supervisor', 1),
('operador', 'operador123', 'Operador del Sistema', 'operador@novasolutions.com', 'operador', 1);

-- ============================================
-- DATOS DE PRUEBA: pdf (documentos de ejemplo)
-- ============================================
-- Nota: Estos inserts requieren que existan clientes con id 1, 2, 3
INSERT IGNORE INTO `pdf` (`id_user`, `pdf`, `estado`, `vista`, `fecha_subida`) VALUES
(1, 'factura_001_2024.pdf', 1, 0, NOW()),
(1, 'orden_compra_002_2024.pdf', 1, 1, DATE_SUB(NOW(), INTERVAL 5 DAY)),
(2, 'cotizacion_003_2024.pdf', 0, 0, DATE_SUB(NOW(), INTERVAL 3 DAY)),
(2, 'guia_remision_004_2024.pdf', 1, 0, DATE_SUB(NOW(), INTERVAL 2 DAY)),
(3, 'nota_credito_005_2024.pdf', 1, 1, DATE_SUB(NOW(), INTERVAL 1 DAY));

-- ============================================
-- Verificación de tablas creadas
-- ============================================
SHOW TABLES;

-- ============================================
-- Verificación de datos insertados
-- ============================================
SELECT 'Clientes creados:' AS info, COUNT(*) AS total FROM clientes;
SELECT 'Usuarios creados:' AS info, COUNT(*) AS total FROM usuarios;
SELECT 'PDFs creados:' AS info, COUNT(*) AS total FROM pdf;

