const cartsController = require('../carts/cartsController')
const productsController = require('../products/productsController')
const realTimeProductsController = require('../products/realTimeProductsController')

const router = app => {
    app.use('/api/products',productsController)
    app.use('/api/carts',cartsController)
    app.use('/realtimeproducts',realTimeProductsController)
}

module.exports =router