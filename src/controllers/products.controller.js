const redisConnection = require('../database/database.js');

const saludoProductos = (req, res) => {
    res.status(200).json({
        products: 'Si jala producto'
    });
}

const getProductInfo = async (req, res) => {
    try {
        const { keyValue } = req.params;

        // Obtener información del producto desde Redis
        const productInfo = await redisConnection.hGetAll(keyValue);

        // Respuesta exitosa
        res.status(200).json({
            message: "Successfull",
            data: productInfo
        });
    } catch (error) {
        // Manejo de errores
        res.status(500).json({
            message: "Error al obtener la información del producto",
            error
        });
    }
}

const addProduct = async (req, res) => {
    try {
        // Desestructurar la información del cuerpo de la petición
        const {
            productId,
            sucursalId,
            nombre,
            precio,
            categoria
        } = req.body;

        // Generar la clave de búsqueda
        const keyValue = `producto:${productId}:sucursal:${sucursalId}`;

        // Guardar la información del producto en Redis
        await redisConnection.hSet(keyValue, {
            nombre,
            precio,
            categoria
        });

        // Respuesta exitosa
        res.status(200).json({
            message: "Successfull",
            data: {
                keyValue,
                nombre,
                precio,
                categoria
            }
        });
    } catch (error) {
        // Manejo de errores
        res.status(500).json({
            message: "Error al agregar el producto",
            error
        });
    }
}

module.exports = {
    saludoProductos,
    getProductInfo,
    addProduct
}
