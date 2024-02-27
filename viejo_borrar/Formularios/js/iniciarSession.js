import * as funcionesForms from './funcionesForms.js';

const dirIP_api = '127.0.0.1';
const PUERTO_EXPRESS = 3000;

const id_usuario = document.getElementById('id_usuario');
const contraseña = document.getElementById('contraseña');

async function verificarUser(usuario) {

    let url = `http://${dirIP_api}:${PUERTO_EXPRESS}/usuarios/verificar`;

    try {
        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(usuario),
            credentials: 'include' ,
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            funcionesForms.mostrarError('errorContraseña', 'Login incorrecto');

        }else{
            window.location.href = '../Formularios/form_Incidencias.html';
        }

    } catch (error) {
        console.error('Error al iniciar sesión:', error);
    }
}

function validarFormularioInicioSesion(event) {

    event.preventDefault();

    let hayError = false;

    funcionesForms.limpiarErrores('formLogin');

    // Validar id_usuario
    if (id_usuario.value === "") {
        funcionesForms.mostrarError('errorUsuario', "Usuario vacío");
        id_usuario.focus();
        hayError = true;
    } 

    // Validar contraseña
    if (contraseña.value === "") {
        funcionesForms.mostrarError('errorContraseña', "Contraseña vacía");
        contraseña.focus();
        hayError = true;
    }

    if (!hayError) {
        funcionesForms.enviado();

        const idUsuario = id_usuario.value;
        const contraseñaUsuario = contraseña.value;
        const usuario = { id_usuario: idUsuario, contraseña: contraseñaUsuario };

        verificarUser(usuario);
    }
}

document.getElementById('formLogin').addEventListener('submit', validarFormularioInicioSesion);