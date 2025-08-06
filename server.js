require('dotenv').config();
const express = require('express');
const cors = require('cors');
const registrosRoutes = require('./routes/registros');

const app = express();
const PORT = process.env.PORT || 3000;

// CORS Config
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type']
}));


app.use(express.json());
app.use('/api', registrosRoutes);

app.options('*', cors()); // <-- Esto responderá a las preflight requests (OPTIONS)

app.get('/', (req, res) => {
    res.send('API Control de Peso funcionando.');
});

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});

