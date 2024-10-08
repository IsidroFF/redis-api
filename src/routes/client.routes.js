// Router de la aplicación
const express = require('express');
const router = express.Router();

// Controladores de las rutas
const { saludoCliente, addUser } = require('../controllers/client.controller.js');

router.get('/hi', saludoCliente);
router.post('/add', addUser)

module.exports = router