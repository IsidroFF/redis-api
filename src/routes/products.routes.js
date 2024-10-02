// Router de la aplicación
const express = require('express');
const router = express.Router();

// Controladores de las rutas
const {
    saludoProductos,
} = require("../controllers/products.controller.js")

router.get('/hi', saludoProductos);

module.exports = router