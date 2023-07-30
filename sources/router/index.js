const cartsController = require('../carts/cartsController')
const productsController = require('../products/productsController')

const router = app => {
    app.use('/api/products',productsController)
    app.use('/api/carts',cartsController)
}


module.exports =router