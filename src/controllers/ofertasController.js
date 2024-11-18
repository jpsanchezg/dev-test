const Usuario = require('../models/userModel');
const Oferta = require('../models/ofertaModel');

const getOfertas = async (req, res, next) => {
    try {
        const ofertas = await Oferta.findAll(); 
        res.status(200).json(ofertas);
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
module.exports = { getOfertas, crearOfertasUsuario };
