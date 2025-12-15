<?php
/**
 * Modelo de PDFs - Admin
 */

require_once '../../config/config.php';
require_once '../../config/sistema.php';

class PdfModelo {
    private $sistema;
    
    public function __construct() {
        $this->sistema = new Sistema();
    }
    
    public function obtenerTodosPdfs() {
        $sql = "SELECT p.*, c.razon_social FROM pdf p 
                LEFT JOIN clientes c ON p.id_user = c.id 
                ORDER BY p.fecha_creacion DESC";
        
        try {
            $result = $this->sistema->consultar($sql);
            $pdfs = [];
            
            while ($row = $result->fetch_assoc()) {
                $pdfs[] = $row;
            }
            
            return $pdfs;
        } catch (Exception $e) {
            return [];
        }
    }
}

