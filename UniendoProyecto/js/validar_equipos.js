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

document.getElementById('formularioEquipos').addEventListener("submit", function (evento) {
    evento.preventDefault();
    limpiarErrores();

        //todo not null en la tabla de quipos 

    if (!nombre.checkValidity()) {
        nombre.focus();
        nombre.setCustomValidity('El nombre del equipo es obligatorio');
        mostrarError('error_nombre', nombre.validationMessage);
      
    }
    if (!descripcion.checkValidity()) {
        descripcion.focus();
        descripcion.setCustomValidity('Añade Una Descripción del Equipo');
        mostrarError('error_descripcion', descripcion.validationMessage);
    }

    if (!marca.checkValidity()) {
        marca.focus();
        marca.setCustomValidity('Indicar la marca del equipo es obligatoria');
        mostrarError('error_marca', marca.validationMessage);
        
    }

    if (!modelo.checkValidity()) {
        modelo.focus();
        modelo.setCustomValidity('Indicar el modelo del equipo es obligatorio');
        mostrarError('error_modelo', modelo.validationMessage);
     
    }

    if(!numero_de_serie.checkValidity()) {
        numero_de_serie.focus();
        numero_de_serie.setCustomValidity('El número de serie del equipo es obligatorio');
        mostrarError('error_numero_de_serie', numero_de_serie.validationMessage);
    }

    if (estado.value === "defecto") {
        estado.focus();
        mostrarError('error_estado', 'Por favor, seleccione el estado del equipo    .');
    }

    if (id_aula.value === "defecto") {
        id_aula.focus();
        mostrarError('error_aula', "Por favor, seleccione el aula donde se encuentra el equipo.");
    }

    if (id_categoria.value=="defecto") {
        id_categoria.focus();
        mostrarError('error_categoria', "Por favor, seleccione la categoria del equipo.");
    }

        //imagen default null en bd 
   

    if(!ano_adquisicion.checkValidity()) {
        ano_adquisicion.focus();
        ano_adquisicion.setCustomValidity('Indica el año de adquisición del equipo');
        mostrarError('error_ano_adquisicion', ano_adquisicion.validationMessage);
    }

    //Para redirigir a la pagina de registro de ordenador 

    //revisar para que no se pierdan los datos antes de redirigir

    // if(ordenador.checked){
    //     window.location.href = "../views/registrarOrdenador.html";
    //     return;
    // }
    
});


