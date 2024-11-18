const Pagos = require('../models/pagosModel');
const Prestamo = require('../models/prestamoModel');


const revertirPagosUsuario = async (req, res, next) => {
    try {
        const paymentId  = req.params.paymentId;
        const pago = await Pagos.findByPk(paymentId, {
            include: {
                model: Prestamo, 
            },
        });

        if (!pago) {
            return res.status(404).json({ error: 'Pago no encontrado.' });
        }

        if (pago.estado === 'pendiente') {
            return res.status(400).json({ error: 'El pago ya está pendiente y no se puede revertir.' });
        }

        const prestamo = pago.Prestamo;

        if (!prestamo) {
            return res.status(404).json({ error: 'Préstamo relacionado no encontrado.' });
        }

        const montoRevertido = pago.monto_pagado;
        pago.monto_pagado = 0;
        pago.estado = 'pendiente';
        await pago.save();

        prestamo.pagado -= montoRevertido;
        if (prestamo.pagado < prestamo.monto) {
            prestamo.completado = false; 
        }
        await prestamo.save();

        res.status(200).json({
            message: 'Pago revertido con éxito.',
            pago,
            prestamo,
        });
    } catch (error) {
        console.error('Error al revertir el pago:', error);
        res.status(500).json({
            error: 'Ocurrió un error al revertir el pago. Por favor, inténtelo de nuevo.',
        });
    }
};

module.exports = { revertirPagosUsuario };
