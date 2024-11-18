const Usuario = require('../models/userModel');
const Prestamo = require('../models/prestamoModel');
const OfertasXUsuario = require('../models/ofertasXusuarioModel');
const Oferta = require('../models/ofertaModel');
const Pagos = require('../models/pagosModel');
const pagosUsuario = async (req, res, next) => {
    try {
        const  loanId  = req.params.loanId;
        const { montoPago } = req.body;

        if (!montoPago || montoPago <= 0) {
            return res.status(400).json({ error: 'El monto del pago debe ser mayor a 0.' });
        }

        const prestamo = await Prestamo.findByPk(loanId, {
            include: {
                model: Pagos, 
                where: { estado: 'pendiente' }, 
                order: [['fechaPago', 'ASC']], 
            },
        });

        if (!prestamo) {
            return res.status(404).json({ error: 'Préstamo no encontrado.' });
        }

        if (prestamo.Pagos.length === 0) {
            return res.status(400).json({ error: 'No hay pagos pendientes para este préstamo.' });
        }

        let montoRestante = montoPago;
        for (const pago of prestamo.Pagos) {
            if (montoRestante <= 0) break;

            const restantePago = pago.monto_pago - pago.monto_pagado;

            if (montoRestante >= restantePago) {
                pago.monto_pagado = pago.monto_pago;
                pago.estado = 'pagado';
                montoRestante -= restantePago;
            } else {
                pago.monto_pagado += montoRestante;
                montoRestante = 0;
            }

            await pago.save(); 
        }

        const pagosPendientes = await Pagos.count({
            where: { prestamoId: loanId, estado: 'pendiente' },
        });

        if (pagosPendientes === 0) {
            prestamo.pagado = prestamo.monto; 
            prestamo.completado = true; 
            await prestamo.save();
        } else {
            const montoPagadoAnterior = prestamo.pagado;
            const montoRealPagado = montoPago - montoRestante; 
            prestamo.pagado = montoPagadoAnterior + montoRealPagado;
            await prestamo.save();
        }

        res.status(200).json({
            message: 'Pago aplicado con éxito.',
            prestamo,
        });
    } catch (error) {
        console.error('Error al aplicar el pago:', error);
        res.status(500).json({
            error: 'Ocurrió un error al aplicar el pago. Por favor, inténtelo de nuevo.',
        });
    }
};

const crearPrestamosUsuario = async (req, res, next) => {
    try {
        const userId = req.params.id;
        const { ofertaId, plazo } = req.body;

        if (!plazo || plazo <= 0) {
            return res.status(400).json({ error: 'Plazo inválido. Debe ser mayor a 0.' });
        }
        if (!ofertaId) {
            return res.status(400).json({ error: 'OfertaId es obligatorio.' });
        }


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

        let ofertaAsignada = await OfertasXUsuario.findOne({
            where: { usuarioId: userId, ofertaId: ofertaId }, 
        });

        if (!ofertaAsignada) {
            const ofertaAsignada = await OfertasXUsuario.create({
                usuarioId: userId, 
                ofertaId: ofertaId,
            });
        }

        const total = oferta.monto;
        const nuevoPrestamo = await Prestamo.create({
            userId,
            ofertaId,
            tasa_interes: oferta.tasa_interes,
            monto: oferta.monto,
            plazo,
            pagado: 0,
            completado: false,
        });

        const fechaInicio = new Date();
        const montoPorSemana = total / plazo;
        const calendarioPagos = Array.from({ length: plazo }, (_, i) => ({
            prestamoId: nuevoPrestamo.id,
            monto_pago: parseFloat(montoPorSemana.toFixed(2)), 
            monto_pagado: 0, 
            estado: 'pendiente', 
            fechaPago: new Date(fechaInicio.getTime() + (i + 1) * 7 * 24 * 60 * 60 * 1000), 
        }));

        await Pagos.bulkCreate(calendarioPagos);

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
