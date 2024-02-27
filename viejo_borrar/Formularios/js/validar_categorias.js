const nombre = document.getElementById('nombre');


function mostrarError(idError, mensaje) {
    document.getElementById(idError).textContent = mensaje;
}

function limpiarErrores() {
    const elementosError = document.querySelectorAll('.error');
    elementosError.forEach(function(span) {
        span.textContent = '';
    });
}

document.getElementById('submitBtn').addEventListener("click", function (evento) {
  
    limpiarErrores();

    if (!nombre.checkValidity()) {
        nombre.focus();
        mostrarError('error_nombre', nombre.validationMessage);
        evento.preventDefault();
       return;

    }


});
