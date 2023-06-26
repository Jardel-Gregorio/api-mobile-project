const express = require('express');

const routes = express.Router();

const ExameControlador = require('../../controller/exame.controller');

routes.get('/', ExameControlador.index);
routes.get('/:id', ExameControlador.show);
routes.post('/', ExameControlador.store);
routes.put('/:id', ExameControlador.update);
routes.delete('/:id', ExameControlador.delete);

module.exports = routes;
