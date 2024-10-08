// Router de la aplicación
const express = require('express');
const router = express.Router();

// Controladores de las rutas
const { saludoBranch, addSucursal, findSucursal, findMenbers } = require('../controllers/branch.controller.js');

router.get('/hi', saludoBranch);
router.post('/add', addSucursal);
router.get('/find', findSucursal);
router.get('/:sucursalId/clients', findMenbers)

module.exports = router