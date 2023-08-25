const Carts = require("./models/carts.model")

class CartsManagerFs {
     async createCart(req, res) {
        try {
          const id = Date.now();
          const products = [];
          const newCart = {
            id,
            products
          };
          const createdCart = await Carts.create(newCart);
          res.status(200).json({ message: "Carrito agregado correctamente", newCart: createdCart });
        } catch (error) {
          res.status(500).json({ error: "error en el servidor" });
        }
      }
    
async getCartbyId(req,res){
    try {
        const { cid } = req.params
        const data = await Carts.findById(cid)    
        res.status(200).json({message: data})
      } catch (error) {
        res.status(500).json({ error: "error en el servidor"})
      }
    }
  
async  addProductToCart(req, res) {
      try {
        const { cid, pid } = req.params;
        const productId = parseInt(pid);
        if (isNaN(productId)) {
          return res.status(400).json({ error: "El id no es válido" });
        }
      if (productId <= 0) {
          return res.status(400).json({ error: "El id debe ser igual o mayor que 1" });
        }
      const cart = await Carts.findOne({ id: Number(cid) });
    if (!cart) {
          return res.status(400).json({ message: "El Id del carrito no es válido" });
        }
    const existingProduct = cart.products.find(product => product.id === Number(pid));
    if (existingProduct) {
          existingProduct.quantity += 1;
        } else {
          cart.products.push({ id: Number(pid), quantity: 1 });
        }
    await cart.save(); 
    res.status(200).json({ message: `El producto con ID ${pid} fue agregado exitosamente al carrito ${cid}` });
      } catch (error) {
        res.status(500).json({ error: "Error en el servidor" });
      }
    }
}


module.exports = CartsManagerFs

