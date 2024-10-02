const saludoCliente = (req, res) => {
    res.status(200).json({
        products: 'Si jala cliente'
    })
}

module.exports = {
    saludoCliente
}