const express=require('express');     
const rutasCiudades = express.Router();
const ciudadesController= require('../controllers/ciudadesControllers');

//Ruta para obtener datos de la BD
//Cambiamos app por la nueva constante rutasciudades
rutasCiudades.get('/', ciudadesController.getCiudades);
rutasCiudades.post('/add', ciudadesController.crearCiudad);  //Lo normal es usar la misma ruta para el GET y EL POST
rutasCiudades.get('/:id', ciudadesController.getCiudadById);  //:id indica q es un parametro
rutasCiudades.put('/put/:id', ciudadesController.putCiudad); 
rutasCiudades.patch('/patch/:id', ciudadesController.patchCiudad); 
rutasCiudades.patch('/:id', ciudadesController.actualizarCiudad); 
rutasCiudades.delete('/:id', ciudadesController.deleteCiudad);
rutasCiudades.get('/habitantes/:min/:max', ciudadesController.getCiudadesByHabitantes);

//exportamos la constante routes
module.exports = rutasCiudades;