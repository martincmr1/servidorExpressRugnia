const Products = require('./models/product.model');

class ProductManagerMongo{
   async getProducts(req,res){
    const { limit } = req.query;
    try {
      let products;
      if (+limit < 11) {
        products = await Products.find().limit(parseInt(limit) || 10);
      } else {
        products = await Products.find();
      }
      return res.json({ message: "Productos obtenidos exitosamente", products });
    } catch (error) {
      res.status(500).json({ message: "Error en el servidor" });
    }
  }

async getProductById(req, res) {
    try {
      const { pid } = req.params;
      const product = await Products.findById(pid);
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
      const { title, description, code, price, stock, category, thumbnails, status } = req.body;
      if (!title || !description || !code || !price || !stock || !category || !status) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios' });
      }
      const thumbnailsArray = thumbnails ? thumbnails.split(',') : [];
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
    const createdProduct = await Products.create(newProduct);
    res.status(200).json({ message: `Producto ID: ${createdProduct._id} agregado exitosamente`, createdProduct });
    } catch (error) {
      console.error("Error al crear el producto:", error);
      res.status(400).json({ message: "Error al crear el producto" });
    }
  }
 
async updateProduct(req, res) {
    try {
      const _id = (req.params.pid);
      const { title, description, code, price, stock, category, thumbnails, status } = req.body;
      if (!title || !description || !code || !price || !stock || !category || !status) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios' });
      }
      const updatedFields = req.body;
      const updatedProduct = await Products.findByIdAndUpdate(_id, updatedFields, { new: true });
      if (updatedProduct) {
      res.status(200).json({ message: "Producto actualizado correctamente", updatedProduct });
      } else {
        res.status(404).json({ message: 'Id no encontrado' });
      }
    } catch (error) {
      res.status(500).json({ message: "error en el servidor" });
    }
}
   
async deleteProduct(req, res) {
    try {
      const id = req.params.pid;
      const deletedProduct = await Products.findByIdAndDelete(id);
      Products.fin
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

module.exports=ProductManagerMongo


