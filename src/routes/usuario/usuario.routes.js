const express = require('express');

const routes = express.Router();

const UsuarioControlador = require('../../controller/usuario.controller');

routes.get('/', UsuarioControlador.index);
routes.get('/:id', UsuarioControlador.show);
routes.post('/', UsuarioControlador.store);
routes.put('/:id', UsuarioControlador.update);
routes.delete('/:id', UsuarioControlador.delete);

module.exports = routes;
