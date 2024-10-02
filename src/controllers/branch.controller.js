const saludoBranch = (req, res) => {
    res.status(200).json({
        products: 'Si jala branch'
    })
}

module.exports = {
    saludoBranch
}