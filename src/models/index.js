const { sequelize } = require('../config/db');
const User = require('./userModel');
const Prestamo = require('./prestamoModel');
const Oferta = require('./ofertaModel');
const Pagos = require('./pagosModel');
const initializeModels = async () => {
    try {
        await sequelize.sync({ alter: true }); 
        console.log('All models were synchronized successfully.');
    } catch (error) {
        console.error('Error synchronizing models:', error);
    }
};
module.exports = { sequelize, initializeModels, User, Prestamo, Oferta, Pagos };
