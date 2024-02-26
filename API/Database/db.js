const mysql=require('mysql2')
//CONFIGURACION BASE DE DATOS
const db= mysql.createPool({
    host: '192.168.1.135',
    port: 3307,
    user: 'inventario',
    password: 'inventario',
    database: 'inventario'
});


module.exports=db;