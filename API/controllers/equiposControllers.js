const db = require("../database/db"); //No requiere extension js


// Funcion para obtener equipo
const getEquipos = (req, res) => {
  //localhost:3000/equipo
  db.getConnection((err, connection) => {
    if (err) {
      console.error("Error en la conexion", err);
    } else {
      connection.query(
        "SELECT * FROM equiposelectronicos",
        (err, resultados) => {
          if (err) {
            console.error("Error al obtener los datos", err);
          } else {
            res.json(resultados);
          }
        }
      );
      connection.release();
    }
  });
};

const getEquipoById = (req, res) => {
  //http://localhost:3000/equipo/3
  db.getConnection((err, connection) => {
    if (err) {
      console.error("Error en la conexion", err);
    } else {
      const idRegistro = req.params.id;

      // Consulta a la base de datos para obtener el registro por ID
      connection.query(
        "SELECT * FROM equiposelectronicos WHERE id_equipo = ?",
        [idRegistro],
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

 //La imagen del producto se inserta como file y se convierte a blob en mysql,.
 //El QR entra como String por ser generado asi por el script. Su valor es el contenido del atributo src en un elemento img

 const crearEquipo = (req, res) => {            
  db.getConnection((err, connection) => {
    if (err) {
      console.error("Error en la conexion", err);
      res.status(500).json({ error: "Error interno en el servidor" });
      return;
    }

    const {
      id_usuario,
      nombre,
      descripcion,
      marca,
      modelo,
      numero_de_serie,
      estado,
      id_aula,
      id_categoria,
      qr_code,
      ano_adquisicion,
      ultima_actualizacion,
      codigo,
    } = req.body;

    // Obtener los archivos adjuntos
    let imagen_producto = req.files[0];
    console.log(req.files);
    // const qr_code = req.files[1];

    // Consulta SQL para insertar el equipo con archivos BLOB
    const query =
      "INSERT INTO equiposelectronicos (id_usuario, nombre, descripcion, marca, modelo, numero_de_serie, estado, id_aula, id_categoria, imagen_producto, qr_code, ano_adquisicion, ultima_actualizacion, codigo) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
    if (imagen_producto === undefined) {
      imagen_producto = "none";
    }
    // Ejecutar la consulta con los archivos BLOB como parámetros
    connection.query(
      query,
      [
        id_usuario,
        nombre,
        descripcion,
        marca,
        modelo,
        numero_de_serie,
        estado,
        id_aula,
        id_categoria,
        imagen_producto.buffer, // Acceder al buffer del archivo en memoria
        qr_code, //.buffer, // Acceder al buffer del archivo en memoria
        ano_adquisicion,
        ultima_actualizacion,
        codigo,
      ],
      (err, resultado) => {
        if (err) {
          console.error("Error al guardar los datos", err);
          res.status(500).json({ error: "Error interno en el servidor" });
        } else {
          res.json({
            recibido: true,
            id_usuario,
            nombre,
            descripcion,
            marca,
            modelo,
            numero_de_serie,
            estado,
            id_aula,
            id_categoria,
            imagen_producto: imagen_producto.originalname,
            qr_code, // qr_code.originalname,
            ano_adquisicion,
            ultima_actualizacion,
            codigo,
            id: resultado.insertId,
          });
        }

        // Liberar la conexión después de ejecutar la consulta
        connection.release();
      }
    );
  });
};

//devolver el ultimo Id insertado para añadir al QR
const getUltimoId = (req, res) => {
  db.getConnection((err, connection) => {
    if (err) {
      console.error("Error en la conexion", err);
      res.status(500).json({ error: "Error interno en el servidor" });
      return;
    }
    connection.query("SELECT MAX(id_equipo) as id FROM equiposelectronicos", (err, resultados) => {
      if (err) {
        console.error("Error al obtener los datos", err);
      } else {
        res.json(resultados[0]);
      }
      connection.release();
    });
  }
  );
};


//modificar equipo
const putEquipo = (req, res) => {
  db.getConnection((err, connection) => {
    if (err) {
      console.error("Error en la conexion", err);
    } else {
      const idRegistro = req.params.id;
      const {
        id_usuario,
        nombre,
        descripcion,
        marca,
        modelo,
        numero_de_serie,
        estado,
        id_aula,
        id_categoria,
        ano_adquisicion,
        ultima_actualizacion,
        codigo,
      } = req.body;
      // Obtener los archivos adjuntos
      const imagen_producto = req.files[0];
      const qr_code = req.files[1];
      const sql =
        "UPDATE equiposelectronicos SET id_usuario =?, nombre=?, descripcion=?, marca=?, modelo=?, numero_de_serie=?, estado=?, id_aula=?, id_categoria=?, imagen_producto=?, qr_code=?, ano_adquisicion=?, ultima_actualizacion=?, codigo=? WHERE id_equipo = ?";
      connection.query(
        sql,
        [
          id_usuario,
          nombre,
          descripcion,
          marca,
          modelo,
          numero_de_serie,
          estado,
          id_aula,
          id_categoria,
          imagen_producto,
          qr_code,
          ano_adquisicion,
          ultima_actualizacion,
          codigo,
          idRegistro,
        ],
        (err, resultado) => {
          if (err) {
            console.error("Error al guardar los datos", err);
            res.status(500).json({ error: "Error interno en el servidor" });
          } else {
            res.json({
              recibido: true,
              id_usuario,
              nombre,
              descripcion,
              marca,
              modelo,
              numero_de_serie,
              estado,
              id_aula,
              id_categoria,
              imagen_producto,
              qr_code,
              ano_adquisicion,
              ultima_actualizacion,
              codigo,
              id: resultado.idRegistro,
            });
          }
        }
      );
      connection.release();
    }
  });
};
//modificar equipo
const actualizarEquipo = (req, res) => {
  //http://localhost:3000/equipo/3
  db.getConnection((err, connection) => {
    if (err) {
      console.error("Error en la conexion", err);
    } else {
      const idRegistro = req.params.id;
      const {
        id_usuario,
        nombre,
        descripcion,
        marca,
        modelo,
        numero_de_serie,
        estado,
        id_aula,
        id_categoria,
        ano_adquisicion,
        ultima_actualizacion,
        codigo,
      } = req.body;
      // Obtener los archivos adjuntos
      const imagen_producto = req.files[0];
      const qr_code = req.files[1];
      const updatedFields = [];
      const updatedValues = [];
      if (id_usuario != undefined) {
        updatedValues.push(id_usuario);
        updatedFields.push("id_usuario =?");
      }
      if (nombre != undefined) {
        updatedValues.push(nombre);
        updatedFields.push("nombre =?");
      }
      if (descripcion != undefined) {
        updatedValues.push(descripcion);
        updatedFields.push("descripcion =?");
      }
      if (marca != undefined) {
        updatedValues.push(marca);
        updatedFields.push("marca =?");
      }
      if (modelo != undefined) {
        updatedValues.push(modelo);
        updatedFields.push("modelo =?");
      }
      if (numero_de_serie != undefined) {
        updatedValues.push(numero_de_serie);
        updatedFields.push("numero_de_serie =?");
      }
      if (estado != undefined) {
        updatedValues.push(estado);
        updatedFields.push("estado =?");
      }
      if (id_aula != undefined) {
        updatedValues.push(id_aula);
        updatedFields.push("id_aula =?");
      }
      if (id_categoria != undefined) {
        updatedValues.push(id_categoria);
        updatedFields.push("id_categoria =?");
      }
      if (imagen_producto != undefined) {
        updatedValues.push(imagen_producto);
        updatedFields.push("imagen_producto =?");
      }
      if (qr_code != undefined) {
        updatedValues.push(qr_code);
        updatedFields.push("qr_code =?");
      }
      if (ano_adquisicion != undefined) {
        updatedValues.push(ano_adquisicion);
        updatedFields.push("ano_adquisicion =?");
      }
      if (ultima_actualizacion != undefined) {
        updatedValues.push(ultima_actualizacion);
        updatedFields.push("ultima_actualizacion =?");
      }
      if (codigo != undefined) {
        updatedValues.push(codigo);
        updatedFields.push("codigo =?");
      }

      const sql = `UPDATE equiposelectronicos SET ${updatedFields.join(
        ", "
      )} WHERE id_equipo =?`;
      const queryValues = [...updatedValues, idRegistro];

      connection.query(sql, queryValues, (err, resultado) => {
        if (err) {
          console.error("Error al guardar los datos", err);
        } else {
          res.json({
            recibido: true,
            id_usuario,
            nombre,
            descripcion,
            marca,
            modelo,
            numero_de_serie,
            estado,
            id_aula,
            id_categoria,
            imagen_producto,
            qr_code,
            ano_adquisicion,
            ultima_actualizacion,
            codigo,
            id: resultado.idRegistro,
          });
        }
      });
      connection.release();
    }
  });
};

//borrar equipo
const deleteEquipo = (req, res) => {
  db.getConnection((err, connection) => {
    if (err) {
      console.error("Error en la conexion", err);
    } else {
      const idRegistro = req.params.id;
      connection.query(
        "DELETE FROM equiposelectronicos WHERE id_equipo = ?",
        [idRegistro],
        (err, resultado) => {
          if (err) {
            console.error("Error al eliminar de la base de datos", err);
            res.status(500).json({ error: "Error interno en el servidor" });
          } else {
            //Verificamos si se encontro un registro
            if (resultado.affectedRows > 0) {
              res.json({
                mensaje: `Registro con id ${idRegistro} se eliminó correctamente.`,
              });
            } else {
              res.status(404).json({
                error: `No se encontró el registro con id ${idRegistro}.`,
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
  getEquipos,
  crearEquipo,
  getEquipoById,
  putEquipo,
  actualizarEquipo,
  deleteEquipo,
  getUltimoId,
};
