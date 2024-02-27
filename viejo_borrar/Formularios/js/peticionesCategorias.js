// Peticion POST con ASYNC/AWAIT
const dirIP_api = '127.0.0.1'; // O asignar el valor que necesitas
const PUERTO_EXPRESS = 3000; // O asignar el valor que necesitas
 
async function crearCategoria(nuevaCategoria) {
    const url = `http://${dirIP_api}:${PUERTO_EXPRESS}/categorias/`;
    const datoPromesa = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(nuevaCategoria),
        headers: {
            'Content-Type': 'application/json'
        }
    });
 
    console.log(datoPromesa);
    // Convertimos a JSON, ya que el resultado de datoPromesa es una promesa que no se puede visualizar
    return await datoPromesa.json();;
}
 
document.getElementById('FormularioCategorias').addEventListener('submit', async (event) => {
    event.preventDefault();
 
    // Insertamos los valores de los campos input en un objeto nuevaCategoria
    const nuevaCategoria = {
        nombre: document.getElementById('nombre').value,
    
    }
 
    const datos = await crearCategoria(nuevaCategoria);
 
    // Pintamos los datos
    document.getElementById('p1').innerHTML ="Insertada Categoria: " + datos.nombre ;
});
