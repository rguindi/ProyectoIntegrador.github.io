const express=require('express');
const rutasUsuarios = express.Router();
const usuariosControllers = require('../controllers/usuariosControllers');

rutasUsuarios.get('/', usuariosControllers.getUsuarios);
rutasUsuarios.get('/:id', usuariosControllers.getUsuariosById);
rutasUsuarios.post('/', usuariosControllers.crearUsuario);