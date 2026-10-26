const Entrega = require('../models/Entrega')
const Carga = require('../models/Carga')
const Motorista = require('../models/Motorista')

Motorista.hasMany(Carga, {
    as: 'motoristasCargas',
    foreignKey: { name: 'idMotorista', allowNull: false },
    onDelete: 'CASCADE'
})
Carga.belongsTo(Motorista, {
    as: 'cargasMotorista',
    foreignKey: 'idMotorista'
})
Carga.hasMany(Entrega, {
    as: 'cargaEntregas',
    foreignKey:'idCarga',
    onDelete: 'CASCADE'
})
Entrega.belongsTo(Carga, {
    as: 'entregasCargas',
    foreignKey: 'idCarga'
})
module.exports = {Entrega, Carga, Motorista}