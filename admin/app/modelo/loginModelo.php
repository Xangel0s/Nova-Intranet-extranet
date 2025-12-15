<?php
/**
 * Modelo de Login - Admin
 */

require_once '../../config/config.php';
require_once '../../config/sistema.php';

class LoginModelo {
    private $sistema;
    
    public function __construct() {
        $this->sistema = new Sistema();
    }
    
    public function validarLogin($usuario, $clave) {
        $usuario = $this->sistema->escapar($usuario);
        $clave = $this->sistema->escapar($clave);
        
        $sql = "SELECT id, usuario, nombre, correo, rol FROM usuarios WHERE usuario = '$usuario' AND clave = '$clave' AND activo = 1 LIMIT 1";
        
        try {
            $result = $this->sistema->consultar($sql);
            
            if ($result->num_rows > 0) {
                return $result->fetch_assoc();
            }
            
            return false;
        } catch (Exception $e) {
            return false;
        }
    }
}

