const mysql=require('mysql2')
//CONFIGURACION BASE DE DATOS
const db= mysql.createPool({
    host: '192.168.1.134',
    port: 3307,
    user: 'raul',
    password: 'raul',
    database: 'inventario'
});


module.exports=db;