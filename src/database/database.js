const { Sequelize } = require('sequelize');

// Crear una instancia de Sequelize para la base
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'database.sqlite', 
});

module.exports = sequelize;
