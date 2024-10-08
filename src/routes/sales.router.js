// Router de la aplicación
const express = require('express');
const router = express.Router();

// Controladores de las rutas
const { saludoSales, addSale } = require('../controllers/sales.controller.js');

router.get('/hi', saludoSales);
router.post('/add', addSale)

module.exports = router