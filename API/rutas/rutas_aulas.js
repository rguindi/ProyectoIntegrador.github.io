const express=require('express');     
const rutasAulas = express.Router();
const aulasController= require('../controllers/aulasControllers');

//Ruta para obtener datos de la BD
//Cambiamos app por la nueva constante rutasaulas
rutasAulas.get('/', aulasController.getAulas);
rutasAulas.post('/', aulasController.crearAula);
rutasAulas.get('/:id', aulasController.getAulaById);  //:id indica q es un parametro
rutasAulas.put('/:id', aulasController.putAula); 
rutasAulas.patch('/:id', aulasController.actualizarAula); 
rutasAulas.delete('/:id', aulasController.deleteAula);


//exportamos la constante routes
module.exports = rutasAulas;