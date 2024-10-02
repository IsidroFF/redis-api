// Router de la aplicación
const express = require('express');
const router = express.Router();

// Controladores de las rutas
const { saludoCliente } = require('../controllers/client.controller.js');

router.get('/hi', saludoCliente);

module.exports = router