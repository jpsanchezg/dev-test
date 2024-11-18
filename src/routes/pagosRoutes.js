const express = require('express');
const { revertirPagosUsuario } = require('../controllers/pagosController');
const errorHandler = require('../middlewares/errorHandler'); // Middleware de errores

const router = express.Router();




router.post('/:paymentId/revertir', revertirPagosUsuario);

// Manejo de errores (debe estar después de las rutas)
router.use(errorHandler);
module.exports = router;
