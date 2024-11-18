const User = require('../models/userModel');
const Oferta = require('../models/ofertaModel');

// Crear un nuevo usuario
const createUser = async (req, res, next) => {
    try {
        const { nombre, email, es_admin } = req.body;
        const newUser = await User.create({ nombre, email, es_admin });
        res.status(201).json(newUser);
    } catch (error) {
        next(error);
    }
};


const crearOfertasUsuario = async (req, res, next) => {
    try {
        const { monto, plazo, tasa_interes } = req.body;
        const newOferta = await Oferta.create({ monto, plazo, tasa_interes });
        res.status(201).json(newOferta);
    } catch (error) {
        next(error);
    }
};

const crearPrestamosUsuario = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        const newUser = await User.create({ name, email, password });
        res.status(201).json(newUser);
    } catch (error) {
        next(error);
    }
};

module.exports = { createUser, crearOfertasUsuario, crearPrestamosUsuario };
