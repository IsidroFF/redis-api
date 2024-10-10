const redisConnection = require("../database/database.js");

const saludoSales = (req, res) => {
    res.status(200).json({
        products: 'Si jala sales'
    });
}

const addSale = async (req, res) => {
    try {
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

        // Respuesta exitosa
        res.status(201).json({
            message: 'Successfull',
            data: {
                saleKey,
                saleData
            }
        });
    } catch (error) {
        // Manejo de errores
        res.status(500).json({
            message: "Error al agregar la venta",
            error
        });
    }
}

module.exports = {
    saludoSales,
    addSale
}
