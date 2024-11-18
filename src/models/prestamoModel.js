const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const User = require('./userModel');
const Oferta = require('./ofertaModel');

const Prestamo = sequelize.define('Prestamo', {
    monto: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    plazo: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    tasa_interes: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0,
    },
    pagado: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0,
    },
    completado: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
}, { timestamps: true });


module.exports = Prestamo;