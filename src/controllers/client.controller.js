const redisConnection = require('../database/database.js')

const saludoCliente = (req, res) => {
    res.status(200).json({
        products: 'Si jala cliente'
    })
}

const addUser = async (req, res) => {
    // SADD clientes "cliente:RFC12345:nombre:'Juan Perez'"
    const { sucursal, rfc, nombre } =  req.body

    const sucClientKey = `sucursal:${sucursal}:clientes`
    const clientData = `cliente:${rfc}:nombre:${nombre}`

    // Guardar el nuevo cliente en redis
    await redisConnection.sAdd('clientes', clientData);
    await redisConnection.sAdd(sucClientKey, clientData)

    res.status(201).json({
        message: "Successfull",
        data: {
            sucClientKey,
            clientData
        }
    })
}

module.exports = {
    saludoCliente,
    addUser
}