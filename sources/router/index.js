const cartsController = require('../controllers/cartsController')
const productsController = require('../controllers/productsController')
const realTimeProductsController = require('../controllers/realTimeProductsController')
const mongoProductsController= require('../controllers/mongoProductsController')
const cartsControllerMongo= require('../controllers/cartsControllerMongo')
const chatControllerMongo=require('../controllers/chatControllerMongo')

const router = app => {
    app.use('/api/products',productsController)
    app.use('/api/carts',cartsController)
    app.use('/realtimeproducts',realTimeProductsController)
    app.use('/mongo',mongoProductsController)
    app.use('/cartsMongo',cartsControllerMongo)
    app.use('/chat',chatControllerMongo)
}

module.exports =router