const express = require('express');
const pool = require('./db'); // Importa la configuración de la base de datos
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Endpoint para registrar al weon
app.post('/api/register', async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // Verificar si el usuario ya existe
        const userExists = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if (userExists.rows.length > 0) {
            return res.status(400).json({ success: false, message: 'El usuario ya está registrado.' });
        }

        // Insertar el usuario en la base de datos sin hashear la contraseña
        const result = await pool.query(
            'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id',
            [username, email, password]
        );

        res.status(201).json({ success: true, userId: result.rows[0].id, message: 'Usuario registrado exitosamente.' });
    } catch (err) {
        console.error('Error al registrar usuario:', err);
        res.status(500).json({ success: false, message: 'Error al registrar usuario.', error: err.message });
    }
});




//Endpoint de Inicio de Sesión
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Buscar al usuario por email
        const user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if (user.rows.length === 0) {
            return res.status(400).json({ success: false, message: 'Usuario no encontrado.' });
        }

        // Comparar contraseñas directamente (sin hashear)
        if (user.rows[0].password !== password) {
            return res.status(400).json({ success: false, message: 'Contraseña incorrecta.' });
        }

        res.status(200).json({ success: true, message: 'Inicio de sesión exitoso.' });
    } catch (err) {
        console.error('Error al iniciar sesión:', err);
        res.status(500).json({ success: false, message: 'Error al iniciar sesión.', error: err.message });
    }
});





// Inicia el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
