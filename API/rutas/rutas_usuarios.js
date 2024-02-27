const express=require('express');
const rutasUsuarios = express.Router();
const usuariosControllers = require('../controllers/usuariosControllers');

rutasUsuarios.get('/user', usuariosControllers.getUser);
rutasUsuarios.get('/', usuariosControllers.getUsuarios);
rutasUsuarios.get('/:id', usuariosControllers.getUsuarioById);
rutasUsuarios.post('/verificar', usuariosControllers.verificarUsuario);
rutasUsuarios.post('/', usuariosControllers.crearUsuario);
rutasUsuarios.post('/cerrar-sesion', usuariosControllers.cerrarSesion);

module.exports = rutasUsuarios;