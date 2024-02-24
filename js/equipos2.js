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
    return datosObtenidos;
}

function renderDatos(datos) {
    const datosEquipos = document.querySelector('.datosEquipos');
  
    datos.forEach(registro => {
        // Crear la card
        const card = document.createElement('div');
        card.classList.add('card', 'm-2', 'mb-3', 'shadow', 'p-3', 'mb-5', 'bg-body', 'rounded');
        card.style.width = '18rem';

        // Icono SVG
        const iconoSVG = `
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="Blue" class="bi bi-pc-display" viewBox="0 0 16 16">
                <path d="M8 1a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1zm1 13.5a.5.5 0 1 0 1 0 .5.5 0 0 0-1 0m2 0a.5.5 0 1 0 1 0 .5.5 0 0 0-1 0M9.5 1a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1zM9 3.5a.5.5 0 0 0 .5.5h5a.5.5 0 0 0 0-1h-5a.5.5 0 0 0-.5.5M1.5 2A1.5 1.5 0 0 0 0 3.5v7A1.5 1.5 0 0 0 1.5 12H6v2h-.5a.5.5 0 0 0 0 1H7v-4H1.5a.5.5 0 0 1-.5-.5v-7a.5.5 0 0 1 .5-.5H7V2z"/>
            </svg>
        `;
        const icono = document.createElement('div');
        icono.classList.add('card-img-top', 'mx-auto', 'mt-3', 'text-center');
        icono.innerHTML = iconoSVG;

        // Cuerpo de la card
        const cardBody = document.createElement('div');
        cardBody.classList.add('card-body');

        // Título con el nombre del equipo
        const titulo = document.createElement('h5');
        titulo.classList.add('card-title', 'text-center', 'fw-bold');
        titulo.textContent = registro.nombre;

        // Descripción del equipo
        const descripcion = document.createElement('p');
        descripcion.classList.add('card-text', 'fst-italic');
        descripcion.textContent = registro.descripcion;

        // Div para los botones
        const divBotones = document.createElement('div');
        divBotones.classList.add('d-flex', 'justify-content-between', 'mt-3', 'mb-3');

        // Botón para ver detalles
        const botonDetalles = document.createElement('button');
        botonDetalles.classList.add('btn', 'btn-warning', 'btn-sm');
        botonDetalles.textContent = 'Ver detalles';
        botonDetalles.addEventListener('click', function() {
            // Obtener el cuerpo de la card actual
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
        botonIncidencia.textContent = 'Ver incidencia';
        botonIncidencia.addEventListener('click', async function() {
            try {
                // Realizar solicitud para obtener detalles de incidencia
                const incidencia = await pedirIncidencia(registro.id_equipo);
                console.log(incidencia);
        
                // Construir HTML con los detalles de la incidencia
                            let detallesHTML = `
                <ul class="list-group list-group-flush detallesIncidencia">
                    <li class="list-group-item"><strong>Incidencia:</strong></li>
                    <li class="list-group-item">ID de Incidencia: ${incidencia.id_incidencia}</li>
                    <li class="list-group-item">ID de Equipo: ${incidencia.id_equipo}</li>
                    <li class="list-group-item">ID de Usuario: ${incidencia.id_usuario}</li>
                    <li class="list-group-item">Fecha de Incidencia: ${incidencia.fecha_incidencia}</li>
                    <li class="list-group-item">Descripción: ${incidencia.descripcion}</li>
                    <li class="list-group-item">Estado: ${incidencia.estado}</li>
                    <li class="list-group-item">Fecha de Solución: ${incidencia.fecha_solucion}</li>
                    <li class="list-group-item">Solución: ${incidencia.solucion}</li>
                    <li class="list-group-item">Última Actualización: ${incidencia.ultima_actualizacion}</li>
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
            
            } catch (error) {
                console.error("Error al obtener detalles de incidencia:", error);
            }
        });

        

        // Agregar botones al div de botones
        divBotones.appendChild(botonDetalles);
        divBotones.appendChild(botonIncidencia);

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



