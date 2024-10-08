// Router de la aplicación
const express = require('express');
const router = express.Router();

// Controladores de las rutas
const {
    saludoProductos,
    getProductInfo,
    addProduct,
} = require("../controllers/products.controller.js")

router.get('/hi', saludoProductos);
router.get('/:keyValue', getProductInfo)
router.post('/add', addProduct)

module.exports = router