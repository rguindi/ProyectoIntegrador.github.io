const mysql = require('mysql2');


const db = mysql.createPool({
    host: '0.0.0.0',
    port: 3307,
    user: 'userapi',
    password: 'userapi',
    database: 'inventario'
})

module.exports = db;