
const {Router} = require ('express')
const uploader = require('../utils/multer')
const fs = require('fs')
const path = require('path')
const productsFilePath = path.join(process.cwd(), 'productos.json')
const router = Router()


router.get('/', async (req, res) => {
  const { limit } = req.query;
  if (+limit < 11) {
    try {
      const products = await fs.promises.readFile(productsFilePath, 'utf-8');
      const productsFilter = JSON.parse(products);
      const productosFiltrados = productsFilter.slice(0, req.query.limit || 10);
      res.render('realtimeProducts', { productosFiltrados, style: 'home' }); 
    } catch (error) {
      res.status(400).json({ message: "No se encontraron los productos" });
    }
  } else {
    try {
      const products = await fs.promises.readFile(productsFilePath, 'utf-8');
      const productsFilter = JSON.parse(products);
      res.render('realtimeProducts', { productsFilter, style: 'home' });
    } catch (error) {
      res.status(500).json({ message: "Error en el servidor" });
    }
  }
});


router.get('/:pid', async (req, res) => {
    try {
      const { pid } = req.params
      const products = await fs.promises.readFile(productsFilePath,'utf-8')
      const productsFilter = JSON.parse(products)
      const productIdSeach = productsFilter.find(product => product.id === Number(pid))
      if (productIdSeach) {
        res.status(200).json(productIdSeach)
      } else {
        res.status(400).json({ message: "ID no encontrado" })
      }
    } catch (error) {
      res.status(500).json({ message: "Ha ocurrido un error en el servidor" })
    }
  })
   

router.post('/', uploader.single('file'), async (req, res) => {
    try {
      const id = Date.now()
      const { title, description, code, price, stock, category, thumbnails, status } = req.body
      if (!title || !description || !code || !price || !stock || !category || !status) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios' })
      }
      const parsedPrice = parseFloat(price)
      const parsedStock = parseInt(stock, 10)  
      if (isNaN(parsedPrice) || isNaN(parsedStock)) {
        return res.status(400).json({ message: 'El precio y el stock deben ser números válidos' })
      }
      const thumbnailsArray = thumbnails ? thumbnails.split(',') : []
      const infoProduct = {
        id,
        title,
        description,
        price: parsedPrice,
        code,
        stock: parsedStock,
        status, 
        category,
        thumbnails: thumbnailsArray,
      }
      const data = await fs.promises.readFile(productsFilePath, 'utf-8')
      const products = JSON.parse(data)
      products.push(infoProduct)
      await fs.promises.writeFile(productsFilePath, JSON.stringify(products, null, 2), 'utf-8')
      res.status(200).json({ message: "Producto agregado exitosamente", infoProduct })        
    } catch (error) {
      res.status(400).json({ message: "Error recibiendo el producto" })
  }
})
   

router.put('/:pid', async (req, res) => {
  try {
    const id = parseInt(req.params.pid, 10)
    const { title, description, code, price, stock, category, thumbnails, status } = req.body
    if (!title || !description || !code || !price || !stock || !category || !status) {
      return res.status(400).json({ message: 'Todos los campos son obligatorios' })
    }
    const parsedPrice = parseFloat(price);
    const parsedStock = parseInt(stock, 10);
    if (isNaN(parsedPrice) || isNaN(parsedStock)) {
      return res.status(400).json({ message: 'El precio y el stock deben ser números válidos' })
    } 
    const updatedFields = req.body
    const productsContent = await fs.promises.readFile(productsFilePath, 'utf-8')
    const productos = JSON.parse(productsContent)
    const productIndex = productos.findIndex((product) => product.id === id)
    if (productIndex !== -1) {
    updatedFields.price = parseFloat(updatedFields.price)
    updatedFields.stock = parseInt(updatedFields.stock)
    const updatedProduct = {
    ...productos[productIndex],
    ...updatedFields,
    } 
    updatedProduct.id = id 
    productos[productIndex] = updatedProduct  
    await fs.promises.writeFile(productsFilePath, JSON.stringify(productos, null, 2))
    res.status(200).json({ message: "Producto actualizado correctamente", updatedProduct })
    } else {
    res.status(404).json({ message: 'Id no encontrado' })
    }
    } catch (error) {
    res.status(500).json({ message:"error en el servidor"})
    }
})
  

router.delete('/:pid', async (req, res) => {
  try {
    const id = parseInt(req.params.pid, 10)
    const data = await fs.promises.readFile(productsFilePath, 'utf-8')
    const productos = JSON.parse(data)
    const index = productos.findIndex(product => product.id === id)
    if (index !== -1) {
    productos.splice(index, 1)
    await fs.promises.writeFile(productsFilePath, JSON.stringify(productos))
    res.status(200).json({ message: `Producto ID ${id} eliminado exitosamente` });
    } else {
    res.status(404).json({ message: "el ID no es válido" })
    }
    } catch (error) {
    res.status(500).json({ message: "Ha ocurrido un error en el servidor" })
    }
})
    

module.exports = router
