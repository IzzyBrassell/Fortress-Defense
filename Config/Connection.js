const Sequelize = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(`mysql://mkfzp6v9u6y7cc9j:j72xgjmsguad3r2o@z3iruaadbwo0iyfp.cbetxkdyhwsb.us-east-1.rds.amazonaws.com:3306/tdf20jsqjy1jqpx1`);

module.exports = sequelize;
