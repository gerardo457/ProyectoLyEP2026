const express = require('express');
const cors = require('cors');
require('dotenv').config();
const conectarDB = require('./config/db');
const clienteRoutes = require('./routes/clienteRoutes');

const app = express();
const PORT = process.env.PORT || 3001;

conectarDB();

app.use(cors());
app.use(express.json());

app.use('/api/clientes', clienteRoutes);

app.get('/', (req, res) => {
  res.send('API de Control de Clientes corriendo correctamente');
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});