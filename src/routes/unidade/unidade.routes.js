const express = require('express');

const routes = express.Router();

const UnidadeControlador = require('../../controller/unidade.controller');

routes.get('/', UnidadeControlador.index);
routes.get('/:id', UnidadeControlador.show);
routes.post('/', UnidadeControlador.store);
routes.put('/:id', UnidadeControlador.update);
routes.delete('/:id', UnidadeControlador.delete);

module.exports = routes;
