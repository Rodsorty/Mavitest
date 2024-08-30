const axios = require('axios');


const captureToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Token no proporcionado' });
    }

    req.token = token; // Guardar el token en el objeto de solicitud
    next();
};

module.exports = captureToken;
