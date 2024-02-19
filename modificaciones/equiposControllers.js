const db = require('../database/db');

const getEquipos = (req, res) => {
    db.getConnection((err, connection) => {
        if (err) {
            console.error("Error en la conexion", err);
        } else {
            console.log("Conexion exitosa al pool de conexiones");
            connection.query('SELECT * FROM equiposelectronicos', (queryErr, resultado) => {
                if (queryErr) {
                    console.error('Error al obtener datos desde la base de datos', err);
                    res.status(500).json({ error: 'Error interno del servidor' });
                } else {
                    res.json(resultado);
                }
            });
            connection.release();
        }
    })
};

const crearEquipo = (req, res) => {
    db.getConnection((err, connection) => {
        if (err) {
            console.error("Error en la conexion", err);
        } else {
            console.log("Conexion exitosa al pool de conexiones");

            const { nombre, descripcion, marca, modelo, numero_de_serie, estado, id_aula, id_categoria, imagen_producto, qr_code, ano_adquisicion, ultima_actualizacion, codigo } = req.body;
            const sql = 'INSERT INTO equiposelectronicos (nombre, descripcion, marca, modelo, numero_de_serie, estado, \
                    id_aula, id_categoria, imagen_producto, qr_code, ano_adquisicion, ultima_actualizacion, codigo) \
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
            connection.query(sql, [nombre, descripcion, marca, modelo, numero_de_serie, estado, id_aula, id_categoria, imagen_producto, qr_code, ano_adquisicion, ultima_actualizacion, codigo], (queryErr, resultado) => {
                if (queryErr) {
                    console.error('Error al insertar datos en la base de datos', err);
                    res.status(500).json({ error: 'Error interno del servidor' });
                } else {
                    res.json({ recibido: true, nuevoNombre, habitantes, id: resultado.insertId });
                }
            });

            connection.release();
        }
    })
};

const updateEquipo = (req, res) => {
    db.getConnection((err, connection) => {
        if (err) {
            console.error("Error en la conexion", err);
        } else {
            console.log("Conexion exitosa al pool de conexiones");

            const id = req.params.id;
            const { nombre, descripcion, marca, modelo, numero_de_serie, estado, id_aula, id_categoria, imagen_producto, qr_code, ano_adquisicion, ultima_actualizacion, cod_equipo } = req.body;

            const sql = 'UPDATE ciudades SET nombre = ? descripcion= ? marca= ? modelo= ? numero_de_serie= ? estado= ? \
            id_aula= ? id_categoria= ? imagen_producto= ? qr_code= ? ano_adquisicion= ? ultima_actualizacion= ? cod_equipo = ?\
            WHERE id_equipo = ? ';
            connection.query(sql, [nombre, descripcion, marca, modelo, numero_de_serie, estado, id_aula, id_categoria, imagen_producto, qr_code, ano_adquisicion, ultima_actualizacion, cod_equipo, id], (queryErr, resultado) => {
                if (queryErr) {
                    console.error('Error al modificar datos en la base de datos', err);
                    res.status(500).json({ error: 'Error interno del servidor' });
                } else {
                    res.json({ recibido: true, nuevoNombre, habitantes, id: resultado.idRegistro });
                }
            })

            connection.release();
        }
    })
};


const deleteEquipo = (req, res) => {
    db.getConnection((err, connection) => {
        if (err) {
            console.error("Error en la conexion", err);
        } else {
            console.log("Conexion exitosa al pool de conexiones");
            
            const id = req.params.id;
            connection.query('DELETE FROM equiposelectronicos WHERE id_equipo = ?', [id], (queryErr, resultado) => {
                if (queryErr) {
                    console.error('Error al eliminar datos desde la base de datos', err);
                    res.status(500).json({ error: 'Error interno del servidor' });
                } else {
                    if (resultado.affectedRows > 0) {
                        res.json({ mensaje: `Equipo con id ${id} eliminado correctamente` });
                    } else {
                        res.status(404).json({ error: `No se encontró el registro con id ${id}` })
                    }
                }
            });
            
            connection.release();
        }
    })
};

module.exports =
{
    getEquipos,
    crearEquipo,
    updateEquipo,
    deleteEquipo,
};