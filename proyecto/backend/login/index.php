<?php
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json; charset=utf-8');
    include_once('../config.php');
    try{
        if($_SERVER['REQUEST_METHOD'] === 'POST'){
            //$_POST = json_decode(file_get_contents('php://input'), true);
            if(!empty($_POST['correo']) && !empty($_POST['clave'])){
                $correo = htmlspecialchars(trim($_POST['correo']));
                $clave = htmlspecialchars(trim($_POST['clave']));
                $EmailRegex = '/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/';
                $ClaveRegex = '/^[a-zA-Z0-9]+$/';

                if(!preg_match($EmailRegex, $correo) || !preg_match($ClaveRegex, $clave)){
                    http_response_code(400);
                    echo json_encode(['code' => 400, 'msg' => 'Las credenciales no tienen un formato válido']);
                    exit;
                }
                //var_dump($correo, $clave);
                $conexion = Conexion::obtenerConexion();
                $sql = "SELECT ID, NOMBRES, APELLIDOS, USER, EMAIL FROM `usuarios` WHERE EMAIL=:correo AND PASSWORD=:clave";
                $stmt = $conexion->prepare($sql);
                $stmt->bindParam(':correo', $correo);
                $stmt->bindParam(':clave', $clave);
                $stmt->execute();
                $resultado = $stmt->fetchAll(PDO::FETCH_ASSOC);
                if(count($resultado) > 0){
                    http_response_code(200);
                    echo json_encode(['code' => 200, 'msg' => 'Inicio de sesión exitoso', 'data' => $resultado]);
                }else{
                    http_response_code(401);
                    echo json_encode(['code' => 401, 'msg' => 'Las credenciales son inválidas']);
                }
            }else{
                http_response_code(400);
                echo json_encode(['code' => 400, 'msg' => 'Faltan parámetros requeridos']);
                exit;
            }
        } else {
            http_response_code(405);
            echo json_encode(['code' => 405, 'msg' => 'Método no permitido']);

        }
    }catch(Exception $e){
        http_response_code(500);
        echo json_encode(['code' => 500, 'msg' => $e->getMessage()]);
    }
?>