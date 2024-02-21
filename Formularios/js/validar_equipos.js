const nombre = document.getElementById('nombre');
const descripcion = document.getElementById('descripcion');
const marca = document.getElementById('marca');
const modelo = document.getElementById('modelo');
const numero_de_serie = document.getElementById('numero_de_serie');
const estado = document.getElementById('estado');
const id_aula = document.getElementById('id_aula');
const id_categoria = document.getElementById('id_categoria');
// const imagen_producto = document.getElementById('imagen_producto');
const ano_adquisicion = document.getElementById('ano_adquisicion');
// const ordenador = document.getElementById('ordenador');

function mostrarError(idError, mensaje) {
    document.getElementById(idError).textContent = mensaje;
}

function limpiarErrores() {
    const elementosError = document.querySelectorAll('.error');
    elementosError.forEach(function(span) {
        span.textContent = '';
    });
}

document.getElementById('formularioEquipos').addEventListener("submit", function (evento) {
    limpiarErrores();

    if (!nombre.checkValidity()) {
        nombre.focus();
        mostrarError('error_nombre', nombre.validationMessage);
        return;
    }
    if (!descripcion.checkValidity()) {
        descripcion.focus();
        mostrarError('error_descripcion', descripcion.validationMessage);
        return;
    }

    if (!marca.checkValidity()) {
        marca.focus();
        mostrarError('error_marca', marca.validationMessage);
        return;
    }

    if (!modelo.checkValidity()) {
        modelo.focus();
        mostrarError('error_modelo', modelo.validationMessage);
        return;
    }

    if (estado.value === "defecto") {
        estado.focus();
        mostrarError('error_estado', 'Por favor, seleccione el estado del equipo    .');
        return;
    }
    if (id_aula.value === "defecto") {
        id_aula.focus();
        mostrarError('error_id_aula', id_aula.validationMessage);
        return;
    }

    if (!id_categoria.checkValidity()) {
        id_categoria.focus();
        mostrarError('error_id_categoria', id_categoria.validationMessage);
        return;
    }

    // if(!imagen_producto.checkValidity()) {
    //     imagen_producto.focus();
    //     mostrarError('error_imagen_producto', imagen_producto.validationMessage);
    //     return;
    // }

    if(!ano_adquisicion.checkValidity()) {
        ano_adquisicion.focus();
        mostrarError('error_ano_adquisicion', ano_adquisicion.validationMessage);
        return;
    }

    // if(!ordenador.checkValidity()) {
    //     ordenador.focus();
    //     mostrarError('error_ordenador', ordenador.validationMessage);
    //     return;
    // }
    
});


