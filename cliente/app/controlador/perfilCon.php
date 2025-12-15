<?php
/**
 * Controlador de Perfil - Cliente
 */

require_once '../../config/config.php';
require_once '../../config/sistema.php';
require_once '../modelo/perfilModelo.php';

// Verificar sesión
if (!isset($_SESSION['id_nova'])) {
    header('Location: ' . ruta . '?pagina=login');
    exit;
}

$perfilModelo = new PerfilModelo();
$perfil = $perfilModelo->obtenerPerfil($_SESSION['id_nova']);

require_once '../vista/perfil.phtml';

