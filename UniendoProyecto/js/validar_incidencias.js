const id_equipo = document.getElementById('id_equipo');
const fecha_reporte = document.getElementById('fecha_reporte');
const descripcion = document.getElementById('descripcion');
const solucion = document.getElementById('solucion');
const estado = document.getElementById('estado');
const fecha_actualizacion = document.getElementById('fecha_actualizacion');
const equipo = document.getElementById('id_equipo');
console.log("funciona");

async function isAdmin() {
    try {
        const response = await fetch(`http://${dirIP_api}:${PUERTO_EXPRESS}/usuarios/user`, {
            credentials: 'include' // Incluye la cookie de sesión en la solicitud
        });
        if (!response.ok) {
            throw `Error ${response.status} de la BBDD: ${response.statusText}`;
        }
        const datos = await response.json();
        if (datos.usuario.rol === "administrador")
            return true;

        return false;
    } catch (error) {
        console.log("Fallo fetch");
        throw error;
    }
}

document.addEventListener("DOMContentLoaded", async () => {
    let esAdmin = await isAdmin();
    if (!esAdmin) {
        let nav = document.querySelector("nav");
        nav.parentElement.removeChild(nav)
    }

});


function mostrarError(idError, mensaje) {
    document.getElementById(idError).textContent = mensaje;
}

function limpiarErrores() {
    const elementosError = document.querySelectorAll('.error');
    elementosError.forEach(function(span) {
        span.textContent = '';
    });
}

document.getElementById('FormularioIncidencias').addEventListener("submit", function (evento) {
    limpiarErrores();

    // if (!id_equipo.checkValidity()) {
    //     id_equipo.focus();
    //     mostrarError('error_id_equipo', id_equipo.validationMessage);
    //    return;
    // }

    // if(!fecha_reporte.checkValidity()) {
    //     fecha_reporte.focus();
    //     mostrarError('error_fecha_reporte', fecha_reporte.validationMessage);
    //     return;
    // }

    // if(!descripcion.checkValidity()) {
    //     descripcion.focus();
    //     mostrarError('error_descripcion', descripcion.validationMessage);
    //     return;
    // }
    // if(!solucion.checkValidity()) {
    //     solucion.focus();
    //     mostrarError('error_solucion', solucion.validationMessage);
    //     return;
    // }

    // if (estado.value === "defecto") {
    //     estado.focus();
    //     mostrarError('error_estado', 'Por favor, seleccione un estado para la incidencia.');

    // }

    if (equipo.value === "defecto") {
        equipo.focus();
        mostrarError('error_equipo', 'Por favor, seleccione el equipo .');
    }

    // if(!fecha_actualizacion.checkValidity()) {
    //     fecha_actualizacion.focus();
    //     mostrarError('error_fecha_actualizacion', fecha_actualizacion.validationMessage);
    //     return;
    // }

    // Aquí puedes validar los otros campos del formulario de manera similar

    // Si todos los campos son válidos, puedes enviar el formulario
    // document.getElementById('FormularioIncidencias').submit();
});
