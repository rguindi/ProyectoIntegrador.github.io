
async function isAdmin() {
    try {
        const response = await fetch(`http://${dirIP_api}:${PUERTO_EXPRESS}/usuarios/user`, {
            credentials: 'include' // Incluye la cookie de sesión en la solicitud
        });
        if (!response.ok) {
            throw `Error ${response.status} de la BBDD: ${response.statusText}`;
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
        window.location = "../views/registrarIncidencia.html";
    }
});
