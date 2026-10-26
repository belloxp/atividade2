const {DataTypes} = require('sequelize')
const db  = require('../db/db')
const Funcionario = db.define('funcionarios',{
    codFuncionario: {
        type : DataTypes.INTEGER,
        autoIncrement : true,
        primaryKey :  true
    },
    nome :  {
        type : DataTypes.STRING,
        allowNull : false
    },
    email :  {
        type : DataTypes.STRING,
        allowNull : false
    },
    senha :  {
        type : DataTypes.STRING,
        allowNull : false
    }
},{
    timestamps : false,
    tableName : 'funcionarios'
})
module.exports = Funcionario