const redisConnection = require("../database/database.js")

const saludoSales = (req, res) => {
    res.status(200).json({
        products: 'Si jala sales'
    })
}

const addSale = async (req, res) => {
    const {
        sucursal,
        ventas,
        venta,
        producto,
        cantidad,
        costo_unitario,
        total,
        cliente,
        fecha,
        hora
    } = req.body;

    const saleKey = `sucursal:${sucursal}:ventas:${ventas}`;

     // Crear el string que se añadirá a la lista
     const saleData = `VENTA:${venta}:PRODUCTO:${producto}:CANTIDAD:${cantidad}:COSTO_UNITARIO:${costo_unitario}:TOTAL:${total}:CLIENTE:${cliente}:SUCURSAL:${sucursal}:FECHA:${fecha}:HORA:${hora}`;

     // Agregar la venta a la lista de Redis usando RPUSH
     await redisConnection.rPush(saleKey, saleData);

     res.status(200).json({
        message: 'Successfull',
        data: {
            saleKey,
            saleData
        }
    });
}

module.exports = {
    saludoSales,
    addSale
}