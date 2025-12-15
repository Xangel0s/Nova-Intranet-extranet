<?php
/**
 * Modelo de Clientes - Admin
 */

require_once '../../config/config.php';
require_once '../../config/sistema.php';

class ClientesModelo {
    private $sistema;
    
    public function __construct() {
        $this->sistema = new Sistema();
    }
    
    public function obtenerClientes() {
        $sql = "SELECT id, ruc, razon_social, correo, telefono, fecha_registro FROM clientes ORDER BY fecha_registro DESC";
        
        try {
            $result = $this->sistema->consultar($sql);
            $clientes = [];
            
            while ($row = $result->fetch_assoc()) {
                $clientes[] = $row;
            }
            
            return $clientes;
        } catch (Exception $e) {
            return [];
        }
    }
}

