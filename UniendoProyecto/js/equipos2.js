const dirIP_api = '127.0.0.1';
const PUERTO_EXPRESS = 3000;

async function pedirDatos() {
    const respuesta = await fetch(`http://${dirIP_api}:${PUERTO_EXPRESS}/equipos/`);
    if (!respuesta.ok) {
        throw "Ha ocurrido un error: " + respuesta.status + " (" + respuesta.statusText + ")";
    }
    const datosObtenidos = await respuesta.json();
    return datosObtenidos;
}

async function pedirIncidencia(id) {
    const respuesta = await fetch(`http://${dirIP_api}:${PUERTO_EXPRESS}/incidencias/equipo/${id}`);
    if (!respuesta.ok) {
        throw "Ha ocurrido un error: " + respuesta.status + " (" + respuesta.statusText + ")";
    }
    const datosObtenidos = await respuesta.json();
    return datosObtenidos[0];
}

async function pedirDetallesOrdenador(id) {
    const respuesta = await fetch(`http://${dirIP_api}:${PUERTO_EXPRESS}/detalles/${id}`);
    
    if (!respuesta.ok) {
        throw "Ha ocurrido un error: " + respuesta.status + " (" + respuesta.statusText + ")";
    }
    const datosObtenidos = await respuesta.json();
    return datosObtenidos[0];
}

