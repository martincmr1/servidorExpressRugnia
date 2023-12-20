const Products = require("../models/product.model");

class ProductsMongoDao {
  getAll(filter) {
    return Products.find(filter);
  }
  getAllPages() {
    return Products.countDocuments();
  }
  getById(productId) {
    return Products.findById(productId);
  }
  create(newProductData) {
    return Products.create(newProductData);
  }
  updateById(productId, updatedFields) {
    return Products.findByIdAndUpdate(productId, updatedFields, { new: true });
  }
  deleteById(productId) {
    return Products.findByIdAndDelete(productId);
  }
}

module.exports = ProductsMongoDao;
