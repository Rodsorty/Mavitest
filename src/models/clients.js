const express = require('express');
const { DataTypes } = require('sequelize');
const sequelize = require('../database/database'); 

//ORM qiue Servira para crear la base sino existe
const Cliente = sequelize.define('Cliente', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    apellidoPaterno: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    apellidoMaterno: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    domicilio: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
}, {
    tableName: 'clientes',
    timestamps: false, 
});

module.exports = Cliente;
