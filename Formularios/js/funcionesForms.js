// Función para mostrar los errores
export function mostrarError(idSpan, texto) {
    document.getElementById(idSpan).textContent = texto;
}

// Función para borrar los errores
export function limpiarErrores(idFormulario) {

    const eleFormulario = document.getElementById(idFormulario);
    let elementosError = Array.from(eleFormulario.getElementsByClassName('error'));

    elementosError.forEach(elemento => {
        elemento.textContent = "";
    });
}

export function enviado() {
    return true;
}

