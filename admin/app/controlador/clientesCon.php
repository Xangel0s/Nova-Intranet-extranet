<?php
/**
 * Controlador de Clientes - Admin
 */

require_once '../../config/config.php';
require_once '../../config/sistema.php';
require_once '../modelo/clientesModelo.php';

// Verificar sesión
if (!isset($_SESSION['id_nova'])) {
    header('Location: ' . ruta . '?pagina=login');
    exit;
}

$clientesModelo = new ClientesModelo();
$clientes = $clientesModelo->obtenerClientes();

require_once '../vista/clientes.phtml';

