const express = require('express');
const router = express.Router();
const mysql = require('mysql2');
const fs = require('fs');
const path = require('path');

// Intentar leer el certificado SSL (ca.pem)
let caCert;
try {
    caCert = fs.readFileSync(path.join(__dirname, '../ca.pem'));
} catch (err) {
    console.error('Error leyendo ca.pem:', err);
}

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    ssl: {
        ca: caCert
    }
});

// Ruta POST para guardar registros
router.post('/guardar', (req, res) => {
    const { codigo, descripcion, cantidad, peso } = req.body;
    if (!codigo || !descripcion || !cantidad || !peso) {
        return res.status(400).json({ error: 'Datos incompletos' });
    }

    const query = 'INSERT INTO registros (codigo, descripcion, cantidad, peso) VALUES (?, ?, ?, ?)';
    pool.query(query, [codigo, descripcion, cantidad, peso], (err) => {
        if (err) {
            console.error('Error al insertar en la BD:', err);
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Registro guardado correctamente' });
    });
});

module.exports = router;
