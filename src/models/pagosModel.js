const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const Prestamo = require('./prestamoModel'); // Relación con el Préstamo

const Pagos = sequelize.define('Pagos', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    monto_pago: {
        type: DataTypes.FLOAT,
        allowNull: false, // Este campo debe estar definido correctamente
    },
    monto_pagado: {
        type: DataTypes.FLOAT,
        defaultValue: 0, // Valor inicial
    },
    estado: {
        type: DataTypes.STRING,
        defaultValue: 'pendiente',
    },
    prestamoId: {
        type: DataTypes.INTEGER,
        allowNull: false, // Asegúrate de que el campo está bien definido
    },
}, { timestamps: true });


module.exports = Pagos;