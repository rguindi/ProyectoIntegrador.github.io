const dirIP_api = '127.0.0.1'; // O asignar el valor que necesitas
const PUERTO_EXPRESS = 3000; // O asignar el valor que necesitas
const url=`http://${dirIP_api}:${PUERTO_EXPRESS}`;
const selectAula = document.getElementById('id_aula');
const selectCategoria = document.getElementById('id_categoria');




//FUNCION PARA Auto-RELLENAR LAS AULAS   
async function getData(isAula) { 
    const response = await fetch(url + '/aulas/') 
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
    const response = await fetch(url + '/usuarios/user');
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





//FUNCION PARA INSERTAR LOS DATOS CON FORMDATA

document.getElementById('formularioEquipos').addEventListener('submit', async (event) => {
  event.preventDefault();
  const datosForm = new FormData(document.getElementById('formularioEquipos'));
  let usuario = await getUsuario();
  datosForm.append('id_usuario', usuario.rol);

let qrCode = await qr_code();
  //  datosForm.append('qr_code', datosForm.get('imagen_producto'));
  datosForm.append('qr_code', qrCode);
  
    fetch(url + '/equipos/', {
      method: 'POST',
      body: datosForm
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`Error ${response.status} de la BBDD: ${response.statusText}`);
      }
      console.log('Data inserted successfully');
    })
    .catch(error => {
      console.log('Error inserting data:', error);
    });
  });
  

