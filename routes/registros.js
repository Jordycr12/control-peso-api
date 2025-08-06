// Ruta PUT para actualizar registro por ID
router.put('/actualizar/:id', (req, res) => {
    const { id } = req.params;
    const { codigo, descripcion, cantidad, peso } = req.body;

    if (!codigo || !descripcion || !cantidad || !peso) {
        return res.status(400).json({ error: 'Datos incompletos para actualizar' });
    }

    const query = 'UPDATE registros SET codigo = ?, descripcion = ?, cantidad = ?, peso = ? WHERE id = ?';
    pool.query(query, [codigo, descripcion, cantidad, peso, id], (err) => {
        if (err) {
            console.error('Error al actualizar en la BD:', err);
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Registro actualizado correctamente' });
    });
});

// Ruta DELETE para eliminar registro por ID
router.delete('/eliminar/:id', (req, res) => {
    const { id } = req.params;

    const query = 'DELETE FROM registros WHERE id = ?';
    pool.query(query, [id], (err) => {
        if (err) {
            console.error('Error al eliminar en la BD:', err);
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Registro eliminado correctamente' });
    });
});
