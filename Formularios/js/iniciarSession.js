const dirIP_api = '127.0.0.1';
const PUERTO_EXPRESS = 3000;

async function verificarUser(usuario) {
    let url = `http://${dirIP_api}:${PUERTO_EXPRESS}/usuarios/verificar`;
    try {
        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(usuario),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            alert('Login incorrecto');
        }else{
            window.location.href = './form_Incidencias.html';
        }
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
    }
}

document.getElementById('formLogin').addEventListener('submit', async function (event) {
    event.preventDefault();

    const idUsuario = document.getElementById('id_usuario').value;
    const contraseña = document.getElementById('contraseña').value;
    const usuario = { id_usuario: idUsuario, contraseña: contraseña };
    verificarUser(usuario);

});