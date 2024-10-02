// Router de la aplicación
const express = require('express');
const router = express.Router();

// Controladores de las rutas
const { saludoSales } = require('../controllers/sales.controller.js');

router.get('/hi', saludoSales);

module.exports = router