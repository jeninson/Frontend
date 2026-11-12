export function ir(url) {window.location.href = url;}

export async function enviarPeticion(info){
    let {url, metodo, parametros, fSuccess} = info, headers = {'Content-Type': 'application/json'};
    try {
        if(metodo === "POST" || metodo === "PUT" || metodo === "PATCH"){headers = {method: metodo, headers: {'Content-Type': 'application/json'}, body: JSON.stringify(parametros)}};
        if(metodo === "GET" || metodo === "DELETE"){
            if(parametros != null && parametros != undefined && Object.keys(parametros).length > 0)
            url += "?" + new URLSearchParams(parametros).toString();
        };
        const response = await fetch(url, headers);
        if (!response.ok) throw {status: response.status, msg: response.statusText};
        const resultado = await response.json();
        fSuccess(resultado);
    } catch (error) {
        fSuccess({code: error.status, msg: error.msg});
    }
}