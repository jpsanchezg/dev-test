const Usuario = require('../models/userModel');
const Prestamo = require('../models/prestamoModel');
const OfertasXUsuario = require('../models/ofertasXusuarioModel');
const Oferta = require('../models/ofertaModel');
const Pagos = require('../models/pagosModel');
const pagosUsuario = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        const newUser = await Usuario.create({ name, email, password });
        res.status(201).json(newUser);
    } catch (error) {
        next(error);
    }
};

const crearPrestamosUsuario = async (req, res, next) => {
    try {
        const userId = req.params.id;
        const { ofertaId, plazo } = req.body;

        // Validación inicial
        if (!plazo || plazo <= 0) {
            return res.status(400).json({ error: 'Plazo inválido. Debe ser mayor a 0.' });
        }
        if (!ofertaId) {
            return res.status(400).json({ error: 'OfertaId es obligatorio.' });
        }

        console.log('Procesando préstamo para UserId:', userId, 'OfertaId:', ofertaId);

        // Verificar usuario y oferta en paralelo
        const [usuario, oferta] = await Promise.all([
            Usuario.findByPk(userId),
            Oferta.findByPk(ofertaId),
        ]);

        if (!usuario) {
            return res.status(404).json({ error: 'Usuario no encontrado.' });
        }

        if (!oferta) {
            return res.status(404).json({ error: 'Oferta no encontrada.' });
        }

        // Verificar si la oferta está asignada al usuario; crear la relación si no existe
        let ofertaAsignada = await OfertasXUsuario.findOne({
            where: { usuarioId: userId, ofertaId: ofertaId }, // Ajusta los nombres según el modelo
        });

        if (!ofertaAsignada) {
            const ofertaAsignada = await OfertasXUsuario.create({
                usuarioId: userId, // Campo correcto definido en el modelo
                ofertaId: ofertaId,
            });
            console.log('Oferta asignada automáticamente al usuario.');
        }

        // Crear el préstamo
        const monto = oferta.monto;
        const total = oferta.monto;
        const nuevoPrestamo = await Prestamo.create({
            userId,
            ofertaId,
            tasa_interes: oferta.tasa_interes,
            monto,
            plazo,
            pagado: 0,
            completado: false,
        });

        // Generar calendario de pagos
        const fechaInicio = new Date();
        const montoPorSemana = total / plazo;
        const calendarioPagos = Array.from({ length: plazo }, (_, i) => ({
            prestamoId: nuevoPrestamo.id,
            monto_pago: parseFloat(montoPorSemana.toFixed(2)), // Incluye el campo obligatorio
            monto_pagado: 0, // Inicialmente 0
            estado: 'pendiente', // Estado inicial
            fechaPago: new Date(fechaInicio.getTime() + (i + 1) * 7 * 24 * 60 * 60 * 1000), // Fecha de pago
        }));

        // Crear pagos en la base de datos
        await Pagos.bulkCreate(calendarioPagos);

        // Responder
        res.status(201).json({
            message: 'Préstamo creado con éxito.',
            prestamo: nuevoPrestamo,
            calendario: calendarioPagos,
        });
    } catch (error) {
        console.error('Error al crear el préstamo:', error);
        res.status(500).json({
            error: 'Ocurrió un error al crear el préstamo. Por favor, inténtelo de nuevo.',
        });
    }


};

module.exports = { pagosUsuario, crearPrestamosUsuario };
