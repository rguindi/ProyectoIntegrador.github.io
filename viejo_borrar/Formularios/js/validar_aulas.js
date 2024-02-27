const num_aula = document.getElementById('num_aula');
const descripcion = document.getElementById('descripcion');


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

    if (!num_aula.checkValidity()) {
        num_aula.focus();
        mostrarError('error_num_aula', num_aula.validationMessage);
        evento.preventDefault();
       return;
    }
    if (!descripcion.checkValidity()) {
        descripcion.focus();
        mostrarError('error_descripcion', descripcion.validationMessage);
        evento.preventDefault();
       return;
    }


});
