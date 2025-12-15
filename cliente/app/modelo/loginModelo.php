<?php
/**
 * Modelo de Login - Cliente
 */

require_once '../../config/config.php';
require_once '../../config/sistema.php';

class LoginModelo {
    private $sistema;
    
    public function __construct() {
        $this->sistema = new Sistema();
    }
    
    public function validarLogin($ruc, $clave) {
        $ruc = $this->sistema->escapar($ruc);
        $clave = $this->sistema->escapar($clave);
        
        $sql = "SELECT id, ruc, razon_social, correo FROM clientes WHERE ruc = '$ruc' AND clave = '$clave' LIMIT 1";
        
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

