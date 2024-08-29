// src/controllers/clienteController.js
const { Cliente } = require('../database/database');


// Crear un nuevo cliente
const createCliente = async (req, res) => {
    try {
        const { nombre, apellidoPaterno, apellidoMaterno, domicilio, email } = req.body;
        const nuevoCliente = await Cliente.create({ nombre, apellidoPaterno, apellidoMaterno, domicilio, email });
        res.status(201).json(nuevoCliente);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el cliente' });
    }
};


// Obtener clientes 
const getClientes = async (req, res) => {
    try {
        // Verificar si se pasó un id y filtrar
        if (req.params.id) {
            const cliente = await Cliente.findByPk(req.params.id);
            if (cliente) {
                res.status(200).json(cliente);
            } else {
                res.status(404).json({ error: 'Cliente no encontrado' });
            }
        } else {
            // Obtener todos los clientes
            const clientes = await Cliente.findAll();
            res.status(200).json(clientes);
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los clientes' });
    }
};


// Actualizar 
const updateClienteById = async (req, res) => {
    try {
        const { nombre, apellidoPaterno, apellidoMaterno, domicilio, email } = req.body;
        const cliente = await Cliente.findByPk(req.params.id);
        if (cliente) {
            cliente.nombre = nombre;
            cliente.apellidoPaterno = apellidoPaterno;
            cliente.apellidoMaterno = apellidoMaterno;
            cliente.domicilio = domicilio;
            cliente.email = email;
            await cliente.save();
            res.status(200).json(cliente);
        } else {
            res.status(404).json({ error: 'Cliente no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el cliente' });
    }
};

// Eliminar 
const deleteClienteById = async (req, res) => {
    try {
        const cliente = await Cliente.findByPk(req.params.id);
        if (cliente) {
            await cliente.destroy();
            res.status(200).json({ message: 'Cliente eliminado' });
        } else {
            res.status(404).json({ error: 'Cliente no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el cliente' });
    }
};

module.exports = {
    createCliente,
    getClientes,
    updateClienteById,
    deleteClienteById
};
