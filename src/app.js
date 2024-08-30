const express = require('express');
const sequelize = require('./database/database');
const clienteRoutes = require('./routes/clientRoutes');
const cors = require('cors');
const captureToken = require('./middleware/authMiddleware');
const verifyToken = require('./middleware/verifyToken');


const app = express();
const port = 3000;

const corsOptions = {
    origin: '*',
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type,Authorization'
};

app.use(cors(corsOptions));
app.use(express.json());

app.options('*', cors(corsOptions));

// Aplica el middleware de captura de token
app.use(captureToken);

// Aplica el middleware de verificación de token a las rutas protegidas
app.use('/api', verifyToken, clienteRoutes);


const initDatabase = async () => {
    try {
        await sequelize.sync({ force: false });
        console.log('Base de datos y tablas creadas o ya existentes.');
    } catch (error) {
        console.error('Error al sincronizar la base de datos:', error);
    }
};

initDatabase();

app.listen(port, '0.0.0.0', () => {
    console.log(`Servidor corriendo en http://0.0.0.0:${port}`);
});
