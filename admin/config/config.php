<?php


// Detectar automáticamente el protocolo (HTTP o HTTPS)
$protocol = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') || $_SERVER['SERVER_PORT'] == 443 ? 'https' : 'http';

define('ruta', $protocol . '://' . $_SERVER["HTTP_HOST"] . '/admin/');
define('ruta0', $protocol . '://' . $_SERVER["HTTP_HOST"] . '/');

define('HOST', 'localhost');


define('USER', 'root');

define('PASSWORD', '');

define('DB_NAME', 'nova_intranet');




