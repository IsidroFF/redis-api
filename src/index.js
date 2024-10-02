// Imports
const redisConnection = require("./database/database.js");
const { createClient } = require('redis');
const app = require('./app.js')
const dotenv = require('dotenv');

// Configuraciones de las variables de entorno
dotenv.config();
const PORT = process.env.PORT;

// Conexión con la base de datos
const redisClient = redisConnection
    .on('error', err => console.log('Redis Client Error', err))
    .connect()
    .then(() => console.log("Conectado a redis"));

// Ejecución de la aplicación
app.listen(PORT, () => {
    console.log(`App  listen in port ${PORT}`);
});

// Cliente a
module.exports = redisClient