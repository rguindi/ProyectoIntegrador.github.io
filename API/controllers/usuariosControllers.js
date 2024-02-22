const db = require('../database/db');



// Función para obtener usuarios
const getUsuarios = (req, res) => {
    db.getConnection((err, connection) => {
        if (err) {
            console.error("Error en la conexion", err);
        } else {
            connection.query('SELECT * FROM usuarios', (err, resultados) => {
                if (err) {
                    console.error('Error al obtener usuarios de la base de datos', err);
                    res.status(500).json({ error: 'Error interno del servidor' });
                } else {
                    res.json(resultados);
                }
            });
            connection.release();
        }
    });
};


// Función para obtener usuarios por el id
const getUsuarioById = (req, res) => {
    const id_usuario = req.params.id;
    db.getConnection((err, connection) => {
        if (err) {
            console.error("Error en la conexion", err);
        } else {
            connection.query('SELECT * FROM usuarios WHERE id_usuario = ?', [id_usuario], (err, resultados) => {
                if (err) {
                    console.error('Error al obtener el registro de la base de datos: ', err);
                    res.status(500).json({ error: 'Error interno del servidor' });
                } else {
                    if (resultados.length > 0) {
                        res.json(resultados[0]);
                    } else {
                        // res.status(400).json({ error: 'Registro no encontrado' });
                        res.json({ error: 'Registro no encontrado' });
                    }
                    connection.release();
                }
            });
        }
    });
};


// Función para insertar usuarios
const crearUsuario = (req, res) => {
    const { id_usuario, contraseña, correo, rol } = req.body;

    db.getConnection((err, connection) => {
        if (err) {
            console.error("Error en la conexion", err);
        } else {
            connection.query('INSERT INTO usuarios (id_usuario, contraseña, correo, rol) VALUES (?,?,?,?)', [id_usuario, contraseña, correo, "docente"], (err, resultados) => {
                if (err) {
                    console.error('Error al crear el usuario', err);
                    res.status(500).json({ error: 'Error interno del servidor' });
                } else {
                    res.json({ recibido: true, id_usuario, contraseña, correo, rol });
                }
                connection.release();
            });
        }
    });
};

// Función para verificar si un usuario existe por id_usuario y contraseña
const verificarUsuario = (req, res) => {
    const { id_usuario, contraseña } = req.body;
    db.getConnection((err, connection) => {
        if (err) {
            console.error("Error en la conexion", err);
        } else {
            connection.query('SELECT * FROM usuarios WHERE id_usuario = ? AND contraseña = ?', [id_usuario, contraseña], (err, resultados) => {
                if (err) {
                    console.error('Error al verificar el usuario', err);
                    res.status(500).json({ error: 'El usuario no existe' });
                } else {
                    if (resultados.length > 0) {
                        const usuario = resultados[0];

                        // Guardar el usuario en la sesión
                        req.session.usuario = usuario;

                        res.json(usuario);
                    } else {
                        res.status(400).json({ error: 'Registro no encontrado' });
                    }
                    connection.release();
                }
            });
        }
    });
};

// Función para obtener rol
const getUser = (req, res) => {
    if (req.session.usuario) {
        console.log(req.session.usuario);
        console.log(req.session.usuario.rol);
        console.log(req.session);
        res.json({ usuario: req.session.usuario });
    } else {
        res.status(401).json({ error: 'No se ha iniciado sesión' });
    }
};

module.exports = {
    getUsuarios,
    getUsuarioById,
    crearUsuario,
    verificarUsuario,
    getUser,
};
