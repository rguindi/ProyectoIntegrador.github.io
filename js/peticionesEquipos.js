const dirIP_api = '127.0.0.1'; // O asignar el valor que necesitas
const PUERTO_EXPRESS = 3000; // O asignar el valor que necesitas
const url=`http://${dirIP_api}:${PUERTO_EXPRESS}`;
const selectAula = document.getElementById('id_aula');
const selectCategoria = document.getElementById('id_categoria');


console.log("");

//FUNCION PARA Auto-RELLENAR LAS AULAS   

async function getData(isAula) { 
    const response = await fetch(url + '/aulas/') 
    try {
      if (!response.ok) { 
        throw `Error ${response.status} de la BBDD: ${response.statusText}` 
      } 
      const datos = await response.json() 
      console.log(datos);
     
   
      return datos
      
    } catch (error) {
      console.log("Fallo fetch");
      throw error;
      
    }
  }

  //FUNCION PARA AUTO-RELLENAR LAS CATEGORIAS
async function getDataCategoria(isCategoria) {
    const response = await fetch(url + '/categorias/')
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

//Rellenamos categorias y aulas al cargar la ventana
window.onload = async function() {
    await getDataCategoria()
   .then(datos=>{
    datos.forEach(element => {
        let option = document.createElement('option');
        option.value = element.id_categoria;
        option.text = element.nombre;
        selectCategoria.appendChild(option);
    });
    
   }).catch(error=>{
    console.log("mal"+error)
   })

   await getData()
   .then(datos=>{
    datos.forEach(element => {
        let option = document.createElement('option');
        option.value = element.id_aula;
        option.text = element.num_aula + " " + element.descripcion;
        selectAula.appendChild(option);
    });
    
   }).catch(error=>{
    console.log("mal"+error)
   });
   
}

//Funcion para obtener el id_usuario de la session:
async function getUsuario() { 
  try {
    const response = await fetch(url + '/usuarios/user', {
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

// para comprobar que la session funciona
// getUsuario();


//FUNCION PARA INSERTAR LOS DATOS CON FORMDATA

document.getElementById('formularioEquipos').addEventListener('submit', async (event) => {
  event.preventDefault();
  if (!validarEquipos()) {
    return;
  }
  
  const datosForm = new FormData(document.getElementById('formularioEquipos'));
  let usuario = await getUsuario();
  datosForm.append('id_usuario', usuario['usuario'].id_usuario);

  let qrCode = await qr_code();

  datosForm.append('qr_code', qrCode);
  let codigo = document.getElementById('codigo').value;
  datosForm.append('codigo', codigo); 


  // Obtener la fecha actual
  const fechaActual = new Date();

  // Obtener el año, mes y día
  const year = fechaActual.getFullYear();
  const month = String(fechaActual.getMonth() + 1).padStart(2, '0'); // Se agrega 1 porque los meses se indexan desde 0
  const day = String(fechaActual.getDate()).padStart(2, '0');

  // Crear el formato string YYYY-MM-DD
  const fechaFormateada = `${year}-${month}-${day}`;

  datosForm.append('ultima_actualizacion', fechaFormateada);
  // datosForm.delete('ordenador');
  
    fetch(url + '/equipos/', {
      method: 'POST',
      body: datosForm
    })

    .then(response => {
      if (!response.ok) {
        throw new Error(`Error ${response.status} de la BBDD: ${response.statusText}`);
      }

      return response.json();
    })

    .then(data => {

      console.log('Data inserted successfully');
      document.getElementById('respuesta').innerHTML = "Equipo insertado correctamente. ";

      // Guarda el idEquipo en localStorage
      const id_equipo = data.id;
      localStorage.setItem('id_equipo', id_equipo);

      if(datosForm.has('es_ordenador') && datosForm.get('es_ordenador') === 'on'){
        document.getElementById('respuesta').innerHTML = "Equipo insertado correctamente. Redirigiendo a detalles del ordenador... ";

        setTimeout(function() {
          window.location.href = "./registrarOrdenador.html";
        }, 3000);

        return;
      
      } else {
        document.getElementById('respuesta').innerHTML = "Equipo insertado correctamente. Redirigiendo a detalles de equipo... ";

        setTimeout(function() {
          window.location.href = "./verEquipos_incidencias.html";
        }, 3000);
      }

    })
    .catch(error => {
      console.log('Error inserting data:', error);
    });
  });
  

