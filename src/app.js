// src/app.js
const express = require('express');
const sequelize = require('./database/database'); // Importa el objeto sequelize
const clienteRoutes = require('./routes/clientRoutes');

const app = express();
const port = 3000;

// Middleware para analizar el cuerpo de las solicitudes
app.use(express.json());
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

// Configurar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
