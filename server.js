require('dotenv').config();
const express = require('express');
const cors = require('cors');
const registrosRoutes = require('./routes/registros');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors()); // <----- AQUI ACTIVAS CORS PARA TODOS LOS DOMINIOS
app.use(express.json());
app.use('/api', registrosRoutes);

app.get('/', (req, res) => {
    res.send('API Control de Peso funcionando.');
});

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