function renderDatos(datos) {
    const datosEquipos = document.querySelector('.datosEquipos');

    datos.forEach(registro => {
        // Crear la card
        const card = document.createElement('div');
        card.classList.add('card', 'm-2', 'mb-3', 'shadow', 'p-3', 'mb-5', 'bg-body', 'rounded');
        card.style.width = '18rem';

        const icono = document.createElement('div');
        icono.classList.add('card-img-top', 'mx-auto', 'mt-3', 'text-center');

        // Obtener la imagen a partir del Blob
        const bufferData = registro?.imagen_producto?.data;
        const arrayBuffer = new Uint8Array(bufferData).buffer; // Convertir el array de datos a un ArrayBuffer
        const blob = new Blob([arrayBuffer], { type: 'image/png' });

        const urlImg = URL.createObjectURL(blob);

        const imagen = document.createElement("img");
            imagen.style.width = "200px";
            imagen.style.height = "150px";
            imagen.src = urlImg;
            icono.appendChild(imagen);

        // Cuerpo de la card
        const cardBody = document.createElement('div');
            cardBody.classList.add('card-body');

        // Título con el nombre del equipo
        const titulo = document.createElement('h5');
            titulo.classList.add('card-title', 'text-center', 'fw-bold');
            titulo.textContent = registro.nombre;

        // Descripción del equipo
        const descripcion = document.createElement('p');
            descripcion.classList.add('card-text', 'text-center', 'fst-italic');
            descripcion.textContent = registro.descripcion;

        // Div para los botones
        const divBotones = document.createElement('div');
            divBotones.classList.add('d-flex', 'justify-content-center');
        
        // Botón para ver detalles
        const botonDetalles = document.createElement('button');
            botonDetalles.classList.add('btn', 'btn-warning', 'btn-sm');
            botonDetalles.style.marginRight = '5px';
            botonDetalles.textContent = 'Ver detalles';

        botonDetalles.addEventListener('click', function () {
            // Obtener body de la card
            const cardBody = card.querySelector('.card-body');

            const detallesIncidenciaAnterior = cardBody.querySelector('.detallesIncidencia');
            if (detallesIncidenciaAnterior) {
                detallesIncidenciaAnterior.remove();
            }

            // Limpiar cualquier detalle anterior
            const detallesEquipoAnteriores = cardBody.querySelector('.detallesEquipo');
            if (detallesEquipoAnteriores) {
                detallesEquipoAnteriores.remove();
            }

            // Obtener el QR a partir del Blob
            const urlQR = registro.qr_code.data.reduce((final, e) => {
                return final + String.fromCharCode(e);
            }, "");

            // Construir HTML con los detalles del registro actual
            let detallesHTML = `
                <ul class="list-group list-group-flush detallesEquipo">
                    <li class="list-group-item"><strong>Detalles del Equipo:</strong></li>
                    <li class="list-group-item">ID de Equipo: ${registro.id_equipo}</li>
                    <li class="list-group-item">ID de Usuario: ${registro.id_usuario}</li>
                    <li class="list-group-item">Nombre: ${registro.nombre}</li>
                    <li class="list-group-item">Descripción: ${registro.descripcion}</li>
                    <li class="list-group-item">Marca: ${registro.marca}</li>
                    <li class="list-group-item">Modelo: ${registro.modelo}</li>
                    <li class="list-group-item">Número de Serie: ${registro.numero_de_serie}</li>
                    <li class="list-group-item"><img src='${urlQR}'></li>
                    <li class="list-group-item">Estado: ${registro.estado}</li>
                    <li class="list-group-item">ID de Aula: ${registro.id_aula}</li>
                    <li class="list-group-item">ID de Categoría: ${registro.id_categoria}</li>
                    <li class="list-group-item">Año de Adquisición: ${registro.ano_adquisicion}</li>
                    <li class="list-group-item">Última Actualización: ${registro.ultima_actualizacion}</li>
                    <li class="list-group-item">Código: ${registro.codigo}</li>
                    <!-- Puedes añadir más campos según sea necesario -->
                </ul>
            `;

            //para agregar la lista  cardBody
            cardBody.insertAdjacentHTML('beforeend', detallesHTML);

        });


        const botonIncidencia = document.createElement('button');
            botonIncidencia.classList.add('btn', 'btn-danger', 'btn-sm');
            botonIncidencia.style.marginRight = '5px';
            botonIncidencia.textContent = 'Ver incidencia';

        botonIncidencia.addEventListener('click', async function () {
            try {
                // Realizar solicitud para obtener detalles de incidencia
                const incidencia = await pedirIncidencia(registro.id_equipo);
                console.log(incidencia);


                if (incidencia) {
                    // Construir HTML con los detalles de la incidencia
                    let detallesHTML = `
                    <ul class="list-group list-group-flush detallesIncidencia">
                        <li class="list-group-item"><strong>Incidencia:</strong></li>
                        <li class="list-group-item">ID de Incidencia: ${incidencia.id_incidencia}</li>
                        <li class="list-group-item">ID de Equipo: ${incidencia.id_equipo}</li>
                        <li class="list-group-item">ID de Usuario: ${incidencia.id_usuario}</li>
                        <li class="list-group-item">Fecha de Incidencia: ${incidencia.fecha_reporte}</li>
                        <li class="list-group-item ${incidencia.descripcion === null ? 'd-none' : ''}">Descripción: ${incidencia.descripcion !== null ? incidencia.descripcion : 'N/A'}</li>
                        <li class="list-group-item">Estado: ${incidencia.estado}</li>
                        <li class="list-group-item ${incidencia.fecha_solucion === null ? 'd-none' : ''}">Fecha de Solución: ${incidencia.fecha_solucion !== null ? incidencia.fecha_solucion : 'N/A'}</li>
                        <li class="list-group-item ${incidencia.solucion === null ? 'd-none' : ''}">Solución: ${incidencia.solucion !== null ? incidencia.solucion : 'N/A'}</li>
                        <li class="list-group-item">Última Actualización: ${incidencia.fecha_actualizacion !== null ? incidencia.fecha_actualizacion : 'N/A'}</li>
                    </ul>`;
    
    
                    // Obtener el cuerpo de la card actual
                    const cardBody = card.querySelector('.card-body');
    
                    // Limpiar cualquier detalle anterior
                    const detallesIncidenciaAnterior = cardBody.querySelector('.detallesIncidencia');
                    if (detallesIncidenciaAnterior) {
                        detallesIncidenciaAnterior.remove();
                    }
                    const detallesEquipoAnteriores = cardBody.querySelector('.detallesEquipo');
                    if (detallesEquipoAnteriores) {
                        detallesEquipoAnteriores.remove();
                    }
    
                    // Agregar detalles de la incidencia al cuerpo de la card
                    cardBody.insertAdjacentHTML('beforeend', detallesHTML);
                
                } else {
                    console.error("No hay incidencias para este equipo");
                }

            } catch (error) {
                console.error("Error al obtener detalles de incidencia:", error);
            }
        });


        const botonDetallesOrdenador = document.createElement('button');
            botonDetallesOrdenador.classList.add('btn', 'btn-success', 'btn-sm');
            botonDetallesOrdenador.textContent = 'Ver detalles ordenador';

        botonDetallesOrdenador.addEventListener('click', async function () {
            try {

                console.log(registro.id_equipo);

                // Realizar solicitud para obtener detalles de incidencia
                const detalles_ordenador = await pedirDetallesOrdenador(registro.id_equipo);
                console.log(detalles_ordenador);


                if (detalles_ordenador) {
                    // Construir HTML con los detalles de la incidencia
                    let detallesHTML = `
                    <div>
                        <h4>Detalles del Ordenador:</h4>
                        <p><strong>Procesador:</strong> ${detallesOrdenador.procesador}</p>
                        <p><strong>Memoria RAM:</strong> ${detallesOrdenador.memoria_ram}</p>
                        <p><strong>Disco Duro:</strong> ${detallesOrdenador.disco_duro}</p>
                        <p><strong>Tarjeta Gráfica:</strong> ${detallesOrdenador.tarjeta_grafica}</p>
                        <p><strong>Sistema Operativo:</strong> ${detallesOrdenador.sistema_operativo}</p>
                        <p><strong>Licencia:</strong> ${detallesOrdenador.licencia}</p>
                        <p><strong>Otros detalles:</strong> ${detallesOrdenador.otros_detalles ? detallesOrdenador.otros_detalles : 'N/A'}</p>
                    </div>
                    `;

                    // Abrir una ventana emergente y mostrar los detalles del ordenador
                    const detallesOrdenadorWindow = window.open('', 'Detalles del Ordenador', 'width=600,height=400');
                    detallesOrdenadorWindow.document.body.innerHTML = detallesHTML;
        
                } else {
                    console.error("No hay detalles de ordenador para este equipo");
                }

            } catch (error) {
                console.error("Error al obtener detalles de ordenador:", error);
            }
        });


        // Limpiar detalles al hacer doble click en el botón Detalles
        botonDetalles.addEventListener('dblclick', function () {
            const detallesEquipo = cardBody.querySelector('.detallesEquipo');
            if (detallesEquipo) {
                detallesEquipo.remove();
            }
        });

        // Limpiar incidencia al hacer doble click en el botón Incidencia
        botonIncidencia.addEventListener('dblclick', function () {
            const detallesIncidencia = cardBody.querySelector('.detallesIncidencia');
            if (detallesIncidencia) {
                detallesIncidencia.remove();
            }
        });


        // Agregar botones al div de botones
        divBotones.appendChild(botonDetalles);
        divBotones.appendChild(botonIncidencia);
        divBotones.appendChild(botonDetallesOrdenador);

        // Agregar elementos al cuerpo de la card
        cardBody.appendChild(titulo);
        cardBody.appendChild(descripcion);
        cardBody.appendChild(divBotones);

        // Agregar el cuerpo de la card a la card
        card.appendChild(icono);
        card.appendChild(cardBody);

        // Agregar la card al contenedor de datosEquipos
        datosEquipos.appendChild(card);
    });
}

async function obtenerDetalles(id) {
    try {
        const detalles = await pedirDetalles(id);
        // Construir HTML con los detalles obtenidos
        let detallesHTML = '<ul>';
        detalles.forEach(detalle => {
            detallesHTML += `<li>${detalle}</li>`;
        });
        detallesHTML += '</ul>';
        return detallesHTML;
    } catch (error) {
        console.error("Error al obtener detalles:", error);
        return 'Error al obtener detalles.';
    }
}


async function completarDatos() {
    try {
        const datos = await pedirDatos();
        renderDatos(datos);

    } catch (e) {
        console.error("Error final:", e);
    }
}

// cargar tabla al iniciar la página
window.onload = completarDatos;



