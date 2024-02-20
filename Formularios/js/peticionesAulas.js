// Peticion POST con ASYNC/AWAIT
const dirIP_api = '127.0.0.1'; // O asignar el valor que necesitas
const PUERTO_EXPRESS = 3000; // O asignar el valor que necesitas
 
async function crearAula(nuevaAula) {
    const url = `http://${dirIP_api}:${PUERTO_EXPRESS}/aulas/`;
    const datoPromesa = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(nuevaAula),
        headers: {
            'Content-Type': 'application/json'
        }
    });
 
    console.log(datoPromesa);
    // Convertimos a JSON, ya que el resultado de datoPromesa es una promesa que no se puede visualizar
    return await datoPromesa.json();;
}
 
document.getElementById('FormularioAulas').addEventListener('submit', async (event) => {
    event.preventDefault();
 
    // Insertamos los valores de los campos input en un objeto nuevaAula
    const nuevaAula = {
        num_aula: document.getElementById('num_aula').value,
        descripcion: document.getElementById('descripcion').value
    }
 
    const datos = await crearAula(nuevaAula);
 
    // Pintamos los datos
    document.getElementById('p1').innerHTML ="Insertada Aula: " + datos.num_aula + ": " + datos.descripcion;
});
