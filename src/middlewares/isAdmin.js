const User = require('../models/userModel');
const Rol = require('../models/rolModel');
const isAdmin = async (req, res, next) => {
    try {
        const userId = req.params.id;
        if (!userId) {
            return res.status(400).json({ message: 'El ID del usuario es obligatorio' });
        }

        const user = await User.findByPk(userId, {
            include: {
                model: Rol,
                as: 'rol', // Alias definido en la relación User.belongsTo(Rol)
            },
        });

        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        if (user.rol?.nombre !== 'admin') {
            return res.status(403).json({ message: 'Acceso denegado: solo administradores pueden realizar esta acción' });
        }

        next(); 
    } catch (error) {
        console.error('Error en isAdmin middleware:', error);
        res.status(500).json({ message: 'Error interno del servidor al verificar permisos de administrador' });
    }
};

module.exports = isAdmin;