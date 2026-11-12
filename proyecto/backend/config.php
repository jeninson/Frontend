<?php
    $servidor = "localhost"; //127.0.0.1
    $usuario = "root"; //userdb
    $clave = ""; //"root@3306"
    $baseDatos = "db_pablo"; //nombre de la base de datos

    try {
        $conexion = new PDO("mysql:host=$servidor;dbname=$baseDatos", $usuario, $clave);
        $conexion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        echo "¡Conexión exitosa con PDO!";
    } catch (PDOException $e) {
        http_response_code(504);
        echo json_encode(array("code" => 504, "msg" => "Error de conexión a la base de datos: " . $e->getMessage()));
        exit();
    }
?>