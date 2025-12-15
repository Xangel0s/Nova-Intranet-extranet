<?php
/**
 * Controlador de Órdenes - Cliente
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
$ordenes = $ordenesModelo->obtenerOrdenes($_SESSION['id_nova']);

require_once '../vista/ordenes.phtml';

