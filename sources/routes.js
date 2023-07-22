const ProductManager = require ('./ProductManager')
const productManager = new ProductManager('Productos.json')
const allProductsRoutes = ('/products/')
const idProductRoutes = ('/products/:pid')
const productList = productManager.getProducts()

const controllerAllProduct = async (req, res) => {
    const  {limit} = req.query
   if (+limit < 11 ) {
      try {
        const products = await productList;
        const productsFilter = JSON.parse(products)
        const productosFiltrados = productsFilter.slice(0,req.query.limit || 10)
        return res.status(200).json(JSON.stringify(productosFiltrados))        
      } catch (error) {res.status(400).json({error : 'no se encontaron los productos'})
      }
    } else {
      try {
        const products = await productList;
       return res.status(200).json(products);
      } catch (error) {{res.status(500).json({error : 'error internal server'})
    }     
    }    
}}
  

const controllerProductById = async (req, res) => {
  try {
      const {pid} = req.params
      const products = await productList
      const productId = JSON.parse(products)
      const productIdSeach = productId.find(products => products.id === Number(pid))
      if (productIdSeach)
      res.status(200).json(JSON.stringify(productIdSeach))
      else {
        res.status(400).json ({mesagge:"id no encontrado"})
      }
    } catch (error) {
      res.status(500).json({message:"error internal server"})      
}}
      


module.exports = {
    allProductsRoutes,idProductRoutes,controllerAllProduct,controllerProductById,}