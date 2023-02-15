const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Score extends Model {}

Score.init(
    {   
    user_id: {
        type: DataTypes.STRING,
        primaryKey: true,
        autoIncrement: false
      },
    password_id: {
        type: DataTypes.STRING
      },
    highscore: {
        type: DataTypes.INTEGER
      },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'score'
    }
);

module.exports = { Score };