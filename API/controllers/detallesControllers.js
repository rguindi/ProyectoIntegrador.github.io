const db = require ('../database/db'); //No requiere extension js

//Funcion para obtener detalles
const getDetalles = (req,res)=>{         //localhost:3000/detalles
    db.getConnection((err, connection) => {
        if (err) {
          console.error("Error en la conexion", err);
        } else {
    connection.query('SELECT * FROM detallesordenador', (err, resultados)=>{
        if(err){
            console.error('Error al obtener los datos', err);
        }else{
            res.json(resultados);
        }
    }
  );
  connection.release();
}
});
};


const getDetalleById = (req, res) => { //http://localhost:3000/detalles/registro/3
    db.getConnection((err, connection) => {
        if (err) {
          console.error("Error en la conexion", err);
        } else {
    const id_detalle = req.params.id;
 
    // Consulta a la base de datos para obtener el registro por ID
    connection.query('SELECT * FROM detallesordenador WHERE id_detalle = ?', [id_detalle], (err, resultados) => {
      if (err) {
        console.error('Error al obtener el registro desde la base de datos:', err);
        res.status(500).json({ error: 'Error interno del servidor' });
      } else {
        // Verifica si se encontró un registro
        if (resultados.length > 0) {
          res.json(resultados[0]); // Devuelve el primer resultado encontrado (debería ser único)
        } else {
          res.status(404).json({ error: 'Registro no encontrado' });
        }
    }
    connection.release();
  }
);
}
});
};

//Funcion insertar detalles
const crearDetalle = (req,res)=>{
    db.getConnection((err, connection) => {
        if (err) {
          console.error("Error en la conexion", err);
        } else {
const {id_equipo, procesador, memoria_ram, disco_duro, tarjeta_grafica, sistema_operativo, licencia, otros_detalles, usuario_admin, password_admin} = req.body;
connection.query( 'INSERT INTO detallesordenador (id_equipo, procesador, memoria_ram, disco_duro, tarjeta_grafica, sistema_operativo, licencia, otros_detalles, usuario_admin, password_admin) VALUES (?,?, ?, ?, ?, ?, ?, ?, ?, ?)',[id_equipo, procesador, memoria_ram, disco_duro, tarjeta_grafica, sistema_operativo, licencia, otros_detalles, usuario_admin, password_admin],(err,resultado)=>{
    if(err){
        console.error('Error al guardar los datos', err);
        res.status(500).json({error:'Error interno en el servidor'});
    } else{
        res.json({recibido:true, id_equipo, procesador, memoria_ram, disco_duro, tarjeta_grafica, sistema_operativo, licencia, otros_detalles, usuario_admin, password_admin
        });
    }
  }
);
connection.release();
}
});
};

//modificar ciudad
const putDetalle = (req,res)=>{
    db.getConnection((err, connection) => {
        if (err) {
          console.error("Error en la conexion", err);
        } else {
    const id_detalle = req.params.id;
    const {id_equipo, procesador, memoria_ram, disco_duro, tarjeta_grafica, sistema_operativo, licencia, otros_detalles, usuario_admin, password_admin} = req.body;
    const sql = 'UPDATE detallesordenador SET id_equipo =?, procesador=?, memoria_ram=?, disco_duro=?, tarjeta_grafica=?, sistema_operativo=?, licencia=?, otros_detalles=?, usuario_admin=?, password_admin = ? WHERE id_detalle = ?';
    connection.query(sql, [id_equipo, procesador, memoria_ram, disco_duro, tarjeta_grafica, sistema_operativo, licencia, otros_detalles, usuario_admin, password_admin, id_detalle], (err, resultado)=>{
        if(err){
            console.error('Error al guardar los datos', err);
            res.status(500).json({error:'Error interno en el servidor'});
        } else{
            res.json({recibido:true, id_equipo, procesador, memoria_ram, disco_duro, tarjeta_grafica, sistema_operativo, licencia, otros_detalles, usuario_admin, password_admin, id: resultado.id_detalle });
        }
      }
    );
    connection.release();
    }
    });
    };


//modificar ciudad
const actualizarDetalle = (req,res)=>{  //http://localhost:3000/detalles/3
    db.getConnection((err, connection) => {
        if (err) {
          console.error("Error en la conexion", err);
        } else {
    const id_detalle = req.params.id;
    const {id_equipo, procesador, memoria_ram, disco_duro, tarjeta_grafica, sistema_operativo, licencia, otros_detalles, usuario_admin, password_admin} = req.body;
    const updatedFields = [];
    const updatedValues = [];
    if (id_equipo!=undefined) {
        updatedValues.push(id_equipo);
        updatedFields.push('id_equipo =?');
    }
    if (procesador!=undefined) {
        updatedValues.push(procesador);
        updatedFields.push('procesador =?');
    }
    if (memoria_ram!=undefined) {
        updatedValues.push(memoria_ram);
        updatedFields.push('memoria_ram =?');
    }
    if (disco_duro!=undefined) {
        updatedValues.push(disco_duro);
        updatedFields.push('disco_duro =?');
    }
    if (tarjeta_grafica!=undefined) {
        updatedValues.push(tarjeta_grafica);
        updatedFields.push('tarjeta_grafica =?');
    }
    if (sistema_operativo!=undefined) {
        updatedValues.push(sistema_operativo);
        updatedFields.push('sistema_operativo =?');
    }
    if (licencia!=undefined) {
        updatedValues.push(licencia);
        updatedFields.push('licencia =?');
    }
    if (otros_detalles!=undefined) {
        updatedValues.push(otros_detalles);
        updatedFields.push('otros_detalles =?');
    }
    if (usuario_admin!=undefined) {
        updatedValues.push(usuario_admin);
        updatedFields.push('usuario_admin =?');
    }
    if (password_admin!=undefined) {
        updatedValues.push(password_admin);
        updatedFields.push('password_admin =?');
    }


    const sql = `UPDATE detalles SET ${updatedFields.join(', ')} WHERE id_detalle =?`;
    const queryValues = [...updatedValues, id_detalle];

    connection.query(sql, queryValues, (err, resultado)=>{
        if(err){
            console.error('Error al guardar los datos', err);
        } else{
            res.json({recibido:true, id_equipo, procesador, memoria_ram, disco_duro, tarjeta_grafica, sistema_operativo, licencia, otros_detalles, usuario_admin, password_admin, id: resultado.id_detalle
            });
        }
      }
    );
    connection.release();
    }
    });
    };


//borrar ciudad
const deleteDetalle = (req,res)=>{
    db.getConnection((err, connection) => {
        if (err) {
          console.error("Error en la conexion", err);
        } else {
    const id_detalle = req.params.id;
    connection.query('DELETE FROM detalles WHERE id_detalle = ?', [id_detalle], (err, resultado)=>{
        if(err){
            console.error('Error al eliminar de la base de datos', err);
            res.status(500).json({error:'Error interno en el servidor'});
        } else{
            //Verificamos si se encontro un registro
            if(resultado.affectedRows>0){
                res.json({mensaje: `Registro con id ${id_detalle} se eliminó correctamente.`});
            }else{
                res.status(404).json({error:  `No se encontró el registro con id ${id_detalle}.`});
            }
        }
        connection.release();
      }
    );
  }
});
};




module.exports={
    getDetalles,
    crearDetalle,
    getDetalleById,
    putDetalle,
    actualizarDetalle,
    deleteDetalle,
};