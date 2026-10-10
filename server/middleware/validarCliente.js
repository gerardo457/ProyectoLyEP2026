const validarCliente = (req, res, next) => {
  const { nombre, email } = req.body;

  // Validación de campos obligatorios
  if (!nombre || !email) {
    return res.status(400).json({
      error: 'Campos obligatorios faltantes',
      mensaje: 'El nombre y el email son requeridos.'
    });
  }

  // Validación básica del formato de email
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!regexEmail.test(email)) {
    return res.status(400).json({
      error: 'Formato de email inválido',
      mensaje: 'Por favor, proporcione un correo electrónico válido.'
    });
  }

  // Si todo está bien, continúa hacia el controlador
  next();
};

module.exports = validarCliente;