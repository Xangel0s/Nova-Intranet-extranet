<?php
/**
 * Controlador de PDFs - Admin
 */

require_once '../../config/config.php';
require_once '../../config/sistema.php';
require_once '../modelo/pdfModelo.php';

// Verificar sesión
if (!isset($_SESSION['id_nova'])) {
    header('Location: ' . ruta . '?pagina=login');
    exit;
}

$pdfModelo = new PdfModelo();
$pdfs = $pdfModelo->obtenerTodosPdfs();

require_once '../vista/pdf.phtml';

