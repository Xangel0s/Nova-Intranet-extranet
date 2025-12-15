<?php
/**
 * Controlador de Login - Cliente
 */

require_once '../../config/config.php';
require_once '../../config/sistema.php';
require_once '../modelo/loginModelo.php';

// Si es una petición AJAX
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['action']) && $_POST['action'] === 'login') {
    header('Content-Type: application/json');
    
    $ruc = isset($_POST['ruc']) ? trim($_POST['ruc']) : '';
    $clave = isset($_POST['clave']) ? trim($_POST['clave']) : '';
    
    // Validar campos
    if (empty($ruc) || empty($clave)) {
        echo json_encode([
            'success' => false,
            'message' => 'Por favor, complete todos los campos'
        ]);
        exit;
    }
    
    $loginModelo = new LoginModelo();
    $usuario = $loginModelo->validarLogin($ruc, $clave);
    
    if ($usuario) {
        // Iniciar sesión
        $_SESSION['id_nova'] = $usuario['id'];
        $_SESSION['ruc'] = $usuario['ruc'];
        $_SESSION['razon_social'] = $usuario['razon_social'];
        $_SESSION['correo'] = $usuario['correo'];
        
        echo json_encode([
            'success' => true,
            'message' => 'Login exitoso',
            'redirect' => ruta . '?pagina=ordenes'
        ]);
    } else {
        echo json_encode([
            'success' => false,
            'message' => 'RUC o contraseña incorrectos'
        ]);
    }
    exit;
}

// Si no es AJAX, mostrar la vista
require_once '../vista/login.phtml';

