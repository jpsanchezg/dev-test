const express = require('express');
const { pagosUsuario } = require('../controllers/prestamoController');
const errorHandler = require('../middlewares/errorHandler'); // Middleware de errores

const router = express.Router();



// Ruta para crear una oferta para un usuario
router.post('/:loanId/pagos', pagosUsuario);


// Manejo de errores (debe estar después de las rutas)
router.use(errorHandler);
module.exports = router;
