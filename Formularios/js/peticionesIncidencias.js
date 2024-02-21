const dirIP_api = '192.168.7.106'; 
const PUERTO_EXPRESS = 3000;

async function getIncidencias() {

    const url=`http://${dirIP_api}:${PUERTO_EXPRESS}/incidencias`;

    const respuesta = await fetch(url);

    if (!respuesta.ok) {
        throw `Error ${respuesta.status} de la BBDD: ${respuesta.statusText}`;
    }

    const datos = await respuesta.json();

    return datos;
}


let tabla= document.getElementById('tabla')
//PRIMERO HAGO UNA PETICION GET PARA PODER VER TODAS LAS CIUDADES

window.onload = async function() {
    try {
        const datos = await getIncidencias();
        console.log(datos);
       
        datos.forEach(element => {

        let tr = document.createElement('tr');
          const td = document.createElement('td');
          td.innerHTML =element.id;
          const td2 = document.createElement('td');
          td2.innerHTML =element.nombre;
          const td3 = document.createElement('td');
          td3.innerHTML =element.cantidad;
          const bt = document.createElement('button');
          bt.setAttribute('id', element.id);
          bt.innerText = 'Eliminar';

        tr.appendChild(td);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(bt);
        tabla.appendChild(tr);

        // document.getElementById(element.id).addEventListener('click', eliminar);


        });
    } catch (error) {
        console.log("mal");
        console.error(error);
        return;
    }
}

async function getIncidencias() { 

    const response = await fetch(`http://${dirIP_api}:${PUERTO_EXPRESS}/incidencias`) 

    try {

      if (!response.ok) { 
        throw `Error ${response.status} de la BBDD: ${response.statusText}` 
      } 

      const datos = await response.json() 
      return datos
      
    } catch (error) {
      console.log("Fallo fetch");
      throw error;
    }
  }