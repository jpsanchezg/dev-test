const Usuario = require('../models/userModel');
const Oferta = require('../models/ofertaModel');

// Crear un nuevo usuario
const createUser = async (req, res, next) => {
    try {
        const { nombre, email, contrasena, documentoid, rolId } = req.body;

        // Validaciones previas
        if (!nombre || !email || !contrasena || !documentoid || !rolId) {
            return res.status(400).json({
                message: 'Todos los campos son obligatorios: nombre, email, contrasena, documentoid, rolId.'
            });
        }

        // Verificar formato del email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                message: 'El formato del email es inválido.'
            });
        }

        // Crear el usuario
        const newUser = await Usuario.create({ nombre, email, contrasena, documentoid, rolId });

        // Respuesta exitosa
        res.status(201).json({
            message: 'Usuario creado con éxito.',
            usuario: newUser,
        });
    } catch (error) {
        // Manejo de errores específicos
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(409).json({
                message: 'El email ya está registrado.',
            });
        }

        if (error.name === 'SequelizeValidationError') {
            return res.status(400).json({
                message: 'Error de validación.',
                detalles: error.errors.map(err => err.message),
            });
        }

        // Manejo de errores generales
        console.error('Error al crear el usuario:', error);
        res.status(500).json({
            message: 'Ocurrió un error al crear el usuario. Por favor, inténtelo de nuevo más tarde.'
        });
    }
};




module.exports = { createUser };
