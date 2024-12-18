const { sequelize } = require('../config/db');
const Usuario = require('./userModel');
const Prestamo = require('./prestamoModel');
const Oferta = require('./ofertaModel');
const OfertasXUsuario = require('./ofertasXusuarioModel');
const Pagos = require('./pagosModel');
const Rol = require('./rolModel');

// Relación Usuario <-> Oferta (a través de ofertasXusuario)
Usuario.belongsToMany(Oferta, { through: OfertasXUsuario, foreignKey: 'usuarioId', as: 'ofertas',uniqueKey: false });
Oferta.belongsToMany(Usuario, { through: OfertasXUsuario, foreignKey: 'ofertaId', as: 'usuarios', uniqueKey: false });

// Relación Usuario <-> Prestamo
Usuario.hasMany(Prestamo, { foreignKey: 'userId' });
Prestamo.belongsTo(Usuario, { foreignKey: 'userId' });

// Relación Oferta <-> Prestamo
Oferta.hasMany(Prestamo, { foreignKey: 'ofertaId' });
Prestamo.belongsTo(Oferta, { foreignKey: 'ofertaId' });

// Relación Prestamo <-> Pago
Prestamo.hasMany(Pagos, { foreignKey: 'prestamoId' });
Pagos.belongsTo(Prestamo, { foreignKey: 'prestamoId' });

Rol.hasMany(Usuario, { foreignKey: 'rolId', as: 'usuarios' });
Usuario.belongsTo(Rol, { foreignKey: 'rolId', as: 'rol' });
const initializeModels = async () => {
    try {
        await sequelize.sync({ alter: true }); 
        console.log('All models were synchronized successfully.');
    } catch (error) {
        console.error('Error synchronizing models:', error);
    }
};
module.exports = { sequelize, initializeModels, Usuario, Prestamo, Oferta, Pagos, OfertasXUsuario };
