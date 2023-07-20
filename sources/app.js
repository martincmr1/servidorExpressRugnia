const express = require('express');
const ProductManager = require('./ProductManager');

const productManager = new ProductManager('Productos.json'); 

const port = 8080;
const app = express();

app.listen(port, () => {
  console.log(`Server running at port ${port}`);
});

app.get('/products/:pid', async (req, res) => {
try {
  const {pid} = req.params
  const products = await productManager.getProducts()
  const productId = JSON.parse(products)
  const productIdSeach = productId.find(products => products.id === Number(pid) )
  if (productIdSeach)
  res.json(JSON.stringify(productIdSeach))
  else {
    res.json ({mesagge:"id no encontrado"})
  }
} catch (error) {
  res.json({message:"id no encontrado"})
  
}  
})

app.get('/products/', async (req, res) => {
  const  {limit} = req.query
  if (limit) {
    try {
      const products = await productManager.getProducts();
      const productsFilter = JSON.parse(products)
      const productosFiltrados = productsFilter.slice(0,req.query.limit || 10)
      return res.json(JSON.stringify(productosFiltrados))
    } catch (error) {      
    }
  }   
  try {
    const products = await productManager.getProducts();
    res.json(products);
  } catch (error) {
    res.json({mesagge:"error"});
  }
});





