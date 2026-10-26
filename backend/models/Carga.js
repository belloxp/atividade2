const {DataTypes} = require('sequelize')
const db  = require('../db/db')
const Carga = db.define('cargas',{
    codCarga: {
        type : DataTypes.INTEGER,
        autoIncrement : true,
        primaryKey :  true
    },
    descricao :  {
        type : DataTypes.STRING,
        allowNull : false
    },
    peso :  {
        type : DataTypes.FLOAT(10,2),
        allowNull : false
    },
    volume :  {
        type : DataTypes.FLOAT(10,2),
        allowNull : false
    },
    idMotorista:{
        type : DataTypes.INTEGER,
        allowNull : false,
        references : {
            key : 'codMotorista',
            model : 'motoristas'
        }
    }
},{
    timestamps : false,
    tableName : 'cargas'
})
module.exports = Carga