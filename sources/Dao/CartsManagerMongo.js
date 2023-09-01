const Carts = require("./models/carts.model");

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
      const data = await Carts.findById(cid).lean();
      res.render("cartId", { cart: data });
    } catch (error) {
      res.status(500).json({ error: "error en el servidor" });
    }
  }

  async addProductToCart(req, res) {
    try {
      const { cid, pid } = req.params;
      const productId = parseInt(pid);
      if (isNaN(productId)) {
        return res.status(400).json({ error: "El id no es válido" });
      }
      if (productId <= 0) {
        return res
          .status(400)
          .json({ error: "El id debe ser igual o mayor que 1" });
      }
      const cart = await Carts.findOne({ id: Number(cid) });
      if (!cart) {
        return res
          .status(400)
          .json({ message: "El Id del carrito no es válido" });
      }
      const existingProduct = cart.products.find(
        (product) => product.id === Number(pid)
      );
      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        cart.products.push({ id: Number(pid), quantity: 1 });
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
      const cartId = parseInt(cid);
      const productId = parseInt(pid);

      if (isNaN(cartId) || isNaN(productId)) {
        return res.status(400).json({ error: "Los IDs no son válidos" });
      }

      if (cartId <= 0 || productId <= 0) {
        return res
          .status(400)
          .json({ error: "Los IDs deben ser iguales o mayores que 1" });
      }

      const cart = await Carts.findOne({ id: cartId });

      if (!cart) {
        return res
          .status(400)
          .json({ message: "El ID del carrito no es válido" });
      }

      const existingProductIndex = cart.products.findIndex(
        (product) => product.id === productId
      );

      if (existingProductIndex === -1) {
        return res
          .status(400)
          .json({ message: "El producto no existe en el carrito" });
      }

      cart.products.splice(existingProductIndex, 1);
      await cart.save();

      res.status(200).json({
        message: `El producto con ID ${productId} fue eliminado exitosamente del carrito ${cartId}`,
      });
    } catch (error) {
      res.status(500).json({ error: "Error en el servidor" });
    }
  }

  async updateCart(req, res) {
    try {
      const { cid } = req.params;
      const { products } = req.body;

      const cartId = parseInt(cid);

      if (isNaN(cartId) || !Array.isArray(products)) {
        return res.status(400).json({ error: "Los datos no son válidos" });
      }

      const cart = await Carts.findOneAndUpdate(
        { id: cartId },
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

      const cartId = parseInt(cid);
      const productId = parseInt(pid);

      if (isNaN(cartId) || isNaN(productId) || isNaN(quantity)) {
        return res.status(400).json({ error: "Los datos no son válidos" });
      }

      const cart = await Carts.findOne({ id: cartId });

      if (!cart) {
        return res
          .status(400)
          .json({ message: "El ID del carrito no es válido" });
      }

      const existingProduct = cart.products.find(
        (product) => product.id === productId
      );

      if (!existingProduct) {
        return res
          .status(400)
          .json({ message: "El producto no existe en el carrito" });
      }

      existingProduct.quantity = quantity;
      await cart.save();

      res.status(200).json({
        message: `La cantidad del producto con ID ${productId} en el carrito ${cartId} fue actualizada exitosamente`,
        cart,
      });
    } catch (error) {
      res.status(500).json({ error: "Error en el servidor" });
    }
  }

  async deleteAllProductsToCart(req, res) {
    try {
      const { cid } = req.params;
      const cartId = parseInt(cid);

      if (isNaN(cartId)) {
        return res
          .status(400)
          .json({ error: "El ID del carrito no es válido" });
      }

      const cart = await Carts.findOne({ id: cartId });

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
