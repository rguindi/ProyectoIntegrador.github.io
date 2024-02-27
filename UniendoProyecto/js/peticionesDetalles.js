// Peticion POST con ASYNC/AWAIT
const dirIP_api = '127.0.0.1'; // O asignar el valor que necesitas
const PUERTO_EXPRESS = 3000; // O asignar el valor que necesitas
const url=`http://${dirIP_api}:${PUERTO_EXPRESS}`;
 
async function crearDetalles(detalles) {
    const url = `http://${dirIP_api}:${PUERTO_EXPRESS}/detalles`;
    const datoPromesa = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(detalles),
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


document.getElementById('formularioDetallesOrdenador').addEventListener('submit', async (event) => {
    event.preventDefault();

    if (!validarDetallesOrdenador()) {
        return;
    }

    console.log("id_equipo: " + localStorage.getItem('id_equipo'));

    const datosForm = new FormData(document.getElementById('formularioDetallesOrdenador'));
    const id_equipo = localStorage.getItem('id_equipo');

    let usuario = await getUsuario();
    let usuario_admin = usuario['usuario'].id_usuario;
    let password_admin = "No registrado";

    const detalles = {
        id_equipo: id_equipo,
        procesador: datosForm.get('procesador'),
        memoria_ram: datosForm.get('memoria_ram'),
        disco_duro: datosForm.get('disco_duro'),
        tarjeta_grafica: datosForm.get('tarjeta_grafica'),
        sistema_operativo: datosForm.get('sistema_operativo'),
        licencia: datosForm.get('licencia'),
        otros_detalles: datosForm.get('otros_detalles'),
        usuario_admin: usuario_admin,
        password_admin: password_admin
    }

    const datos = await crearDetalles(detalles);

    // Pintamos los datos
    document.getElementById('p1').innerHTML ="Insertados Detalles: \n " + JSON.stringify(detalles);

    localStorage.removeItem('id_equipo');

 
    // // Insertamos los valores de los campos input en un objeto nuevaAula

    // //obtenemos el ultimo id de equipo insertado:
    // const response = await fetch(url + '/equipos/ultimo');
    //     const equipo = await response.json();
    //     let id = equipo.id;
    
    // let procesador = document.getElementById('procesador').value;
    // if (procesador == "") procesador = null;
    // let memoria_ram = document.getElementById('memoria_ram').value;
    // if (memoria_ram == "") memoria_ram = null;
    // let disco_duro = document.getElementById('disco_duro').value;
    // if (disco_duro == "") disco_duro = null;
    // let tarjeta_grafica = document.getElementById('tarjeta_grafica').value;
    // if (tarjeta_grafica == "") tarjeta_grafica = null;
    // let sistema_operativo = document.getElementById('sistema_operativo').value;
    // if (sistema_operativo == "") sistema_operativo = null;
    // let licencia = document.getElementById('licencia').value;
    // if (licencia == "") licencia = null;
    // let otros_detalles = document.getElementById('otros_detalles').value;
    // if (otros_detalles == "") otros_detalles = null;
    // let usuario = await getUsuario();
    // let usuario_admin = usuario['usuario'].id_usuario; 
    // let password_admin = "No registrado";

    // const detalles = {
    //     id_equipo: id,                                                         //PENDIENTE MODIFICAR
    //     procesador: procesador,
    //     memoria_ram: memoria_ram,
    //     disco_duro: disco_duro,
    //     tarjeta_grafica: tarjeta_grafica,
    //     sistema_operativo: sistema_operativo,
    //     licencia: licencia,
    //     otros_detalles: otros_detalles,
    //     usuario_admin: usuario_admin,
    //     password_admin: password_admin

    // }
 
    // const datos = await crearDetalles(detalles);
 
    // // Pintamos los datos
    // document.getElementById('p1').innerHTML ="Insertados Detalles: \n " + JSON.stringify(detalles);
});
