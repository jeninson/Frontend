
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
    alert("*INFORMACION DEL USUARIO*\n\nCorreo: " + correo + "\nClave: " + clave +"\nClave (MD5): " + md5(clave));
    enviarPeticion({url: '../backend/login/index.php', metodo: "DELETE", parametros: {correo, clave: md5(clave)}});
}

async function enviarPeticion(info){
    try {

        let headers = {'Content-Type': 'application/json'};
        let {url, metodo, parametros} = info;
        alert("Enviando petición con método: " + metodo + "\nParámetros: " + JSON.stringify(parametros));
        if(metodo === "POST" || metodo === "PUT"){headers = {method: metodo, headers: {'Content-Type': 'application/json'}, body: JSON.stringify(parametros)}};
        if(metodo === "GET" || metodo === "DELETE"){url += "?" + new URLSearchParams(parametros).toString();};
        
        const response = await fetch(url, headers);

        if (!response.ok) {
            throw new Error('No se pudieron enviar los datos');
        }

        const resultado = await response.json();
        console.log('Respuesta del servidor:', resultado);
    } catch (error) {
        console.error('Error:', error);
    }
}