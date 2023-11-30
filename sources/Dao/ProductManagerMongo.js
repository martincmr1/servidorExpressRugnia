const { GET_PRODUCTS, GET_PRODUCTS_PAGES, GET_PRODUCTS_BY_ID, CREATE_PRODUCT, UPDATE_PRODUCT, DELETE_PRODUCT } = require("../services/products.service");
const Products = require("./models/product.model");

class ProductManagerMongo {
  async getProducts(req, res) {
    const { limit = 10, page = 1, sort, query } = req.query;

    try {
      const user = req.session.user
        ? {
            name: req.session.user.name,
            email: req.session.user.email,
            role: req.session.user.role,
          }
        : null;
      const pageAsNumber = parseInt(page, 10);

      let filter = {};
      if (query) {
        filter = { category: query };
      }

      let sortOption = {};
      if (sort === "asc") {
        sortOption = { price: 1 };
      } else if (sort === "desc") {
        sortOption = { price: -1 };
      }
      const products = await GET_PRODUCTS(filter)
    //  const products = await Products.find(filter)
        .sort(sortOption)
        .skip((pageAsNumber - 1) * limit)
        .limit(Number(limit))
        .lean();

     // const totalProducts = await Products.countDocuments(filter);
      const totalProducts = await GET_PRODUCTS_PAGES(filter)
      const totalPages = Math.ceil(totalProducts / limit);
      const hasPrevPage = pageAsNumber > 1;
      const hasNextPage = pageAsNumber < totalPages;
      const prevPage = hasPrevPage ? pageAsNumber - 1 : null;
      const nextPage = hasNextPage ? pageAsNumber + 1 : null;

      const response = {
        status: "success",
        payload: products,
        totalPages,
        prevPage,
        nextPage,
        page: pageAsNumber,
        hasPrevPage,
        hasNextPage,
      };

      if (hasPrevPage) {
        response.prevLink = `/mongo?limit=${limit}&page=${prevPage}&sort=${
          sort || ""
        }&query=${query || ""}`;
      }

      if (hasNextPage) {
        response.nextLink = `/mongo?limit=${limit}&page=${nextPage}&sort=${
          sort || ""
        }&query=${query || ""}`;
      }
      req.logger.warn('vista de productos')
      res.status(200).render("products", {
        payload:products,
        products: response.payload,
        hasNextPage,
        nextLink: response.nextLink,
        user: user,
      });
    } catch (error) {
      res
        .status(500)
        .json({ status: "error", message: "Error en el servidor" });
    }
  }

  async getProductById(req, res) {
    try {
      const { pid } = req.params;
      const product = await GET_PRODUCTS_BY_ID(pid)
      //     const product = await Products.findById(pid);
      if (product) {
        res.status(200).json(product);
      } else {
        res.status(400).json({ message: "ID no encontrado" });
      }
    } catch (error) {
      res.status(500).json({ message: "Ha ocurrido un error en el servidor" });
    }
  }

  async createProduct(req, res) {
    try {
      const {
        title,
        description,
        code,
        price,
        stock,
        category,
        thumbnails,
        status,
      } = req.body;
      if (
        typeof title !== 'string' ||
        typeof description !== 'string' ||
        typeof code !== 'string' ||
        typeof price !== 'number' ||
        typeof stock !== 'number' ||
        typeof title !== 'string' ||
        typeof status !== 'string' 
      ) {
        return res
          .status(400)
          .json({ message: "Todos los campos son obligatorios o no tienen el formato adecuado" });
      }
      const thumbnailsArray = thumbnails ? thumbnails.split(",") : [];
      const newProduct = {
        title,
        description,
        price,
        code,
        stock,
        status,
        category,
        thumbnails: thumbnailsArray,
      };
      const createdProduct = await CREATE_PRODUCT(newProduct);
      res.status(201).json({
        message: `Producto ID: ${createdProduct._id} agregado exitosamente`,
        createdProduct,
      });
    } catch (error) {
      console.error("Error al crear el producto:", error);
      res.status(400).json({ message: "Error al crear el producto" });
    }
  }

  async updateProduct(req, res) {
    try {
      const _id = req.params.pid;
      const {
        title,
        description,
        code,
        price,
        stock,
        category,
        thumbnails,
        status,
      } = req.body;
      if (
        !title ||
        !description ||
        !code ||
        !price ||
        !stock ||
        !category ||
        !status
      ) {
        return res
          .status(400)
          .json({ message: "Todos los campos son obligatorios" });
      }
      const updatedFields = req.body;
      const updatedProduct = await UPDATE_PRODUCT(
        _id,
        updatedFields,
        { new: true }
      );
      if (updatedProduct) {
        res.status(200).json({
          message: "Producto actualizado correctamente",
          payload:updatedProduct,
          updatedProduct,
        });
      } else {
        res.status(404).json({ message: "Id no encontrado" });
      }
    } catch (error) {
      res.status(500).json({ message: "error en el servidor" });
    }
  }
  async  deleteProduct(req, res) {
    try {
      const id = req.params.pid;
      const deletedProduct = await DELETE_PRODUCT(id);
      
      if (deletedProduct) {
        res.status(200).json({ message: `Producto ID ${id} eliminado exitosamente` });
      } else {
        res.status(404).json({ message: "El ID no es válido" });
      }
    } catch (error) {
      res.status(500).json({ message: "Ha ocurrido un error en el servidor" });
  
    }
  }
}

module.exports = ProductManagerMongo;
