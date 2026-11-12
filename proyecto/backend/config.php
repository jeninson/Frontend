<?php
    class Conexion {
        private static $conexion = null;

        private function __construct() {}

        public static function obtenerConexion() {
            if (self::$conexion === null) {
                $servidor = "localhost";
                $usuario = "root";
                $clave = "";
                $baseDatos = "db_pablo";

                self::$conexion = new PDO(
                    "mysql:host=$servidor;dbname=$baseDatos",
                    $usuario,
                    $clave
                );
                self::$conexion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            }

            return self::$conexion;
        }

        public static function cerrarConexion() {
            if (self::$conexion !== null) {
                self::$conexion = null;
            }
        }

        // Método para preparar una consulta SQL
        public static function prepare($sql) {
            return self::obtenerConexion()->prepare($sql);
        }

        // Método para ejecutar una consulta SQL con parámetros
        public static function execute($sql, $params = []) {
            $stmt = self::prepare($sql);
            $stmt->execute($params);
            return $stmt;
        }
    }
?>