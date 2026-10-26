const {DataTypes} = require('sequelize')
const db  = require('../db/db')
const Motorista = db.define('motoristas',{
    codMotorista: {
        type : DataTypes.INTEGER,
        autoIncrement : true,
        primaryKey :  true
    },
    nome :  {
        type : DataTypes.STRING,
        allowNull : false
    },
    CNH :  {
        type : DataTypes.STRING,
        allowNull : false
    },
    CPF :  {
        type : DataTypes.STRING,
        allowNull : false
    },
    telefone :  {
        type : DataTypes.STRING,
        allowNull : false
    }
},{
    timestamps : false,
    tableName : 'motoristas'
})
module.exports = Motorista