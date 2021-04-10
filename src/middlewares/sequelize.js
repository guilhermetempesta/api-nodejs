const fs = require('fs');
const path = require('path');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/database.js')[env];
const Sequelize = require('sequelize');

console.log(process.env.NODE_ENV);
console.log(config.database + config.username + config.password + config.host + config.port );

module.exports = (req, res, next) => {
    console.log('middleware: sequelize');

    const sequelize = new Sequelize(config);    
    const models = {};
    const modelsDir = path.join(__dirname, '../models');
    
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

    next();
}