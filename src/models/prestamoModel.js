const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const User = require('./userModel');
const Oferta = require('./ofertaModel');

const Prestamo = sequelize.define('Prestamo', {
    monto: { type: DataTypes.FLOAT, allowNull: false },
    plazo: { type: DataTypes.INTEGER, allowNull: false },
    tasa_interes: { type: DataTypes.FLOAT, allowNull: false },
    estado: { type: DataTypes.STRING, defaultValue: 'activo' },
}, { timestamps: true });

Prestamo.belongsTo(User, { foreignKey: 'usuario_id' });
Prestamo.belongsTo(Oferta, { foreignKey: 'oferta_id' });
module.exports = Prestamo;