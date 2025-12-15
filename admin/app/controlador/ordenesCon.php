<?php
/**
 * Controlador de Órdenes - Admin
 */

require_once '../../config/config.php';
require_once '../../config/sistema.php';
require_once '../modelo/ordenesModelo.php';

// Verificar sesión
if (!isset($_SESSION['id_nova'])) {
    header('Location: ' . ruta . '?pagina=login');
    exit;
}

$ordenesModelo = new OrdenesModelo();
$ordenes = $ordenesModelo->obtenerTodasOrdenes();

require_once '../vista/ordenes.phtml';

