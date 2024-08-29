const express = require('express');
const sequelize = require('./database/database'); 

const app = express();
const port = 3000;

// Middleware para analizar el cuerpo de las solicitudes
app.use(express.json());


// Verificar y crear la base de datos si no existe
const initDatabase = async () => {
    try {
        // crear la tabla si no existe
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
