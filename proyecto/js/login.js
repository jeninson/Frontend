
export function iniciarSesion() {
    //alert("Estamos en la función iniciar sesión");
    const EmailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    const ClaveRegex = /^[0-9]{1,10}$/ // /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/; // Al menos 8 caracteres, al menos una letra y un número
    let correo = document.getElementById("correo").value.trim();
    let clave = document.querySelector("#clave").value.trim();
    //const clave2 = clave.value.trim();
    

    // Validar correo electrónico
    if (!EmailRegex.test(correo)) {
        alert("Por favor, ingresa un correo electrónico válido.");
        return;
    }

    if (!ClaveRegex.test(clave)) {
        alert("Por favor, ingresa una contraseña válida.");
        return;
    }

    alert("Correo: " + correo + "\nClave: " + clave);
}