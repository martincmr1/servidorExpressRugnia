const {Router} = require ('express')
const ProductManagerRealtime = require('../Dao/ProductManagerRealtime')
const router = Router()

const productManagerRealtime = new ProductManagerRealtime()

router.get('/',productManagerRealtime.getProducts.bind(productManagerRealtime))

router.post('/',productManagerRealtime.addProducts.bind(productManagerRealtime))

router.delete('/:pid',productManagerRealtime.deleteProduct.bind(productManagerRealtime))


module.exports =router
