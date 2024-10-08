const redisConnection = require('../database/database.js')

const saludoProductos = (req, res) => {
    res.status(200).json({
        products: 'Si jala producto'
    })
}

const getProductInfo = async (req,res) => {
    const { keyValue } = req.params

    const productInfo = await redisConnection.hGetAll(keyValue)

    res.status(200).json({
        message: "Successfull",
        data: productInfo
    })
}

const addProduct = async (req, res) => {
    // Desestrcutrar la info del body
    const {
        productId,
        sucursalId,
        nombre,
        precio,
        categoria
    } = req.body

    // Generar la key de busqueda
    const keyValue = `producto:${productId}:sucursal:${sucursalId}`

    // Guardar la informacion en redis
    await redisConnection.hSet(keyValue, {
        nombre,
        precio, 
        categoria
    })

    // Enviamos la respueta del servidor
    res.status(200).json({
        message: "Successfull",
        data:{
            keyValue,
            nombre,
            precio,
            categoria
        }
    })

}

module.exports = {
    saludoProductos,
    getProductInfo,
    addProduct
}