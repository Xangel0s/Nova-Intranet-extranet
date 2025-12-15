<?php
/**
 * Modelo de Dashboard - Admin
 */

require_once '../../config/config.php';
require_once '../../config/sistema.php';

class DashboardModelo {
    private $sistema;
    
    public function __construct() {
        $this->sistema = new Sistema();
    }
    
    public function obtenerEstadisticas() {
        try {
            $stats = [];
            
            // Total clientes
            $result = $this->sistema->consultar("SELECT COUNT(*) as total FROM clientes");
            $stats['total_clientes'] = $result->fetch_assoc()['total'];
            
            // Total PDFs
            $result = $this->sistema->consultar("SELECT COUNT(*) as total FROM pdf");
            $stats['total_pdfs'] = $result->fetch_assoc()['total'];
            
            // PDFs aprobados
            $result = $this->sistema->consultar("SELECT COUNT(*) as total FROM pdf WHERE estado = 1");
            $stats['pdfs_aprobados'] = $result->fetch_assoc()['total'];
            
            return $stats;
        } catch (Exception $e) {
            return [
                'total_clientes' => 0,
                'total_pdfs' => 0,
                'pdfs_aprobados' => 0
            ];
        }
    }
}

