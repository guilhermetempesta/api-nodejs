require('dotenv').config();
require('../redis/blocklistAccessToken');
require('../redis/allowlistRefreshToken');
require('../mongodb/connection');
require('./database');

const app = require('express')();
const consign = require('consign');
const errorHandler = require('./middlewares/errors');

const port = process.env.PORT || 3030;

consign() 
    .include('./src/middlewares/index.js')
    .then('./src/utils')
    .then('./src/config')
    .then('./src/repositories')
    .then('./src/services')
    .then('./src/controllers')
    .then('./src/tasks')
    .then('./src/routes')
    .into(app);

    app.use(errorHandler);

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}...`);
});