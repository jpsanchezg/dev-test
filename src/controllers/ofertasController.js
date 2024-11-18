const User = require('../models/userModel');
const Oferta = require('../models/ofertaModel');

const getOfertas = async (req, res, next) => {
    try {
        const ofertas = await Oferta.findAll(); 
        res.status(200).json(ofertas);
    } catch (error) {
        next(error);
    }
};

module.exports = { getOfertas };
