import { enviarPeticion, ir } from "./herramientas.js";

export function iniciarSesion() {
    //alert("Estamos en la función iniciar sesión");
    const EmailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    const ClaveRegex = /^[0-9]{1,10}$/ // /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/; // Al menos 8 caracteres, al menos una letra y un número
    let correo = document.getElementById("correo").value.trim();
    let clave = document.querySelector("#clave").value.trim();    

    // Validar correo electrónico
    if (!EmailRegex.test(correo)) {
        alert("Por favor, ingresa un correo electrónico válido.");
        return;
    }

    if (!ClaveRegex.test(clave)) {
        alert("Por favor, ingresa una contraseña válida.");
        return;
    }

    //alert("*INFORMACION DEL USUARIO*\n\nCorreo: " + correo + "\nClave: " + clave +"\nClave (MD5): " + md5(clave));
    enviarPeticion({
        url: '../backend/login/index.php', 
        metodo: "POST", 
        parametros: {correo, clave: md5(clave)},
        fSuccess: (resp) => {
            if(resp.code === 200){
                alert("Bienvenido " + resp.data[0].NOMBRES + " " + resp.data[0].APELLIDOS);
            }else{
                alert("Error: " + resp.msg);
            }
            console.log('Respuesta del servidor:', resp);
            //ir("gestionprincipal.html");
        }
    });
}
