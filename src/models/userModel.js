const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Usuario = sequelize.define('Usuario', {
    nombre: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    es_admin: { type: DataTypes.BOOLEAN, defaultValue: false },
}, { timestamps: true });

module.exports = Usuario;