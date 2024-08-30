const axios = require('axios');


const VERIFY_URL = 'https://d2ch8ltrwj.execute-api.us-east-1.amazonaws.com/prod/verify';
const API_KEY = 'NThxI7cLCM8tv0P4iLbVD1Vi7lPSvVPL1zETpxxn';

// Middleware para verificar el token
const verifyToken = async (req, res, next) => {
    const token = req.token;

    try {
        const response = await axios.post(VERIFY_URL, {}, {
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': API_KEY,
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.status === 200) {
            // Token verificado con éxito
            req.user = response.data; 
            next();
        } else {
            res.status(response.status).json({ message: 'Token inválido' });
        }
    } catch (error) {
        console.error('Error al verificar el token:', error);
        res.status(500).json({ message: 'Error en la verificación del token' });
    }
};

module.exports = verifyToken;
