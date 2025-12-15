<?php
/**
 * Controlador de Logout - Cliente
 */

require_once '../../config/config.php';
require_once '../../config/sistema.php';

// Destruir sesión
session_destroy();

// Redirigir a login
header('Location: ' . ruta . '?pagina=login');
exit;

