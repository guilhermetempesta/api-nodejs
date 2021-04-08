require('dotenv').config();

module.exports = {
  "development": {
    "dialect": "postgres",
    "username": process.env.DEV_USERNAME,
    "password": process.env.DEV_PASSWORD,
    "host": process.env.DEV_HOST,
    "port": process.env.DEV_PORT,
    "database": process.env.DEV_DATABASE,
    "define": {
      "timestamps": true,
      "underscored": true
    },
    "seederStorage": "sequelize"
  },
  "production": {
    "dialect": "postgres",
    "username": process.env.DB_USERNAME,
    "password": process.env.DB_PASSWORD,
    "host": process.env.DB_HOST,
    "port": process.env.DB_PORT,
    "database": process.env.DB_DATABASE,
    "define": {
      "timestamps": true,
      "underscored": true
    },
    "seederStorage": "sequelize"
  }
}