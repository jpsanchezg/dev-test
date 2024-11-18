const express = require('express');
const userRoutes = require('./userRoutes');
const prestamosRoutes = require('./prestamosRoutes');
const pagosRoutes = require('./pagosRoutes');

const errorHandler = require('../middlewares/errorHandler'); 


const router = express.Router();
router.use('/usuarios', userRoutes);
router.use('/prestamos', prestamosRoutes);
router.use('/pagos', pagosRoutes);

// Manejo de errores 
router.use(errorHandler);
module.exports = router;