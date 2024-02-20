const dirIP_api = '127.0.0.1';
const PUERTO_EXPRESS = 3000;

const form = document.getElementById('formRegistro');
const idUsuario = document.getElementById('id_usuario');
const contraseña = document.getElementById('contraseña');
const contraseña2 = document.getElementById('contraseña2');
const correo = document.getElementById('correo');

function mostrarError(elemento, mensaje) {
    document.querySelector(elemento).textContent = mensaje;
}

function limpiarErrores() {
    const elementosErroes = Array.from(form.getElementsByClassName('error'));
    elementosErroes.forEach(spanError => {
        spanError.textContent = "";
    });
}
function limpiarErrores() {
    const elementosErroes = Array.from(form.getElementsByClassName('error'));
    elementosErroes.forEach(spanError => {
        spanError.textContent = "";
    });
}

async function comprobarUser() {
    if (idUsuario.value != "") {
        let url = `http://${dirIP_api}:${PUERTO_EXPRESS}/usuarios/${idUsuario.value}`;
        try {
            const response = await fetch(url);
            const datos = await response.json();
            // console.log(datos);
            // indicar que el id de usuario ya existe
            if (!datos.error) {
                document.querySelector('span.aviso').textContent =`El usuario ${idUsuario.value} ya existe`;
                document.querySelector('span.aviso').style.color = "red";
                return false;
            }else{
                document.querySelector('span.aviso').textContent =`El usuario ${idUsuario.value} está disponible`;
                document.querySelector('span.aviso').style.color = "green";
                return true;
            }
        } catch (error) {
            console.error('Error en la peticion:', error);
        }
    }
}
async function registrarUsuario(usuario) {
    let url = `http://${dirIP_api}:${PUERTO_EXPRESS}/usuarios`;
    try {
        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(usuario),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            alert('Error en el registro');
        } else {
            window.location.href = './form_login.html';
        }
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
    }
}

idUsuario.addEventListener("blur", comprobarUser);

form.addEventListener('submit', async function (event) {
    event.preventDefault();
    limpiarErrores();
    let userCorrexto = await comprobarUser();
    if (!this.checkValidity() || contraseña.value != contraseña2.value || !userCorrexto) {
        if (!idUsuario.checkValidity()) {
            mostrarError('#divId + span.error', "Introduzca el Id de usuario");
        }
        if (!contraseña.checkValidity()) {
            mostrarError('#contraseña + span.error', "Introduzca la contraseña");
        }
        if (contraseña.value != contraseña2.value) {
            mostrarError('#contraseña2 + span.error', "La contraseñas deben coincidir");
        }
        if (!correo.checkValidity()) {
            mostrarError('#correo + span.error', "Introduzca un correo válido");
        }
    } else {
        const usuario = { id_usuario: idUsuario.value, contraseña: contraseña.value, correo: correo.value };
        registrarUsuario(usuario);
    }


});