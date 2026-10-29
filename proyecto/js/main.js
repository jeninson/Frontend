import { iniciarSesion } from "./login.js";

document.addEventListener("DOMContentLoaded", (e) => {
    //console.log("Iniciando el script sin caché");
});

document.addEventListener("submit", (e) => {
    e.preventDefault();
    if(e.target.id === "form-login") iniciarSesion();
})
