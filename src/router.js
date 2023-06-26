const Routes = require('express').Router();

const RotasLogin = require('./routes/login/login.routes');
const RotasUsuario = require('./routes/usuario/usuario.routes');
const RotasExame = require('./routes/exame/exame.routes');
const RotasUnidade = require('./routes/unidade/unidade.routes');
const RotasUnidadeUpload = require('./routes/unidade/unidadeUpload.routes');

Routes.use('/login', [RotasLogin]);

Routes.use('/usuario', [RotasUsuario]);

Routes.use('/exame', [RotasExame]);

Routes.use('/unidade', [RotasUnidade, RotasUnidadeUpload]);

module.exports = Routes;
