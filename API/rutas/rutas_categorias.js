const express=require('express');     
const rutasCategorias = express.Router();
const categoriasController= require('../controllers/categoriasControllers');

//Ruta para obtener datos de la BD
//Cambiamos app por la nueva constante rutascategorias
rutasCategorias.get('/:id', categoriasController.getCategoriaById);  //:id indica q es un parametro
rutasCategorias.get('/', categoriasController.getCategorias);
rutasCategorias.post('/', categoriasController.crearCategoria);  //Lo normal es usar la misma ruta para el GET y EL POST
rutasCategorias.put('/:id', categoriasController.putCategoria); 
rutasCategorias.delete('/:id', categoriasController.deleteCategoria);


//exportamos la constante routes
module.exports = rutasCategorias;