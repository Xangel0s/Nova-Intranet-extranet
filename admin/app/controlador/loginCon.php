<?php
/**
 * Controlador de Login - Admin
 */

require_once '../../config/config.php';
require_once '../../config/sistema.php';
require_once '../modelo/loginModelo.php';

// Si es una petición POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $usuario = isset($_POST['usuario']) ? trim($_POST['usuario']) : '';
    $clave = isset($_POST['clave']) ? trim($_POST['clave']) : '';
    
    // Validar campos
    if (empty($usuario) || empty($clave)) {
        $error = 'Por favor, complete todos los campos';
    } else {
        $loginModelo = new LoginModelo();
        $admin = $loginModelo->validarLogin($usuario, $clave);
        
        if ($admin) {
            // Iniciar sesión
            $_SESSION['id_nova'] = $admin['id'];
            $_SESSION['usuario'] = $admin['usuario'];
            $_SESSION['nombre'] = $admin['nombre'];
            $_SESSION['correo'] = $admin['correo'];
            $_SESSION['rol'] = $admin['rol'];
            
            header('Location: ' . ruta . '?pagina=inicio');
            exit;
        } else {
            $error = 'Usuario o contraseña incorrectos';
        }
    }
}

// Mostrar la vista
require_once '../vista/login.phtml';

