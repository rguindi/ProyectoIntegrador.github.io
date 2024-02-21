const db = require('../Database/db'); //No requiere extension js

//Funcion para obtener incidencias
const getIncidencias = (req, res) => {         //localhost:3000/incidencias
  db.getConnection((err, connection) => {
    if (err) {
      console.error("Error en la conexion", err);
    } else {
      connection.query('SELECT * FROM incidencias', (err, resultados) => {
        if (err) {
          console.error('Error al obtener los datos', err);
        } else {
          res.json(resultados);
        }
      });
      connection.release();
    }
  });
};

const getIncidenciaById = (req, res) => { //http://localhost:3000/incidencias/registro/3
  db.getConnection((err, connection) => {
    if (err) {
      console.error("Error en la conexion", err);
    } else {
      const id_incidencia = req.params.id;

      // Consulta a la base de datos para obtener el registro por ID
      connection.query('SELECT * FROM incidencias WHERE id_incidencia = ?', [id_incidencia], (err, resultados) => {
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

//Funcion insertar incidencias
const crearIncidencia = (req, res) => {
  db.getConnection((err, connection) => {
    if (err) {
      console.error("Error en la conexion", err);
    } else {
      const { id_usuario, id_equipo, fecha_reporte, descripcion, solucion, estado, fecha_actualizacion } = req.body;
      connection.query('INSERT INTO incidencias (id_usuario, id_equipo, fecha_reporte, descripcion, solucion, estado, fecha_actualizacion) VALUES (?,?,?,?,?,?,?)', [id_usuario, id_equipo, fecha_reporte, descripcion, estado, fecha_actualizacion], (err, resultado) => {
        if (err) {
          console.error('Error al guardar los datos', err);
          res.status(500).json({ error: 'Error interno en el servidor' });
        } else {
          res.json({
            recibido: true, id_usuario, id_equipo, fecha_reporte, descripcion, solucion, estado, fecha_actualizacion, id: resultado.insertId
          });
        }
      }
      );
      connection.release();
    }
  });
};

//modificar incidencia
const putIncidencia = (req, res) => {
  db.getConnection((err, connection) => {
    if (err) {
      console.error("Error en la conexion", err);
    } else {
      const id_incidencia = req.params.id;
      const { id_usuario, id_equipo, fecha_reporte, descripcion, solucion, estado, fecha_actualizacion } = req.body;
      const sql = 'UPDATE incidencias SET id_usuario =?, id_equipo=?, fecha_reporte=?, descripcion=?, solucion=? ,estado=?, fecha_actualizacion=? WHERE id_incidencia = ?';
      connection.query(sql, [id_usuario, id_equipo, fecha_reporte, descripcion, solucion, estado, fecha_actualizacion, id_incidencia], (err, resultado) => {
        if (err) {
          console.error('Error al guardar los datos', err);
          res.status(500).json({ error: 'Error interno en el servidor' });
        } else {
          res.json({
            recibido: true, id_usuario, id_equipo, fecha_reporte, descripcion, estado, fecha_actualizacion, id: resultado.id_incidencia
          });
        }
      }
      );
      connection.release();
    }
  });
};


//modificar incidencia
const actualizarIncidencia = (req, res) => {  //http://localhost:3000/incidencias/3
  db.getConnection((err, connection) => {
    if (err) {
      console.error("Error en la conexion", err);
    } else {
      const id_incidencia = req.params.id;
      const { id_usuario, id_equipo, fecha_reporte, descripcion, solucion, estado, fecha_actualizacion } = req.body;
      const updatedFields = [];
      const updatedValues = [];
      if (id_usuario != undefined) {
        updatedValues.push(id_usuario);
        updatedFields.push('id_usuario =?');
      }
      if (id_equipo != undefined) {
        updatedValues.push(id_equipo);
        updatedFields.push('id_equipo =?');
      }
      if (fecha_reporte != undefined) {
        updatedValues.push(fecha_reporte);
        updatedFields.push('fecha_reporte =?');
      }
      if (descripcion != undefined) {
        updatedValues.push(descripcion);
        updatedFields.push('descripcion =?');
      }
      if (solucion != undefined) {
        updatedValues.push(solucion);
        updatedFields.push('solucion =?');
      }
      if (estado != undefined) {
        updatedValues.push(estado);
        updatedFields.push('estado =?');
      }
      if (fecha_actualizacion != undefined) {
        updatedValues.push(fecha_actualizacion);
        updatedFields.push('fecha_actualizacion =?');
      }


      const sql = `UPDATE incidencias SET ${updatedFields.join(', ')} WHERE id_incidencia =?`;
      const queryValues = [...updatedValues, id_incidencia];

      connection.query(sql, queryValues, (err, resultado) => {
        if (err) {
          console.error('Error al guardar los datos', err);
        } else {
          res.json({ recibido: true, id_usuario, id_equipo, fecha_reporte, descripcion, solucion, estado, fecha_actualizacion, id: resultado.id_incidencia });
        }
      }
      );
      connection.release();
    }
  });
};

//borrar incidencia
const deleteIncidencia = (req, res) => {
  db.getConnection((err, connection) => {
    if (err) {
      console.error("Error en la conexion", err);
    } else {
      const id_incidencia = req.params.id;
      connection.query('DELETE FROM incidencias WHERE id_incidencia = ?', [id_incidencia], (err, resultado) => {
        if (err) {
          console.error('Error al eliminar de la base de datos', err);
          res.status(500).json({ error: 'Error interno en el servidor' });
        } else {
          //Verificamos si se encontro un registro
          if (resultado.affectedRows > 0) {
            res.json({ mensaje: `Registro con id ${id_incidencia} se eliminó correctamente.` });
          } else {
            res.status(404).json({ error: `No se encontró el registro con id ${id_incidencia}.` });
          }
        }
        connection.release();
      }
      );
    }
  });
};





module.exports = {
  getIncidencias,
  crearIncidencia,
  getIncidenciaById,
  putIncidencia,
  actualizarIncidencia,
  deleteIncidencia
};