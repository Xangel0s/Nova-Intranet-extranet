<?php
/**
 * Sistema de Conexión a Base de Datos
 * Nova Intranet - Admin
 */

session_start();

class Sistema {
    private $host;
    private $user;
    private $password;
    private $dbname;
    private $conn;
    
    public function __construct() {
        $this->host = HOST;
        $this->user = USER;
        $this->password = PASSWORD;
        $this->dbname = DB_NAME;
    }
    
    public function conectar() {
        try {
            $this->conn = new mysqli($this->host, $this->user, $this->password, $this->dbname);
            
            if ($this->conn->connect_error) {
                throw new Exception("Error de conexión: " . $this->conn->connect_error);
            }
            
            $this->conn->set_charset("utf8mb4");
            return $this->conn;
        } catch (Exception $e) {
            die("Error de conexión a la base de datos: " . $e->getMessage());
        }
    }
    
    public function desconectar() {
        if ($this->conn) {
            $this->conn->close();
        }
    }
    
    public function getConexion() {
        if (!$this->conn) {
            $this->conectar();
        }
        return $this->conn;
    }
    
    public function consultar($sql) {
        $conn = $this->getConexion();
        $result = $conn->query($sql);
        
        if (!$result) {
            throw new Exception("Error en consulta: " . $conn->error);
        }
        
        return $result;
    }
    
    public function ejecutar($sql) {
        $conn = $this->getConexion();
        $result = $conn->query($sql);
        
        if (!$result) {
            throw new Exception("Error en ejecución: " . $conn->error);
        }
        
        return $result;
    }
    
    public function escapar($string) {
        $conn = $this->getConexion();
        return $conn->real_escape_string($string);
    }
    
    public function obtenerUltimoId() {
        return $this->conn->insert_id;
    }
}

