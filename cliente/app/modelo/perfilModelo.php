<?php
/**
 * Modelo de Perfil - Cliente
 */

require_once '../../config/config.php';
require_once '../../config/sistema.php';

class PerfilModelo {
    private $sistema;
    
    public function __construct() {
        $this->sistema = new Sistema();
    }
    
    public function obtenerPerfil($idCliente) {
        $idCliente = (int)$idCliente;
        $sql = "SELECT * FROM clientes WHERE id = $idCliente LIMIT 1";
        
        try {
            $result = $this->sistema->consultar($sql);
            if ($result->num_rows > 0) {
                return $result->fetch_assoc();
            }
            return null;
        } catch (Exception $e) {
            return null;
        }
    }
}

