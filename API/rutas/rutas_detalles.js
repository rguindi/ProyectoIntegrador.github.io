const express=require('express');     
const rutasDetalles = express.Router();
const detallesController= require('../controllers/detallesControllers');

//Ruta para obtener datos de la BD
//Cambiamos app por la nueva constante rutasdetalles
rutasDetalles.get('/', detallesController.getDetalles);
rutasDetalles.post('/', detallesController.crearDetalle);  //Lo normal es usar la misma ruta para el GET y EL POST
rutasDetalles.get('/:id', detallesController.getDetalleById);  //:id indica q es un parametro
rutasDetalles.put('/:id', detallesController.putDetalle); 
rutasDetalles.patch('/:id', detallesController.actualizarDetalle); 
rutasDetalles.delete('/:id', detallesController.deleteDetalle);

//exportamos la constante routes
module.exports = rutasDetalles;