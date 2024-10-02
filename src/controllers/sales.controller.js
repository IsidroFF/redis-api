const saludoSales = (req, res) => {
    res.status(200).json({
        products: 'Si jala sales'
    })
}

module.exports = {
    saludoSales
}