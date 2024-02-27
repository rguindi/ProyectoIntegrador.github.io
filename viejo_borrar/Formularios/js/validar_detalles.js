const procesador = document.getElementById('procesador');
const memoria_ram = document.getElementById('memoria_ram');
const disco_duro = document.getElementById('disco_duro');
const tarjeta_grafica = document.getElementById('tarjeta_grafica');
const sistema_operativo = document.getElementById('sistema_operativo');
const licencia = document.getElementById('licencia');
const otros_detalles = document.getElementById('otros_detalles');
const usuario_admin = document.getElementById('usuario_admin');
const password_admin = document.getElementById('password_admin');
function mostrarError(idError, mensaje) {
    document.getElementById(idError).textContent = mensaje;
}

function limpiarErrores() {
    const elementosError = document.querySelectorAll('.error');
    elementosError.forEach(function(span) {
        span.textContent = '';
    });
}
document.getElementById('formularioDetallesOrdenador').addEventListener("submit", function (evento) {
evento.preventDefault();
    limpiarErrores();


    if (!procesador.checkValidity()) {
        procesador.focus();
        mostrarError('error_procesador', procesador.validationMessage);
        return false;
    }

    if (!memoria_ram.checkValidity()) {
        memoria_ram.focus();
        mostrarError('error_memoria_ram', memoria_ram.validationMessage);
        return false;
    }

    if (!disco_duro.checkValidity()) {
        disco_duro.focus();
        mostrarError('error_disco_duro', disco_duro.validationMessage);
        return false;
    }

    if (!tarjeta_grafica.checkValidity()) {
        tarjeta_grafica.focus();
        mostrarError('error_tarjeta_grafica', tarjeta_grafica.validationMessage);
        return false;
    }

    if (!sistema_operativo.checkValidity()) {
        sistema_operativo.focus();
        mostrarError('error_sistema_operativo', sistema_operativo.validationMessage);
        return false;
    }

    if (!licencia.checkValidity()) {
        licencia.focus();
        mostrarError('error_licencia', licencia.validationMessage);
        return false;
    }

    if (!otros_detalles.checkValidity()) {
        otros_detalles.focus();
        mostrarError('error_otros_detalles', otros_detalles.validationMessage);
        return false;
    }

    if (!usuario_admin.checkValidity()) {
        usuario_admin.focus();
        mostrarError('error_usuario_admin', usuario_admin.validationMessage);
        return false;
    }

    if (!password_admin.checkValidity()) {
        password_admin.focus();
        mostrarError('error_password_admin', password_admin.validationMessage);
        return false;
    }

    // Si todos los campos son válidos, puedes enviar el formulario
    return true;
});
