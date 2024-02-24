
const dirIP_api = '127.0.0.1';
const PUERTO_EXPRESS = 3000;
const tBody = document.getElementById('table-body');
const formBuscarCiudad = document.getElementById('buscarCiudad');
const inputNombre = document.getElementById('nombre');


async function pedirDatos() {
    const respuesta = await fetch(`http://${dirIP_api}:${PUERTO_EXPRESS}/equipos/`);
    if (!respuesta.ok) {
        throw "Ha ocurrido un error: " + respuesta.status + " (" + respuesta.statusText + ")";
    }
    const datosObtenidos = await respuesta.json();
    return datosObtenidos;
}

async function pedirDetalles(id) {
    const respuesta = await fetch(`http://${dirIP_api}:${PUERTO_EXPRESS}/detalles/${id}`);
    if (!respuesta.ok) {
        throw "Ha ocurrido un error: " + respuesta.status + " (" + respuesta.statusText + ")";
    }
    const datosObtenidos = await respuesta.json();
    return datosObtenidos;
}

function renderTabla(datos) {
    // tBody.innerHTML = "";
    Array.from(datos).forEach(registro => {
        const fila = document.createElement('tr');
        // fila con todos los datos
        const celdaId = document.createElement('td');
        celdaId.innerText = registro.id_equipo;
        const celdaUser = document.createElement('td');
        celdaUser.innerText = registro.id_usuario;
        const celdaNombre = document.createElement('td');
        celdaNombre.innerText = registro.nombre;
        const celdaDesc = document.createElement('td');
        celdaDesc.innerText = registro.descripcion;
        const celdaMarca = document.createElement('td');
        celdaMarca.innerText = registro.marca;
        const celdaModelo = document.createElement('td');
        celdaModelo.innerText = registro.modelo;
        const celdaNumSerie = document.createElement('td');
        celdaNumSerie.innerText = registro.numero_de_serie;
        const celdaEstado = document.createElement('td');
        celdaEstado.innerText = registro.estado;
        const celdaAula = document.createElement('td');
        celdaAula.innerText = registro.id_aula;
        const celdaCategoria = document.createElement('td');
        celdaCategoria.innerText = registro.id_categoria;
        const celdaImagen = document.createElement('td');
        celdaImagen.innerText = registro.imagen_producto;
        const celdaQR = document.createElement('td');
        celdaQR.innerText = registro.qr_code;
        const celdaAno = document.createElement('td');
        celdaAno.innerText = registro.ano_adquisicion;
        const celdaUltimaAtualicacion = document.createElement('td');
        let fecha = new Date(registro.ultima_actualizacion);
        celdaUltimaAtualicacion.innerText = fecha.toLocaleDateString();
        const celdaCodigo = document.createElement('td');
        celdaCodigo.innerText = registro.codigo;

        const celdaBoton = document.createElement('td');
        const boton = document.createElement("button");
        boton.innerText = "Ver detalles";
        boton.addEventListener("click", async function () {
            const datosDetalles = await pedirDetalles(registro.id_equipo);
            // nueva ventana con detalles
            const ventanaDetalles = window.open("", "Detalles", "width=450, height=550");

            // Ajustar la posición de la ventana al centro de la pantalla
            const ventanaAncho = ventanaDetalles.outerWidth;
            const ventanaAlto = ventanaDetalles.outerHeight;

            const pantallaAncho = window.screen.width;
            const pantallaAlto = window.screen.height;
            const posX = (pantallaAncho - ventanaAncho) / 2;
            const posY = (pantallaAlto - ventanaAlto) / 2;

            ventanaDetalles.moveTo(posX, posY);

            // datos de la ventana
            const ventanaDocument = ventanaDetalles.document;
            const title = document.createElement("title");
            title.innerHTML = "Detalles";
            ventanaDocument.head.appendChild(title);
            
            ventanaDocument.body.innerHTML = "";
            const titulo = document.createElement("h1");
            titulo.innerText = `Detalles del equipo ${registro.id_equipo}`

            const divDatos = ventanaDocument.createElement("div");
            for (const key in datosDetalles) {
                if (key != "id_detalle" && key != "id_equipo") {
                    const parrafo = document.createElement("p");
                    parrafo.style.fontWeight = "bold";
                    const dato = document.createElement("span");
                    dato.style.fontWeight = "normal";
                    parrafo.innerText = key + ": ";
                    dato.innerText = datosDetalles[key];
                    parrafo.appendChild(dato)
                    divDatos.appendChild(parrafo);
                }

            }
            ventanaDocument.body.appendChild(titulo);
            ventanaDocument.body.appendChild(divDatos);
        })

        celdaBoton.appendChild(boton);
        fila.appendChild(celdaId);
        fila.appendChild(celdaUser);
        fila.appendChild(celdaNombre);
        fila.appendChild(celdaDesc);
        fila.appendChild(celdaMarca);
        fila.appendChild(celdaModelo);
        fila.appendChild(celdaNumSerie);
        fila.appendChild(celdaEstado);
        fila.appendChild(celdaAula);
        fila.appendChild(celdaCategoria);
        fila.appendChild(celdaImagen);
        fila.appendChild(celdaQR);
        fila.appendChild(celdaAno);
        fila.appendChild(celdaUltimaAtualicacion);
        fila.appendChild(celdaCodigo);
        fila.appendChild(celdaBoton);

        tBody.appendChild(fila);
    });
}

async function completarTabla() {
    try {
        const datos = await pedirDatos();
        renderTabla(datos);

    } catch (e) {
        console.error("Error final:", e);
    }
}

// cargar tabla al iniciar la página
window.onload = completarTabla;

