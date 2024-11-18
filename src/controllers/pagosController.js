const Usuario = require('../models/userModel');
const Oferta = require('../models/ofertaModel');

const revertirPagosUsuario = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        const newUser = await Usuario.create({ name, email, password });
        res.status(201).json(newUser);
    } catch (error) {
        next(error);
    }
};

module.exports = { revertirPagosUsuario };
