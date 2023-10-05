const {Router} = require ('express')
const CartsManagerMongo = require('../Dao/CartsManagerMongo')
const router = Router()

const cartsManagerMongo= new CartsManagerMongo()

router.get('/:cid',cartsManagerMongo.getCartbyId.bind(cartsManagerMongo))

router.post('/:cid/products/:pid',cartsManagerMongo.addProductToCart.bind(cartsManagerMongo))

router.post('/',cartsManagerMongo.createCart.bind(cartsManagerMongo))

router.delete('/:cid/products/:pid',cartsManagerMongo.deleteProductToCart.bind(cartsManagerMongo))

router.put('/:cid',cartsManagerMongo.updateCart.bind(cartsManagerMongo))

router.put('/:cid/products/:pid',cartsManagerMongo.updateQuantityProduct.bind(cartsManagerMongo))

router.delete('/:cid',cartsManagerMongo.deleteAllProductsToCart.bind(cartsManagerMongo))

module.exports = router