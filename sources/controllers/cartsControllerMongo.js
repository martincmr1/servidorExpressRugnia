const {Router} = require ('express')
const CartsManagerMongo = require('../Dao/CartsManagerMongo')
const router = Router()

const cartsManagerMongo= new CartsManagerMongo()

router.get('/:cid',cartsManagerMongo.getCartbyId.bind(cartsManagerMongo))

router.post('/:cid/product/:pid',cartsManagerMongo.addProductToCart.bind(cartsManagerMongo))

router.post('/',cartsManagerMongo.createCart.bind(cartsManagerMongo))


module.exports = router