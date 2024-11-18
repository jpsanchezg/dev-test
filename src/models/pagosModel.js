const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const Prestamo = require('./prestamoModel'); // Relación con el Préstamo

const Pagos = sequelize.define('Pagos', {
    monto_pago: { type: DataTypes.FLOAT, allowNull: false },
    fecha_pago: { type: DataTypes.DATE, allowNull: false },
    monto_pagado: { type: DataTypes.FLOAT, defaultValue: 0 },
    estado: { type: DataTypes.STRING, defaultValue: 'pendiente' },
}, { timestamps: true });

Pagos.belongsTo(Prestamo, { foreignKey: 'prestamo_id' });

module.exports = Pagos;