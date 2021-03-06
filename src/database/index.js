const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/database.js')[env];

console.log('Carregar configurações do banco de dados')

const models = {};
const modelsDir = path.join(__dirname, '../models');

// create new connection
let sequelize;
if (config.url) {
    sequelize = new Sequelize(config.url, config);
} else {
    sequelize = new Sequelize(config);    
}

// load models
fs.readdirSync(modelsDir)
    .forEach(file => {
        const model = require(path.join(modelsDir, file));
        models[model.name] = model;
    })
        
// initialize models    
Object.keys(models).forEach(model => {
    models[model].init(sequelize);
})

// load associations
Object.keys(models).forEach((model) => {
    if (models[model].associate) {
    models[model].associate(models);
    }
});

// load connections
models.sequelize = sequelize;    
models.Sequelize = Sequelize;

module.exports = sequelize;