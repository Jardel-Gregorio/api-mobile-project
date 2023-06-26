const express = require('express');

const routes = express.Router();

const LoginControlador = require('../../controller/login.controller');

routes.post('/', LoginControlador.store);

module.exports = routes;
