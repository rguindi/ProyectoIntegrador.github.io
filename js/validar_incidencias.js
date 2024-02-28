const id_equipo = document.getElementById('id_equipo');
const descripcion = document.getElementById('descripcion');
const solucion = document.getElementById('solucion');

const dirIP_api = '127.0.0.1'; // O asignar el valor que necesitas
const PUERTO_EXPRESS = 3000; // O asignar el valor que necesitas
const url=`http://${dirIP_api}:${PUERTO_EXPRESS}`;

console.log("funciona");

async function isAdmin() {
    try {
        const response = await fetch(`http://${dirIP_api}:${PUERTO_EXPRESS}/usuarios/user`, {
            credentials: 'include'
        });
        if (!response.ok) {
            window.location = "../index.html";
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

export function validaIncidencia() {
    
    limpiarErrores();

    let error = false;
    let primerError = null;

    if (id_equipo.value === "defecto") {
        id_equipo.focus();
        mostrarError('error_equipo', 'Por favor, seleccione el equipo');
        error = true;

        if (!primerError) {
            primerError = id_equipo;
        }
    }

    if(descripcion.value === "" || descripcion.value === null) {
        descripcion.focus();
        mostrarError('error_descripcion', 'La descripción no puede estar vacía');
        error = true;

        if (!primerError) {
            primerError = descripcion;
        }
    }

    if(solucion.value === "" || solucion.value === null) {
        solucion.focus();
        mostrarError('error_solucion', 'La solución no puede estar vacía');
        error = true;

        if (!primerError) {
            primerError = solucion;
        }
    }

    // if (!error) {
    //     document.getElementById('FormularioIncidencias').submit();
    
    // } else 
    if (primerError) {
        primerError.focus();
    }

    return !error;
}
