const { User } = require('../models/userModel');

const isAdmin = async (req, res, next) => {
    try {
        const userId = req.user.id; // Supongamos que el usuario autenticado está en req.user
        const user = await User.findByPk(userId);

        if (!user || !user.es_admin) {
            return res.status(403).json({ message: 'Acceso denegado: solo administradores pueden realizar esta acción' });
        }

        next(); 
    } catch (error) {
        res.status(500).json({ message: 'Error verificando permisos de administrador', error: error.message });
    }
};

module.exports = isAdmin;