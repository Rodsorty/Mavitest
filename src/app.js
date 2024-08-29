const express = require('express');
const sequelize = require('./database/database'); // Importa el objeto sequelize
const clienteRoutes = require('./routes/clientRoutes');
const cors = require('cors');

const app = express();
const port = 3000;

// Configurar CORS para permitir todos los orígenes
const corsOptions = {
    origin: '*', 
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type,Authorization'
};

app.use(cors(corsOptions));
app.use(express.json());

// Permitir solicitudes OPTIONS
app.options('*', cors(corsOptions));

// Rutas para los endpoints
app.use('/api', clienteRoutes);

// Verificar y crear la base de datos si no existe
const initDatabase = async () => {
    try {
        await sequelize.sync({ force: false });
        console.log('Base de datos y tablas creadas o ya existentes.');
    } catch (error) {
        console.error('Error al sincronizar la base de datos:', error);
    }
};

// Iniciar base
initDatabase();

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
