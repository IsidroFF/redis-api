const saludoProductos = (req, res) => {
    res.status(200).json({
        products: 'Si jala producto'
    })
}

module.exports = {
    saludoProductos
}