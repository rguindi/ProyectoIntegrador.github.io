const nombre = document.getElementById('nombre');
const descripcion = document.getElementById('descripcion');
const marca = document.getElementById('marca');
const modelo = document.getElementById('modelo');
const numero_de_serie = document.getElementById('numero_de_serie');
const estado = document.getElementById('estado');
const id_aula = document.getElementById('id_aula');
const id_categoria = document.getElementById('id_categoria');
const imagen_producto = document.getElementById('imagen_producto');
const ano_adquisicion = document.getElementById('ano_adquisicion');
const ordenador = document.getElementById('ordenador');

function mostrarError(idError, mensaje) {
    document.getElementById(idError).textContent = mensaje;
}

function limpiarErrores() {
    const elementosError = document.querySelectorAll('.error');
    elementosError.forEach(function(span) {
        span.textContent = '';
    });
}

function validarEquipos(){
    
    limpiarErrores();

    let error = false;
    let primerError = null;

    if (nombre.value === "" || nombre.value === null) {
        nombre.focus();
        nombre.setCustomValidity('El nombre del equipo es obligatorio');
        mostrarError('error_nombre', nombre.validationMessage);
        error = true;

        if (!primerError) {
            primerError = nombre;
        }
    }

    if (descripcion.value === "" || descripcion.value === null) {
        descripcion.focus();
        descripcion.setCustomValidity('Añade Una Descripción del Equipo');
        mostrarError('error_descripcion', descripcion.validationMessage);
        error = true;

        if (!primerError) {
            primerError = descripcion;
        }
    }

    if (marca.value === "" || marca.value === null) {
        marca.focus();
        marca.setCustomValidity('Indicar la marca del equipo es obligatoria');
        mostrarError('error_marca', marca.validationMessage);
        error = true;

        if (!primerError) {
            primerError = marca;
        }
    }

    if (modelo.value === "" || modelo.value === null) {
        modelo.focus();
        modelo.setCustomValidity('Indicar el modelo del equipo es obligatorio');
        mostrarError('error_modelo', modelo.validationMessage);
        error = true;

        if (!primerError) {
            primerError = modelo;
        }
    }

    if(numero_de_serie.value === "" || numero_de_serie.value === null || isNaN(numero_de_serie.value)) {
        numero_de_serie.focus();
        numero_de_serie.setCustomValidity('El número de serie del equipo es obligatorio');
        mostrarError('error_numero_de_serie', numero_de_serie.validationMessage);
        error = true;

        if (!primerError) {
            primerError = numero_de_serie;
        }
    }

    if (estado.value === "defecto") {
        estado.focus();
        mostrarError('error_estado', 'Por favor, seleccione el estado del equipo');
        error = true;

        if (!primerError) {
            primerError = estado;
        }
    }

    if (id_aula.value === "defecto") {
        id_aula.focus();
        mostrarError('error_aula', "Por favor, seleccione el aula donde se encuentra el equipo");
        error = true;

        if (!primerError) {
            primerError = id_aula;
        }
    }

    if (id_categoria.value=="defecto") {
        id_categoria.focus();
        mostrarError('error_categoria', "Por favor, seleccione la categoria del equipo");
        error = true;

        if (!primerError) {
            primerError = id_categoria;
        }
    }

    //imagen default null en bd 

    if(ano_adquisicion.value === "" || ano_adquisicion.value === null || isNaN(ano_adquisicion.value) || ano_adquisicion.value< 1900 || ano_adquisicion.value > 2100) {
        ano_adquisicion.focus();
        ano_adquisicion.setCustomValidity('Indica el año de adquisición del equipo');
        mostrarError('error_ano_adquisicion', ano_adquisicion.validationMessage);
        error = true;

        if (!primerError) {
            primerError = ano_adquisicion;
        }
    }

    if (primerError) { 
        primerError.focus();
    }
    
    return !error;
}


