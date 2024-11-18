const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const Rol = require('./rolModel'); 

const Usuario = sequelize.define('Usuario', {
    nombre: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    contrasena: { type: DataTypes.STRING, allowNull: false },
    documentoid: { type: DataTypes.INTEGER, allowNull: false },
    rolId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Rol, 
            key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL', 
    },
}, { timestamps: true });

module.exports = Usuario;