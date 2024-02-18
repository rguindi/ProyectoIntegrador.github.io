const id_equipo = document.getElementById('id_equipo');
const fecha_reporte = document.getElementById('fecha_reporte');
const descripcion = document.getElementById('descripcion');
const estado = document.getElementById('estado');
const fecha_actualizacion = document.getElementById('fecha_actualizacion');
console.log("funciona");
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

    if (!id_equipo.checkValidity()) {
        id_equipo.focus();
        mostrarError('error_id_equipo', id_equipo.validationMessage);
       return;
    }

    if(!fecha_reporte.checkValidity()) {
        fecha_reporte.focus();
        mostrarError('error_fecha_reporte', fecha_reporte.validationMessage);
        return;
    }

    if(!descripcion.checkValidity()) {
        descripcion.focus();
        mostrarError('error_descripcion', descripcion.validationMessage);
        return;
    }

    if (estado.value === "defecto") {
        estado.focus();
        mostrarError('error_estado', 'Por favor, seleccione un estado para la incidencia.');
      return;
    }

    if(!fecha_actualizacion.checkValidity()) {
        fecha_actualizacion.focus();
        mostrarError('error_fecha_actualizacion', fecha_actualizacion.validationMessage);
        return;
    }

    // Aquí puedes validar los otros campos del formulario de manera similar

    // Si todos los campos son válidos, puedes enviar el formulario
    // document.getElementById('FormularioIncidencias').submit();
});
