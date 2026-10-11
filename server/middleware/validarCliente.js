const validarCliente = (req, res, next) => {
  const { nombre, email, telefono, ciudad } = req.body;

  // Si es creación (POST), exigir campos obligatorios
  if (req.method === 'POST') {
    if (!nombre || !email || !telefono || !ciudad) {
      return res.status(400).json({
        error: 'Campos obligatorios faltantes',
        mensaje: 'El nombre, email, teléfono y ciudad son requeridos.'
      });
    }
  }

  // Validación básica del formato de email si viene en la petición
  if (email) {
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regexEmail.test(email)) {
      return res.status(400).json({
        error: 'Formato de email inválido',
        mensaje: 'Por favor, proporcione un correo electrónico válido.'
      });
    }
  }

  // Si todo está bien, continúa hacia el controlador
  next();
};

module.exports = validarCliente;