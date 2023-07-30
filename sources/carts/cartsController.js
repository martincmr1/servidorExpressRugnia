const {Router} = require ('express')
const fs = require('fs')
const path = require('path')
const carritoFilePath = path.join(process.cwd(), 'carrito.json')
const router = Router()


router.get('/:cid', async (req, res) => {
  try {
    const { cid } = req.params
    const data = await fs.promises.readFile(carritoFilePath, 'utf-8')
    const carts = JSON.parse(data)
    const cartIdSeach = carts.find(cart => cart.id === Number(cid))
    if (cartIdSeach) {
      return res.status(200).json(cartIdSeach)
    } else {
      return res.status(400).json({ message: "id no válido" })
    }
  } catch (error) {
    res.status(500).json({ error: "error en el servidor"})
  }
})


router.post('/:cid/product/:pid', async (req, res) => {
  try {
    const { cid, pid } = req.params
    const productId = parseInt(pid)
    if (isNaN(productId)) {
      return res.status(400).json({ error: "el ID debe ser un número válido" })
    }
    if (productId <= 0) {
      return res.status(400).json({ error: "el ID debe ser mayor o igual a 1" })
    }
    const data = await fs.promises.readFile(carritoFilePath, 'utf-8')
    const carts = JSON.parse(data);
    const cart = carts.find(cart => cart.id === Number(cid))
   if (!cart) {
      return res.status(400).json({message :"el id del carrito no es válido"})
    }
    const product = cart.products.find(product => product.id === Number(pid))
    if (product) {
      product.quantity += 1
    } else {
      const newProduct = {
        id: Number(pid),
        quantity: 1
      }
      cart.products.push(newProduct)
    }
    await fs.promises.writeFile(carritoFilePath, JSON.stringify(carts, null, 2), 'utf-8')
    res.status(200).json({ message: `El producto con el ID ${pid} fue agregado correctamente al carrito ${cid}`})
  } catch (error) {
    res.status(500).json({ error: "error en el servidor" })
  }
})

router.post('/', async (req, res) => {
  try {
    const id=Date.now()
    const products=[]
    const newCart = {
        id,
        products
    } 
  const data = await fs.readFileSync(carritoFilePath,'utf-8')
  const carts = JSON.parse(data)
  carts.push(newCart)    
    await fs.promises.writeFile(carritoFilePath, JSON.stringify(carts, null, 2),'utf-8')
    res.status(200).json({ message: "Carrito agregado correctamente", newCart })
  } catch (error) {
    res.status(500).json({ error: "error en el servidor"})
  }
})


module.exports = router

