const express=require('express');
const rutasUsuarios = express.Router();
const usuariosControllers = require('../controllers/usuariosControllers');

rutasUsuarios.get('/', usuariosControllers.getUsuarios);
rutasUsuarios.get('/rol', usuariosControllers.getRol);
rutasUsuarios.get('/:id', usuariosControllers.getUsuarioById);
rutasUsuarios.post('/verificar', usuariosControllers.verificarUsuario);
rutasUsuarios.post('/', usuariosControllers.crearUsuario);

module.exports = rutasUsuarios;