const express = require('express');
const rutasEquipos = express.Router();
const equiposController = require('../controllers/equiposControllers');

rutasEquipos.get('/', equiposController.getEquipos);

rutasEquipos.post('/', equiposController.crearEquipo);

rutasEquipos.put('/:id', equiposController.updateEquipo);

rutasEquipos.delete('/:id', equiposController.deleteEquipo);

module.exports = rutasEquipos;