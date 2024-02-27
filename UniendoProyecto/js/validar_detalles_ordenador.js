const procesador = document.getElementById('procesador');
const memoria_ram = document.getElementById('memoria_ram');
const disco_duro = document.getElementById('disco_duro');
const tarjeta_grafica = document.getElementById('tarjeta_grafica');
const sistema_operativo = document.getElementById('sistema_operativo');
const licencia = document.getElementById('licencia');
const otros_detalles = document.getElementById('otros_detalles');

function mostrarError(idError, mensaje) {
    document.getElementById(idError).textContent = mensaje;
}

function limpiarErrores() {
    const elementosError = document.querySelectorAll('.error');
    elementosError.forEach(function(span) {
        span.textContent = '';
    });
}

function validarDetallesOrdenador(){
    
    limpiarErrores();

    let error = false;
    let primerError = null;

    if (procesador.value === "" || procesador.value === null) {
        procesador.focus();
        procesador.setCustomValidity('El procesador del ordenador está vacío');
        mostrarError('error_procesador', procesador.validationMessage);
        error = true;

        if (!primerError) {
            primerError = procesador;
        }
    }

    if (memoria_ram.value === "" || memoria_ram.value === null) {
        memoria_ram.focus();
        memoria_ram.setCustomValidity('La memoria RAM del ordenador está vacía');
        mostrarError('error_memoria_ram', memoria_ram.validationMessage);
        error = true;

        if (!primerError) {
            primerError = memoria_ram;
        }
    }

    if (disco_duro.value === "" || disco_duro.value === null) {
        disco_duro.focus();
        disco_duro.setCustomValidity('El disco duro del ordenador está vacío');
        mostrarError('error_disco_duro', disco_duro.validationMessage);
        error = true;

        if (!primerError) {
            primerError = disco_duro;
        }
    }

    if (tarjeta_grafica.value === "" || tarjeta_grafica.value === null) {
        tarjeta_grafica.focus();
        tarjeta_grafica.setCustomValidity('La tarjeta gráfica del ordenador está vacía');
        mostrarError('error_tarjeta_grafica', tarjeta_grafica.validationMessage);
        error = true;

        if (!primerError) {
            primerError = tarjeta_grafica;
        }
    }

    if(sistema_operativo.value === "" || sistema_operativo.value === null) {
        sistema_operativo.focus();
        sistema_operativo.setCustomValidity('El sistema operativo del ordenador está vacío');
        mostrarError('error_sistema_operativo', sistema_operativo.validationMessage);
        error = true;

        if (!primerError) {
            primerError = sistema_operativo;
        }
    }

    if(licencia.value === "" || licencia.value === null) {
        licencia.focus();
        licencia.setCustomValidity('La licencia del ordenador está vacía');
        mostrarError('error_licencia', licencia.validationMessage);
        error = true;

        if (!primerError) {
            primerError = licencia;
        }
    }

    if(otros_detalles.value === "" || otros_detalles.value === null) {
        otros_detalles.focus();
        otros_detalles.setCustomValidity('Los otros detalles del ordenador están vacíos');
        mostrarError('error_otros_detalles', otros_detalles.validationMessage);
        error = true;

        if (!primerError) {
            primerError = otros_detalles;
        }
    }

    if (primerError) { 
        primerError.focus();
    }
    
    return !error;
}


