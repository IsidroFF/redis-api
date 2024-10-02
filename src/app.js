const express = require("express");

// Rutas de la api
const ProductsRouter = require('./routes/products.routes.js');
const ClientRouter = require('./routes/client.routes.js');
const SalesRouter = require('./routes/sales.router.js');
const BranchRouter = require('./routes/branch.routes.js');

const app = express();

// Permitir JSON en las peticiones
app.use(express.json());

// Ruta para comprobar el funcionamiento de la api
app.get('/hi', function (req, res) {
  res.status(200).json({ 
    message: "Hola, si estoy en corriendo"
  });
});

// Rutas de redis
app.use('/products', ProductsRouter);
app.use('/client', ClientRouter);
app.use('/sales', SalesRouter);
app.use('/branch', BranchRouter);

// Exportamos la aplicacion de express creada
module.exports = app