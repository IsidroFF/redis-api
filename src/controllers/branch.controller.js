const redisConnection = require('../database/database.js');

const saludoBranch = (req, res) => {
    res.status(200).json({
        products: 'Si jala branch'
    });
}

const addSucursal = async (req, res) => {
    try {
        const {
            codigo,
            direccion,
            email,
            celular,
            latitud,
            longitud
        } = req.body;

        const sucKey = `sucursal:${codigo}`;

        // Guardar los datos de la sucursal
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

        // Agregar la sucursal a los datos geográficos
        await redisConnection.geoAdd('sucursales_geopos', {
            longitude: longitud,
            latitude: latitud,
            member: sucKey
        });

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
        });
    } catch (error) {
        res.status(500).json({
            message: "Error al agregar la sucursal",
            error
        });
    }
}

const findSucursal = async (req, res) => {
    const {
        longitude,
        latitude,
        radius,
        unit
    } = req.body;

    try {
        const nearbyBranches = await redisConnection.geoRadius('sucursales_geopos', {
            longitude,
            latitude
        }, radius, unit, 'WITHDIST');

        res.status(200).json({
            message: "Successfull",
            data: {
                longitude,
                latitude,
                radius,
                unit,
                nearbyBranches
            }
        });
    } catch (error) {
        res.status(500).json({
            message: "Error al consultar las sucursales cercanas",
            error
        });
    }
}

const findMenbers = async (req, res) => {
    const { sucursalId } = req.params;
    const menbersKey = `sucursal:${sucursalId}:clientes`;

    try {
        const sucursalMembers = await redisConnection.sMembers(menbersKey);

        res.status(200).json({
            message: "Successfull",
            data: {
                sucursalId,
                sucursalMembers
            }
        });
    } catch (error) {
        res.status(500).json({
            message: "Error al obtener los miembros de la sucursal",
            error
        });
    }
}

module.exports = {
    saludoBranch,
    addSucursal,
    findSucursal,
    findMenbers
}
