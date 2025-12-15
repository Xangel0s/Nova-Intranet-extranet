<?php
/**
 * Controlador de Inicio - Admin
 */

require_once '../../config/config.php';
require_once '../../config/sistema.php';
require_once '../modelo/dashboardModelo.php';

// Verificar sesión
if (!isset($_SESSION['id_nova'])) {
    header('Location: ' . ruta . '?pagina=login');
    exit;
}

$dashboardModelo = new DashboardModelo();
$stats = $dashboardModelo->obtenerEstadisticas();

require_once '../vista/inicio.phtml';

