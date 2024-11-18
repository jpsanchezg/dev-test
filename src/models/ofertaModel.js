const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const User = require('./userModel'); 

const Oferta = sequelize.define('Oferta', {
    monto: { type: DataTypes.FLOAT, allowNull: false },
    plazo: { type: DataTypes.INTEGER, allowNull: false },
    tasa_interes: { type: DataTypes.FLOAT, allowNull: false },
}, { timestamps: true });

Oferta.belongsTo(User, { foreignKey: 'usuario_id' });

module.exports = Oferta;