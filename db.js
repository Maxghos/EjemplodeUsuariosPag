require('dotenv').config(); // Carga las variables de entorno
const { Pool } = require('pg'); // Importa Pool de pg

const pool = new Pool({
    connectionString: process.env.DATABASE_URL, // URL desde el archivo .env
    ssl: { rejectUnauthorized: false }, // Necesario para Railway
});

module.exports = pool; // Exporta el pool para usarlo en otros archivos
