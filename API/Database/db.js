const mysql = require('mysql');
// Configuración de la BD
const db = mysql.createConnection({
    host: '0.0.0.0',
    port: 3307,
    user: 'georgi',
    password: 'georgi',
    database: 'ejemplodb'
});

// Conexión a la BD
db.connect((err) => {
    if (err) {
        console.log('Error en la conexión a la base de datos:', err);
    } else {
        console.log('Conexión exitosa a la base de datos');
    }
});

//where like tabla="*a"

module.exports = db; // Cambiado de db a bd
