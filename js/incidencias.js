
const dirIP_api = '127.0.0.1';
const PUERTO_EXPRESS = 3000;

const tBody = document.getElementById('table-body');

const formBuscarCiudad = document.getElementById('buscarCiudad');
const inputNombre = document.getElementById('nombre');


async function pedirDatos() {
    const respuesta = await fetch(`http://${dirIP_api}:${PUERTO_EXPRESS}/incidencias/`);

    if (!respuesta.ok) {
        throw "Ha ocurrido un error: " + respuesta.status + " (" + respuesta.statusText + ")";
    }

    const datosObtenidos = await respuesta.json();
    return datosObtenidos;
}

async function modificarIncidencia(id, celdaSolucion, selectEstado) {

    let solucion = celdaSolucion.innerText;
    let estado = selectEstado.value;

    let url = `http://${dirIP_api}:${PUERTO_EXPRESS}/incidencias/${id}`;

    try {
        const response = await fetch(url, {

            method: 'PATCH',
            body: JSON.stringify({
                solucion: solucion,
                estado: estado,
                fecha_actualizacion: new Date()
            }),

            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            alert('Error en la modificacion incorrecto');

        } else {
            // window.location.href = './form_Incidencias.html';
        }

    } catch (error) {
        console.error('Error al iniciar sesión:', error);
    }
}

function renderTabla(datos) {
    // tBody.innerHTML = "";
    Array.from(datos).forEach(registro => {

        const fila = document.createElement('tr');

        // fila con todos los datos
        const celdaId = document.createElement('td');
        celdaId.innerText = registro.id_incidencia;
        fila.appendChild(celdaId);

        const celdaUser = document.createElement('td');
        celdaUser.innerText = registro.id_usuario;
        fila.appendChild(celdaId);

        const celdaEquipo = document.createElement('td');
        celdaEquipo.innerText = registro.id_equipo;

        const celdaFechaReporte = document.createElement('td');

        let fecha = new Date(registro.fecha_reporte);
        celdaFechaReporte.innerText = fecha.toLocaleDateString();

        const celdaDesc = document.createElement('td');
        celdaDesc.innerText = registro.descripcion;

        const celdaSolucion = document.createElement('td');
        celdaSolucion.innerText = registro.solucion;
        celdaSolucion.setAttribute('id', 'td_Solucion');

        // funcion para edfitar el texto de la solución
        celdaSolucion.addEventListener('click', () => {
            const textarea = document.createElement('textarea');
            textarea.style.width = "200px";
            textarea.value = celdaSolucion.innerText;
            textarea.setAttribute('id', 'tA_Solucion');

            celdaSolucion.replaceWith(textarea);

            textarea.addEventListener('blur', () => {
                celdaSolucion.innerText = textarea.value;

                textarea.replaceWith(celdaSolucion);
            });

            textarea.focus();
        });

        const celdaEstado = document.createElement('td');
        const selectEstado = document.createElement('select');

        option = new Option("Abierta", "abierta", false, "abierta" == registro.estado);
        selectEstado.appendChild(option);

        option = new Option("En proceso", "en_proceso", false, "en_proceso" == registro.estado);
        selectEstado.appendChild(option);

        option = new Option("Cerrada", "cerrada", false, "cerrada" == registro.estado);
        selectEstado.appendChild(option);

        celdaEstado.appendChild(selectEstado);

        const celdaFechaUltima = document.createElement('td');

        fecha = new Date(registro.fecha_actualizacion);
        celdaFechaUltima.innerText = fecha.toLocaleDateString();

        fila.appendChild(celdaId);
        fila.appendChild(celdaUser);
        fila.appendChild(celdaEquipo);
        fila.appendChild(celdaFechaReporte);
        fila.appendChild(celdaDesc);
        fila.appendChild(celdaSolucion);
        fila.appendChild(celdaEstado);
        fila.appendChild(celdaFechaUltima);

        // botón de modificación
        const celdaEliminar = document.createElement('td');
        const boton = document.createElement('button');
        boton.setAttribute("class", "btnGuardar btn btn-warning btn-sm");
        boton.innerText = "Guardar";

        boton.addEventListener("click", modificarIncidencia.bind(null, registro.id_incidencia, celdaSolucion, selectEstado))
        celdaEliminar.appendChild(boton);
        fila.appendChild(celdaEliminar);

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

