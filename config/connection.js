const Sequelize = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.JAWDB_URL);

module.exports = sequelize;
