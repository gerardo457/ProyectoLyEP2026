const express = require('express');
const router = express.Router();
const {
  obtenerClientes,
  obtenerClientePorId,
  crearCliente
} = require('../controllers/clienteController');

router.get('/', obtenerClientes);
router.get('/:id', obtenerClientePorId);
router.post('/', crearCliente);

module.exports = router;