const express=require('express');     
const rutasIncidencias = express.Router();
const incidenciasController= require('../controllers/incidenciasControllers');

//Ruta para obtener datos de la BD
//Cambiamos app por la nueva constante rutasincidencias
rutasIncidencias.get('/', incidenciasController.getIncidencias);
rutasIncidencias.post('/', incidenciasController.crearIncidencia);  //Lo normal es usar la misma ruta para el GET y EL POST
rutasIncidencias.get('/:id', incidenciasController.getIncidenciaById);  //:id indica q es un parametro
rutasIncidencias.put('/:id', incidenciasController.putIncidencia); 
rutasIncidencias.patch('/:id', incidenciasController.actualizarIncidencia); 
rutasIncidencias.delete('/:id', incidenciasController.deleteIncidencia);


//exportamos la constante routes
module.exports = rutasIncidencias;