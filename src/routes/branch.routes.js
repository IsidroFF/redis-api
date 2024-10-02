// Router de la aplicación
const express = require('express');
const router = express.Router();

// Controladores de las rutas
const { saludoBranch } = require('../controllers/branch.controller.js');

router.get('/hi', saludoBranch);

module.exports = router