<?php
/**
 * Modelo de Órdenes - Cliente
 */

require_once '../../config/config.php';
require_once '../../config/sistema.php';

class OrdenesModelo {
    private $sistema;
    
    public function __construct() {
        $this->sistema = new Sistema();
    }
    
    public function obtenerOrdenes($idCliente) {
        $idCliente = (int)$idCliente;
        $sql = "SELECT * FROM pdf WHERE id_user = $idCliente ORDER BY fecha_creacion DESC";
        
        try {
            $result = $this->sistema->consultar($sql);
            $ordenes = [];
            
            while ($row = $result->fetch_assoc()) {
                $ordenes[] = $row;
            }
            
            return $ordenes;
        } catch (Exception $e) {
            return [];
        }
    }
}

