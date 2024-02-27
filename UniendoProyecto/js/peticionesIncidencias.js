// Peticion POST con ASYNC/AWAIT
const dirIP_api = '127.0.0.1'; // O asignar el valor que necesitas
const PUERTO_EXPRESS = 3000; // O asignar el valor que necesitas
const url=`http://${dirIP_api}:${PUERTO_EXPRESS}`;
const selectEquipo = document.getElementById('id_equipo');
import { validaIncidencia } from "./validar_incidencias.js";


  //FUNCION PARA AUTO-RELLENAR LOSEQUIPOS
  async function getDataEquipo(isEquipo) {
    const response = await fetch(url + '/equipos/')
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

//Rellenamos equipos al cargar la ventana
window.onload = async function() {
    await getDataEquipo()
   .then(datos=>{
    datos.forEach(element => {
        let option = document.createElement('option');
        option.value = element.id_equipo;
        option.text = element.nombre;
        selectEquipo.appendChild(option);
    });
    
   }).catch(error=>{
    console.log("mal"+error)
   })

}



 
async function crearIncidencia(incidencia) {
    const url = `http://${dirIP_api}:${PUERTO_EXPRESS}/incidencias`;
    const datoPromesa = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(incidencia),
        headers: {
            'Content-Type': 'application/json'
        }
    });
 
    console.log(datoPromesa);
    // Convertimos a JSON, ya que el resultado de datoPromesa es una promesa que no se puede visualizar
    return await datoPromesa.json();;
}

async function getUsuario() { 
    try {
      const response = await fetch(`http://${dirIP_api}:${PUERTO_EXPRESS}/usuarios/user`, {
        credentials: 'include' // Incluye la cookie de sesión en la solicitud
      });
      if (!response.ok) {
          throw `Error ${response.status} de la BBDD: ${response.statusText}`;
      }
      const datos = await response.json();
      console.log(datos.usuario);
      return datos;
    } catch (error) {
      console.log("Fallo fetch");
      throw error;
    }
  }


document.getElementById('FormularioIncidencias').addEventListener('submit', async (event) => {
    event.preventDefault();
    if (!validaIncidencia()) {
        return;
    }
 
    // Insertamos los valores de los campos input en un objeto nuevaAula
    
    let descripcion = document.getElementById('descripcion').value;
    if (descripcion == "") descripcion = null;
    let solucion = document.getElementById('solucion').value;
    if (solucion == "") solucion = null;
    // let estado = document.getElementById('estado').value;
    let estado = 'abierta';
    let usuario = await getUsuario();
    let usuario_admin = usuario['usuario'].id_usuario; 
    let id_equipo = document.getElementById('id_equipo').value;

    // Obtener la fecha actual
const fechaActual = new Date();

// Obtener el año, mes y día
const year = fechaActual.getFullYear();
const month = String(fechaActual.getMonth() + 1).padStart(2, '0'); // Se agrega 1 porque los meses se indexan desde 0
const day = String(fechaActual.getDate()).padStart(2, '0');

// Crear el formato string YYYY-MM-DD
const fechaFormateada = `${year}-${month}-${day}`;


    const incidencia = {
        id_usuario: usuario_admin,
        id_equipo: id_equipo,                                                         //PENDIENTE MODIFICAR
        fecha_reporte: fechaFormateada,
        descripcion: descripcion,
        solucion: solucion,
        estado: estado,
        fecha_actualizacion: fechaFormateada

    }
 
    const datos = await crearIncidencia(incidencia);
 
    // Pintamos los datos
    document.getElementById('p1').innerHTML ="Insertada incidencia: \n " + JSON.stringify(incidencia);
});
