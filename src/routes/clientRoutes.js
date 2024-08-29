// src/routes/clienteRoutes.js
const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/clientController');

// Crear un nuevo cliente
router.post('/clientes', clienteController.createCliente);

// Obtener todos los clientes o un cliente por ID
router.get('/clientes/:id?', clienteController.getClientes);

// Actualizar un cliente por ID
router.put('/clientes/:id', clienteController.updateClienteById);

// Eliminar un cliente por ID
router.delete('/clientes/:id', clienteController.deleteClienteById);

module.exports = router;
