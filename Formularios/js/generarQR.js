document.addEventListener('DOMContentLoaded', function(event) {
    event.preventDefault();
    console.log("El DOM ha sido completamente cargado.");

    document.getElementById('formularioEquipos').addEventListener('submit', async function(event) {
        event.preventDefault(); 
        
         //GENERAMOS UN CODIGO UNICO PARA EL EQUIPO

          //Obtenemos el id y acontinuacon el nombre de la categoria los primeros 3 caracteres en mayusculas
        let categoria = document.getElementById('categoria');     
       const  datosCategoria = await getCategoriaById(categoria.value);

        let nombreCategoria = datosCategoria.nombre;
   
        console.log(datosCategoria);
        let cat = nombreCategoria.substring(0,3).toUpperCase();

        //Obtenemos la marca del equipo los primeros 3 caracteres en mayusculas
        let marca = document.getElementById('marca').value; 
        let mar = marca.substring(0,3).toUpperCase();

        //Obtenemos el modelo del equipo los primeros 3 caracteres en mayusculas
        let modelo = document.getElementById('modelo').value; 
        let mod = modelo.substring(0,3).toUpperCase();

        //Obtenemos el id autoincremental que se va a generar en la base de datos
        const response = await fetch(url + '/equipos/ultimo');
        const datos = await response.json();
        let id = datos.id;
        id = id + 1;

        //Generamos el codigo unico para el equipo
        let codigo = cat + mar + mod + id;

        
    
        
   
        var qr = qrcode(0, 'M');
        qr.addData(codigo);
        qr.make();
        
        
        // document.getElementById('codigoQR').innerHTML = qr.createImgTag(5); // 5 es el tamaño del código QR

        document.getElementById('qr_code').value = qr.createImgTag(5);
        

    });
});


async function getCategoriaById(idCategoria) {
    const response = await fetch(url + '/categorias/' + idCategoria);
    try {
        if (!response.ok) {
            throw `Error ${response.status} de la BBDD: ${response.statusText}`;
        }
        const datos = await response.json();
        return datos;
    } catch (error) {
        console.log("Fallo fetch");
        throw error;
    }
}
