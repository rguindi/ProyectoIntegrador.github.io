const dirIP_api = '127.0.0.1'; // O asignar el valor que necesitas
const PUERTO_EXPRESS = 3000; // O asignar el valor que necesitas
const url=`http://${dirIP_api}:${PUERTO_EXPRESS}`;
const selectAula = document.getElementById('aula');
const selectCategoria = document.getElementById('categoria');

//FUNCIONES PARA RELLENAR LAS AULAS
    
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

  //FUNCIONES PARA RELLENAR LAS CATEGORIAS
   

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
