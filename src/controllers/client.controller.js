const redisConnection = require('../database/database.js');

const saludoCliente = (req, res) => {
    res.status(200).json({
        products: 'Si jala cliente'
    });
}

const addUser = async (req, res) => {
    try {
        // Desestructurar los datos del cuerpo de la petición
        const { sucursal, rfc, nombre } = req.body;

        // Claves de Redis para guardar la información del cliente
        const sucClientKey = `sucursal:${sucursal}:clientes`;
        const clientData = `cliente:${rfc}:nombre:${nombre}`;

        // Guardar el nuevo cliente en Redis
        await redisConnection.sAdd('clientes', clientData);
        await redisConnection.sAdd(sucClientKey, clientData);

        // Respuesta exitosa
        res.status(201).json({
            message: "Successfull",
            data: {
                sucClientKey,
                clientData
            }
        });
    } catch (error) {
        // Manejo de errores
        res.status(500).json({
            message: "Error al agregar el cliente",
            error
        });
    }
}

module.exports = {
    saludoCliente,
    addUser
}
