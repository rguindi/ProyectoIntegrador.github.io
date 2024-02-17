const db = require ('../database/db'); //No requiere extension js

//Funcion para obtener incidencias
const getIncidencias = (req,res)=>{         //localhost:3000/incidencias
    db.query('SELECT * FROM incidencias', (err, resultados)=>{
        if(err){
            console.error('Error al obtener los datos', err);
        }else{
            res.json(resultados);
        }
    });

};

const getIncidenciaById = (req, res) => { //http://localhost:3000/incidencias/registro/3
    const id_incidencia = req.params.id;
 
    // Consulta a la base de datos para obtener el registro por ID
    db.query('SELECT * FROM incidencias WHERE id_incidencia = ?', [id_incidencia], (err, resultados) => {
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
    });
  };

//Funcion insertar incidencias
const crearIncidencia = (req,res)=>{
const {id_equipo, fecha_reporte, descripcion, estado, fecha_actualizacion} = req.body;
db.query( 'INSERT INTO incidencias (id_equipo, fecha_reporte, descripcion, estado, fecha_actualizacion) VALUES (?,?,?,?,?)',[id_equipo, fecha_reporte, descripcion, estado, fecha_actualizacion],(err,resultado)=>{
    if(err){
        console.error('Error al guardar los datos', err);
        res.status(500).json({error:'Error interno en el servidor'});
    } else{
        res.json({recibido:true, id_equipo, fecha_reporte, descripcion, estado, fecha_actualizacion, id: resultado.insertid})
    }
});
};


//modificar incidencia
const putIncidencia = (req,res)=>{
    const id_incidencia = req.params.id;
    const {id_equipo, fecha_reporte, descripcion, estado, fecha_actualizacion} = req.body;
    const sql = 'UPDATE incidencias SET id_equipo=?, fecha_reporte=?, descripcion=?, estado=?, fecha_actualizacion=? WHERE id_incidencia = ?';
    db.query(sql, [id_equipo, fecha_reporte, descripcion, estado, fecha_actualizacion, id_incidencia], (err, resultado)=>{
        if(err){
            console.error('Error al guardar los datos', err);
            res.status(500).json({error:'Error interno en el servidor'});
        } else{
            res.json({recibido:true, id_equipo, fecha_reporte, descripcion, estado, fecha_actualizacion, id: resultado.id_incidencia})

        }
    });
}

//modificar incidencia
const actualizarIncidencia = (req,res)=>{  //http://localhost:3000/incidencias/3
    const id_incidencia = req.params.id;
    const {id_equipo, fecha_reporte, descripcion, estado, fecha_actualizacion} = req.body;
    const updatedFields = [];
    const updatedValues = [];
    if (id_equipo!=undefined) {
        updatedValues.push(id_equipo);
        updatedFields.push('id_equipo =?');
    }
    if (fecha_reporte!=undefined) {
        updatedValues.push(fecha_reporte);
        updatedFields.push('fecha_reporte =?');
    }
    if (descripcion!=undefined) {
        updatedValues.push(descripcion);
        updatedFields.push('descripcion =?');
    }
    if (estado!=undefined) {
        updatedValues.push(estado);
        updatedFields.push('estado =?');
    }
    if (fecha_actualizacion!=undefined) {
        updatedValues.push(fecha_actualizacion);
        updatedFields.push('fecha_actualizacion =?');
    }


    const sql = `UPDATE incidencias SET ${updatedFields.join(', ')} WHERE id_incidencia =?`;
    const queryValues = [...updatedValues, id_incidencia];

    db.query(sql, queryValues, (err, resultado)=>{
        if(err){
            console.error('Error al guardar los datos', err);
        } else{
            res.json({recibido:true, id_equipo, fecha_reporte, descripcion, estado, fecha_actualizacion, id: resultado.id_incidencia})

        }
    });
}

//borrar incidencia
const deleteIncidencia = (req,res)=>{
    const id_incidencia = req.params.id;
    db.query('DELETE FROM incidencias WHERE id_incidencia = ?', [id_incidencia], (err, resultado)=>{
        if(err){
            console.error('Error al eliminar de la base de datos', err);
            res.status(500).json({error:'Error interno en el servidor'});
        } else{
            //Verificamos si se encontro un registro
            if(resultado.affectedRows>0){
                res.json({mensaje: `Registro con id ${id_incidencia} se eliminó correctamente.`});
            }else{
                res.status(404).json({error:  `No se encontró el registro con id ${id_incidencia}.`});
            }

        }
    });
}




module.exports={
    getIncidencias,
    crearIncidencia,
    getIncidenciaById,
    putIncidencia,
    actualizarIncidencia,
    deleteIncidencia
};