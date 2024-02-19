const db = require ('../database/db');

// Función para obtener usuarios
const getUsuarios = (req, res) => {

    db.query('SELECT * FROM usuarios', (err, resultados) => {

        if (err) {
            console.error('Error al obtener usuarios de la bbdd', err);
        
        } else {
            res.json(resultados);
        }
    });
};


// Función para obtener usuarios por el id
const getUsuarioById = (req, res) => {

    const id_usuario = req.params.id;

    db.query('SELECT * FROM usuarios WHERE id = ?', [id_usuario], (err, resultados) => {

        if (err) {            
            console.error('Error al obtener el registro de la base de datos: ', err);
            res.status(500).json({ error: 'Error interno del servidor' });
        
        } else {

            if (resultados.length > 0) {
                res.json(resultados[0]);

            } else {
                res.status(400).json({ error: 'Registro no encontrado' });
            }
        }
    });
};


// Función para insertar usuarios
const crearUsuario = (req, res) => {

    const {id_usuario, contraseña, correo, rol} = req.body;

    db.query('INSERT INTO usuarios (id_usuario, contraseña, correo, rol) VALUES (?,?,?,?)', [id_usuario, contraseña, correo, rol], (err, resultados) => {

        if (err) {
            console.error('Error al crear el usuario', err);
            res.status(500).json({ error: 'Error interno del servidor' });

        } else {
            res.json({ recibido:true, id_usuario, contraseña, correo, rol})
        }
    });
};


module.exports={
    getUsuarios,
    getUsuarioById,
    crearUsuario
};