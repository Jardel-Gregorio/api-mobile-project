const cors = require('cors');
const express = require('express');

const http = require('http');

const path = require('path');

require('dotenv').config();

const routes = require('./router');

const app = express();
const httpServer = http.createServer(app);

app.use(
  '/static/api',
  express.static(path.join(__dirname, '..', 'static', 'public')),
);

app.use(cors());
app.use(express.json());

app.use('/api', routes);

httpServer.listen(process.env.HTTP_PORT, () => {
  console.log(`Servidor iniciado na porta ${process.env.HTTP_PORT}`);
});
