const express = require('express');
const cors = require('cors');
require('dotenv').config();
const conectarDB = require('./config/db');

const app = express();
const PORT = process.env.PORT || 3001;

// Conectar a la Base de Datos
conectarDB();

// Middlewares base
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('API de Control de Clientes corriendo correctamente');
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});