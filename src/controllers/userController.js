const Usuario = require('../models/userModel');
const Oferta = require('../models/ofertaModel');

// Crear un nuevo usuario
const createUser = async (req, res, next) => {
    try {
        const { nombre, email, es_admin } = req.body;
        const newUser = await Usuario.create({ nombre, email, es_admin });
        res.status(201).json(newUser);
    } catch (error) {
        next(error);
    }
};





module.exports = { createUser };
