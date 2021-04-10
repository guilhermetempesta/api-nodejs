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
    "url": process.env.DATABASE_URL,
    "dialectOptions": {
      "ssl": true
    },
    "define": {
      "timestamps": true,
      "underscored": true
    },
    "seederStorage": "sequelize"
  }
}