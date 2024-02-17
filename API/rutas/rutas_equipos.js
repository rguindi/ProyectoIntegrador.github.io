const express=require('express');     
const rutasEquipos = express.Router();
const equiposController= require('../controllers/equiposControllers');

//Ruta para obtener datos de la BD
//Cambiamos app por la nueva constante rutasequipos
rutasEquipos.get('/', equiposController.getEquipos);
rutasEquipos.post('/', equiposController.crearEquipo);  //Lo normal es usar la misma ruta para el GET y EL POST
rutasEquipos.get('/:id', equiposController.getEquipoById);  //:id indica q es un parametro
rutasEquipos.put('/:id', equiposController.putEquipo); 
rutasEquipos.patch('/:id', equiposController.actualizarEquipo); 
rutasEquipos.delete('/:id', equiposController.deleteEquipo);

//exportamos la constante routes
module.exports = rutasEquipos;