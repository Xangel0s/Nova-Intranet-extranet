<?php
/**
 * Punto de entrada principal - Cliente (Intranet)
 * Nova Intranet
 */

require_once 'config/config.php';
require_once 'config/sistema.php';

// Obtener la página solicitada
$pagina = isset($_GET['pagina']) ? $_GET['pagina'] : 'login';

// Si no hay sesión y no está en login, redirigir a login
if (!isset($_SESSION['id_nova']) && $pagina != 'login') {
    header('Location: ' . ruta . '?pagina=login');
    exit;
}

// Si hay sesión y está en login, redirigir a órdenes
if (isset($_SESSION['id_nova']) && $pagina == 'login') {
    header('Location: ' . ruta . '?pagina=ordenes');
    exit;
}

// Ruta del controlador
$controlador = 'app/controlador/' . $pagina . 'Con.php';

// Verificar si existe el controlador
if (file_exists($controlador)) {
    require_once $controlador;
} else {
    // Si no existe, mostrar error 404 o redirigir a login
    if (isset($_SESSION['id_nova'])) {
        header('Location: ' . ruta . '?pagina=ordenes');
    } else {
        header('Location: ' . ruta . '?pagina=login');
    }
    exit;
}

