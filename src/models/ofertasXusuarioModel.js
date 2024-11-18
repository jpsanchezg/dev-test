const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');


const OfertasXUsuario = sequelize.define('OfertasXUsuario', {

}, { timestamps: true });



module.exports = OfertasXUsuario;