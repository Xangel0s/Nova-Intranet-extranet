<?php
/**
 * Modelo de Órdenes - Admin
 */

require_once '../../config/config.php';
require_once '../../config/sistema.php';

class OrdenesModelo {
    private $sistema;
    
    public function __construct() {
        $this->sistema = new Sistema();
    }
    
    public function obtenerTodasOrdenes() {
        $sql = "SELECT p.*, c.razon_social FROM pdf p 
                LEFT JOIN clientes c ON p.id_user = c.id 
                ORDER BY p.fecha_creacion DESC";
        
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

