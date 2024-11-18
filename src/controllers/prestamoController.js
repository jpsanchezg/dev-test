const User = require('../models/userModel');
const Prestamo = require('../models/prestamoModel');



const pagosUsuario = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        const newUser = await User.create({ name, email, password });
        res.status(201).json(newUser);
    } catch (error) {
        next(error);
    }
};


module.exports = { pagosUsuario};
