const {Sequelize} = require('sequelize');

const env =  'development'; //cambiar por .env

const config = require('./config.js')[env];

const sequelize = new Sequelize(config);

module.exports = sequelize;