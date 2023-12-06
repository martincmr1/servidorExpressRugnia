const Carts = require("./models/carts.model");
const Products = require("./models/product.model");
const Users = require("./models/users.model");

class CartsManagerFs {
  async createCart(req, res) {
    try {
      const id = Date.now();
      const products = [];
      const newCart = {
        id,
        products,
      };
      const createdCart = await Carts.create(newCart);
      res.status(200).json({
        message: "Carrito agregado correctamente",
        newCart: createdCart,
      });
    } catch (error) {
      res.status(500).json({ error: "error en el servidor" });
    }
  }

  async getCartbyId(req, res) {
    try {
      const { cid } = req.params;
  
      let user = null;
      if (req.session && req.session.user && req.session.user.email) {
        const userEmail = req.session.user.email;
        const foundUser = await Users.findOne({ email: userEmail });
  


        if (foundUser) {
          user = {
            name: foundUser.first_name,
            email: foundUser.email,
            role: foundUser.role,
            age: foundUser.age,
            cart:foundUser.cart._id

          };
        }
      }




      // Buscar el carrito por su ID y obtener solo los productos asociados a ese carrito
      const cart = await Carts.findById(cid).lean().populate("products._id");
      const productIds = cart.products.map(product => product._id);
  
      // Encontrar los productos cuyos IDs estén presentes en el carrito
      const products = await Products.find({ _id: { $in: productIds } });
  
      res.render("cartId", { cart: cart, products: products,user:user });
    } catch (error) {
      res.status(500).json({ error: "Error en el servidor" });
    }
  }
  async addProductToCart(req, res) {
    try {
      const { cid, pid } = req.params;
      const { quantity } = req.body; // Asegúrate de enviar 'quantity' en el cuerpo de la solicitud
  
      const product = await Products.findById(pid);
  
      if (!product) {
        return res.status(404).json({ message: "Producto no encontrado" });
      }
  
      const cart = await Carts.findById(cid);
  
      const existingProductIndex = cart.products.findIndex(
        (cartProduct) => cartProduct._id.toString() === pid
      );
  
      if (existingProductIndex !== -1) {
        // Si el producto ya está en el carrito, actualiza su cantidad según lo recibido
        cart.products[existingProductIndex].quantity += parseInt(quantity, 10);
      } else {
        // Si no está en el carrito, agrégalo con la cantidad recibida
        cart.products.push({
          _id: product._id,
          quantity: parseInt(quantity, 10) || 1, // Si la cantidad no está presente, asume 1
        });
      }
  
      await cart.save();
  
      res.status(200).json({
        message: `El producto con ID ${pid} fue agregado exitosamente al carrito ${cid}`,
      });
    } catch (error) {
      res.status(500).json({ error: "Error en el servidor" });
    }
  }
  
 

  async deleteProductToCart(req, res) {
    try {
      const { cid, pid } = req.params;

      const cartId = cid;
      const productId = pid;

      const result = await Carts.updateOne(
        { _id: cartId },
        { $pull: { products: { _id: productId } } }
      );

      if (result.nModified === 0) {
        return res
          .status(400)
          .json({ message: "El producto no se encontró en el carrito" });
      }

      res.status(200).json({
        message: `El producto con ID ${productId} fue eliminado exitosamente del carrito ${cartId}`,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error en el servidor" });
    }
  }

  async updateCart(req, res) {
    try {
      const { cid } = req.params;
      const { products } = req.body;
      console.log(cid, products);

      const cartId = cid;

      if (!Array.isArray(products)) {
        return res.status(400).json({ error: "Los datos no son válidos" });
      }

      const cart = await Carts.findOneAndUpdate(
        { _id: cartId },
        { products },
        { new: true }
      );

      if (!cart) {
        return res
          .status(400)
          .json({ message: "El ID del carrito no es válido" });
      }

      res.status(200).json({
        message: `El carrito con ID ${cartId} fue actualizado exitosamente`,
        cart,
      });
    } catch (error) {
      res.status(500).json({ error: "Error en el servidor" });
    }
  }

  async updateQuantityProduct(req, res) {
    try {
      const { cid, pid } = req.params;
      const { quantity } = req.body;
      console.log(cid, pid, quantity);

      const cartId = cid;

      if (isNaN(quantity)) {
        return res.status(400).json({ error: "La cantidad no es válida" });
      }

      const cart = await Carts.findOne({ _id: cartId });
      console.log(cart);
      if (!cart) {
        return res
          .status(400)
          .json({ message: "El ID del carrito no es válido" });
      }
      const existingProduct = cart.products.find(
        (product) => product._id.toString() === pid
      );

      console.log(existingProduct);
      if (!existingProduct) {
        return res
          .status(400)
          .json({ message: "El producto no existe en el carrito" });
      }

      existingProduct.quantity = quantity;

      await cart.save();

      res.status(200).json({
        message: `La cantidad del producto con ID ${pid} en el carrito ${cartId} fue actualizada exitosamente`,
        cart,
      });
    } catch (error) {
      res.status(500).json({ error: "Error en el servidor" });
    }
  }

  async deleteAllProductsToCart(req, res) {
    try {
      const { cid } = req.params;

      const cartId = cid;

      const cart = await Carts.findOne({ _id: cartId });

      if (!cart) {
        return res
          .status(400)
          .json({ message: "El ID del carrito no es válido" });
      }

      cart.products = [];
      await cart.save();

      res.status(200).json({
        message: `Todos los productos del carrito con ID ${cartId} fueron eliminados exitosamente`,
        cart,
      });
    } catch (error) {
      res.status(500).json({ error: "Error en el servidor" });
    }
  }
}

module.exports = CartsManagerFs;
