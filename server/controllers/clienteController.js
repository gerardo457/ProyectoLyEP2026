const Cliente = require('../models/Cliente');

const obtenerClientes = async (req, res) => {
  try {
    const clientes = await Cliente.find().sort({ createdAt: -1 });
    res.status(200).json(clientes);
  } catch (error) {
    res.status(500).json({ 
      mensaje: 'Error al obtener los clientes', 
      error: error.message 
    });
  }
};

const obtenerClientePorId = async (req, res) => {
  try {
    const cliente = await Cliente.findById(req.params.id);
    
    if (!cliente) {
      return res.status(404).json({ mensaje: 'Cliente no encontrado' });
    }

    res.status(200).json(cliente);
  } catch (error) {
    res.status(500).json({ 
      mensaje: 'Error al obtener el cliente', 
      error: error.message 
    });
  }
};

const crearCliente = async (req, res) => {
  try {
    const { nombre, apellido, email, telefono, ciudad, calle, numero, codigoPostal } = req.body;

    if (!nombre || !email || !telefono || !ciudad) {
      return res.status(400).json({ 
        mensaje: 'Por favor complete los campos obligatorios (nombre, email, teléfono, ciudad)' 
      });
    }

    const nuevoCliente = new Cliente({
      nombre,
      apellido,
      email,
      telefono,
      ciudad,
      calle,
      numero,
      codigoPostal
    });

    const clienteGuardado = await nuevoCliente.save();
    res.status(201).json(clienteGuardado);
  } catch (error) {
    res.status(500).json({ 
      mensaje: 'Error al crear el cliente', 
      error: error.message 
    });
  }
};

// --- FUNCIONES AGREGADAS POR PABLO (Actualizar y Eliminar) ---

const actualizarCliente = async (req, res) => {
  try {
    const clienteActualizado = await Cliente.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!clienteActualizado) {
      return res.status(404).json({ mensaje: 'Cliente no encontrado para actualizar' });
    }

    res.status(200).json(clienteActualizado);
  } catch (error) {
    res.status(500).json({ 
      mensaje: 'Error al actualizar el cliente', 
      error: error.message 
    });
  }
};

const eliminarCliente = async (req, res) => {
  try {
    const clienteEliminado = await Cliente.findByIdAndDelete(req.params.id);

    if (!clienteEliminado) {
      return res.status(404).json({ mensaje: 'Cliente no encontrado para eliminar' });
    }

    res.status(200).json({ mensaje: 'Cliente eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ 
      mensaje: 'Error al eliminar el cliente', 
      error: error.message 
    });
  }
};

module.exports = {
  obtenerClientes,
  obtenerClientePorId,
  crearCliente,
  actualizarCliente,
  eliminarCliente
};