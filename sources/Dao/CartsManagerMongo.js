const CartsService = require("../services/carts.service");
const ProductsService = require("../services/products.service");

const UserService = require("../services/users.service");

class CartsManagerFs {
  async createCart(req, res) {
    try {
      const id = Date.now();
      const products = [];
      const newCart = {
        id,
        products,
      };

      const createdCart = await CartsService.CREATE_CART(newCart);

      res.status(200).json({
        message: "Carrito agregado correctamente",
        newCart: createdCart,
      });
    } catch (error) {
      res.status(500).json({ error: "error en el servidor" });
    }
  }

  async getCartbyId(req, res) {
    const { cid } = req.params;

    try {
      const userMail = req.session.user
        ? {
            name: req.session.user.name,
            email: req.session.user.email,
            role: req.session.user.role,
          }
        : null;

      const findUser = await UserService.GET_ONE_USER({
        email: userMail.email,
      });

      const user = {
        name: findUser.first_name,
        lastName: findUser.last_name,
        email: findUser.email,
        cart: findUser.cart._id,
      };

      const cart = await CartsService.GET_CART_BY_ID(cid)
        .lean()
        .populate("products._id");

      if (!cart) {
        return res
          .status(404)
          .json({ message: "El carrito no fue encontrado" });
      }

      const productIds = cart.products.map((product) => product._id);

      const products = await ProductsService.GET_PRODUCTS({
        _id: { $in: productIds },
      });

      res.render("cartId", { cart: cart, products: products, user: user });
    } catch (error) {
      res.status(500).json({ message: "Error al obtener el carrito" });
    }
  }

  async addProductToCart(req, res) {
    try {
      const { cid, pid } = req.params;
      const { quantity } = req.body;

      const product = await ProductsService.GET_PRODUCTS_BY_ID(pid);

      if (!product) {
        return res.status(404).json({ message: "Producto no encontrado" });
      }

      const cart = await CartsService.GET_CART_BY_ID(cid);

      const existingProductIndex = cart.products.findIndex(
        (cartProduct) => cartProduct._id.toString() === pid
      );

      if (existingProductIndex !== -1) {
        cart.products[existingProductIndex].quantity += parseInt(quantity, 10);
      } else {
        cart.products.push({
          _id: product._id,
          quantity: parseInt(quantity, 10) || 1,
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

      const result = await CartsService.UPDATE_CART(
        { _id: cartId },
        { $pull: { products: { _id: productId } } }
      );

      if (!result) {
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

      const cart = await CartsService.UPDATE_CART(
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

      const cart = await CartsService.GET_ONE_CART({ _id: cartId });

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

      const cart = await CartsService.GET_ONE_CART({ _id: cartId });

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
