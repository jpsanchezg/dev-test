const express = require('express');
const { createUser, crearOfertasUsuario } = require('../controllers/userController');
const { crearPrestamosUsuario } = require('../controllers/prestamoController');
const { getOfertas } = require('../controllers/ofertasController');


const isAdmin = require('../middlewares/isAdmin');
const router = express.Router();

// Ruta para crear un nuevo usuario
router.post('/', createUser);

// Ruta para crear una oferta para un usuario
router.post('/:id/ofertas', isAdmin, crearOfertasUsuario);

// Ruta para obtener todas las ofertas
router.get('/ofertas', getOfertas);


// Ruta para crear una Prestamo para un usuario
router.post('/:id/prestamos', crearPrestamosUsuario);

module.exports = router;
