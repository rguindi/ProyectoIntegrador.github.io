async function cerrarSesion() {
    try {
        const response = await fetch(`http://127.0.0.1:3000/usuarios/cerrar-sesion`, {
            method: 'POST',
            credentials: 'include',
        });

        if (response.ok) {
            window.location= "../index.html"
        } else {
            console.error('Error al cerrar sesión:', response.statusText);
        }
    } catch (error) {
        console.error('Error al cerrar sesión:', error);
    }
}

document.getElementById("btn-cerrar-session").addEventListener("click", cerrarSesion);
