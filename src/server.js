require('dotenv').config();

const app = require('express')();
const consign = require('consign');
const port = process.env.PORT || 3030;
const db = require('../src/middlewares/sequelize');
const errorHandler = require('./middlewares/errors');

app.use(db);

consign() 
    .include('./src/middlewares/index.js')
    .then('./src/utils')
    .then('./src/config')
    .then('./src/repositories')
    .then('./src/services')
    .then('./src/controllers')
    .then('./src/routes')
    .into(app);

    app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server is running in port ${port}...`);
});