const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares base
app.use(cors());
app.use(express.json());

// Ruta principal de verificación
app.get('/', (req, res) => {
  res.json({ message: 'Servidor base respondiendo correctamente en el puerto 3001' });
});

app.listen(PORT, () => {
  console.log(`Servidor backend corriendo en http://localhost:${PORT}`);
});