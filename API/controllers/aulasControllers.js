const db = require("../database/db"); //No requiere extension js

//Funcion para obtener aulas
const getAulas = (req, res) => {
  //localhost:3000/aulas
  db.getConnection((err, connection) => {
    if (err) {
      console.error("Error en la conexion", err);
    } else {
      connection.query("SELECT * FROM aulas", (err, resultados) => {
        if (err) {
          console.error("Error al obtener los datos", err);
        } else {
          res.json(resultados);
        }
      });
      connection.release();
    }
  });
};

const getAulaById = (req, res) => {
  //http://localhost:3000/aulas/registro/3
  const id_aula = req.params.id;

  // Consulta a la base de datos para obtener el registro por id_aula
  db.getConnection((err, connection) => {
    if (err) {
      console.error("Error en la conexion", err);
    } else {
      connection.query(
        "SELECT * FROM aulas WHERE id_aula = ?",
        [id_aula],
        (err, resultados) => {
          if (err) {
            console.error(
              "Error al obtener el registro desde la base de datos:",
              err
            );
            res.status(500).json({ error: "Error interno del servidor" });
          } else {
            // Verifica si se encontró un registro
            if (resultados.length > 0) {
              res.json(resultados[0]); // Devuelve el primer resultado encontrado (debería ser único)
            } else {
              res.status(404).json({ error: "Registro no encontrado" });
            }
          }
          connection.release();
        }
      );
    }
  });
};

//Funcion insertar aulas
const crearAula = (req, res) => {
  db.getConnection((err, connection) => {
    if (err) {
      console.error("Error en la conexion", err);
    } else {
      const { num_aula, descripcion } = req.body;
      connection.query(
        "INSERT INTO aulas (num_aula, descripcion) VALUES (?,?)",
        [num_aula, descripcion],
        (err, resultado) => {
          if (err) {
            console.error("Error al guardar los datos", err);
            res.status(500).json({ error: "Error interno en el servidor" });
          } else {
            res.json({
              recibido: true,
              num_aula,
              descripcion,
              id: resultado.insertid,
            });
          }
        }
      );
      connection.release();
    }
  });
};

//modificar aula
const putAula = (req, res) => {
  db.getConnection((err, connection) => {
    if (err) {
      console.error("Error en la conexion", err);
    } else {
      const id_aula = req.params.id;
      const { num_aula, descripcion } = req.body;
      const sql =
        "UPDATE aulas SET num_aula = ?, descripcion = ? WHERE id_aula = ?";
      connection.query(
        sql,
        [num_aula, descripcion, id_aula],
        (err, resultado) => {
          if (err) {
            console.error("Error al guardar los datos", err);
            res.status(500).json({ error: "Error interno en el servidor" });
          } else {
            res.json({
              recibido: true,
              num_aula,
              descripcion,
              id: resultado.id_aula,
            });
          }
        }
      );
      connection.release();
    }
  });
};

//modificar aula
const actualizarAula = (req, res) => {
  //http://localhost:3000/aulas/3
  db.getConnection((err, connection) => {
    if (err) {
      console.error("Error en la conexion", err);
    } else {
      const id_aula = req.params.id;
      const { num_aula, descripcion } = req.body;
      const updatedFields = [];
      const updatedValues = [];
      if (num_aula != undefined) {
        updatedValues.push(num_aula);
        updatedFields.push("num_aula =?");
      }
      if (descripcion != undefined) {
        updatedValues.push(descripcion);
        updatedFields.push("descripcion =?");
      }

      const sql = `UPDATE aulas SET ${updatedFields.join(
        ", "
      )} WHERE id_aula =?`;
      const queryValues = [...updatedValues, id_aula];

      connection.query(sql, queryValues, (err, resultado) => {
        if (err) {
          console.error("Error al guardar los datos", err);
        } else {
          res.json({
            recibido: true,
            num_aula,
            descripcion,
            id: resultado.id_aula,
          });
        }
      });
      connection.release();
    }
  });
};

//borrar aula
const deleteAula = (req, res) => {
  db.getConnection((err, connection) => {
    if (err) {
      console.error("Error en la conexion", err);
    } else {
      const id_aula = req.params.id;
      connection.query(
        "DELETE FROM aulas WHERE id_aula = ?",
        [id_aula],
        (err, resultado) => {
          if (err) {
            console.error("Error al eliminar de la base de datos", err);
            res.status(500).json({ error: "Error interno en el servidor" });
          } else {
            //Verificamos si se encontro un registro
            if (resultado.affectedRows > 0) {
              res.json({
                mensaje: `Registro con id ${id_aula} se eliminó correctamente.`,
              });
            } else {
              res
                .status(404)
                .json({
                  error: `No se encontró el registro con id ${id_aula}.`,
                });
            }
          }
          connection.release();
        }
      );
    }
  });
};

module.exports = {
  getAulas,
  crearAula,
  getAulaById,
  putAula,
  actualizarAula,
  deleteAula,
};
