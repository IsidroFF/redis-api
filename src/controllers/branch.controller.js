const redisConnection = require('../database/database.js')

const saludoBranch = (req, res) => {
    res.status(200).json({
        products: 'Si jala branch'
    })
}

const addSucursal = async (req, res) => {
    const {
        codigo,
        direccion,
        email,
        celular,
        latitud,
        longitud
    } = req.body

    const sucKey = `sucursal:${codigo}`

    await redisConnection.sendCommand([
        'JSON.SET',
        sucKey,
        '.',
        JSON.stringify({
            codigo,
            direccion,
            email,
            celular,
            latitud,
            longitud
        })
    ]);

    await redisConnection.geoAdd('sucursales_geopos', {
        longitude: longitud,
        latitude: latitud,
        member: sucKey
    })

    res.status(201).json({
        message: "Successfull",
        data: {
            key: sucKey,
            content: {
                codigo,
                direccion,
                email,
                celular,
                ubi: {
                    latitud,
                    longitud
                }
            }
        }
    })
}

const findSucursal = async (req, res) => {
    const {
        longitude,
        latitude,
        radius,
        unit
    } = req.body

    const nearbyBranches = await redisConnection.geoRadius('sucursales_geopos', {
        longitude,
        latitude
    }, radius,
        unit, 'WITHDIST')

    res.status(200).json({
        message: "Successfull",
        data: {
            longitude,
            latitude,
            radius,
            unit,
            nearbyBranches
        }
    })
}

const findMenbers = async (req, res) => {
    const { sucursalId } = req.params
    
    const menbersKey = `sucursal:${sucursalId}:clientes`

    const sucursalMembers = await redisConnection.sMembers(menbersKey)

    res.status(200).json({
        message: "Successfull",
        data:{
            sucursalId,
            sucursalMembers
        }
    })
}

module.exports = {
    saludoBranch,
    addSucursal,
    findSucursal,
    findMenbers
}