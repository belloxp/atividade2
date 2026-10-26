const {DataTypes} = require('sequelize')
const db  = require('../db/db')
const Entrega = db.define('entregas',{
    codEntrega: {
        type : DataTypes.INTEGER,
        autoIncrement : true,
        primaryKey :  true
    },
    cidadeDestino :  {
        type : DataTypes.STRING,
        allowNull : false
    },
    status :  {
        type : DataTypes.ENUM('ENTREGUE','TRANSITO'),
        allowNull : false
    },
    data :  {
        type : DataTypes.DATEONLY,
        allowNull : false
    },
    hora :  {
        type : DataTypes.TIME,
        allowNull : false
    },
    idCarga:{
        type : DataTypes.INTEGER,
        allowNull : false,
        references : {
            key : 'codCarga',
            model : 'cargas'
        }
    }
},{
    timestamps : false,
    tableName : 'entregas'
})
module.exports = Entrega