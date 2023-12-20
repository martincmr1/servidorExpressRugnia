const ProductsMongoDao = require("../Dao/mongo/mongo.products.dao");

const productsDao = new ProductsMongoDao();

const GET_PRODUCTS_PAGES = () => {
  return productsDao.getAllPages();
};

const GET_PRODUCTS = (filter) => {
  return productsDao.getAll(filter);
};

const GET_PRODUCTS_BY_ID = (productId) => {
  return productsDao.getById(productId);
};

const CREATE_PRODUCT = (newProductData) => {
  return productsDao.create(newProductData);
};

const UPDATE_PRODUCT = (productId, updatedFields) => {
  return productsDao.updateById(productId, updatedFields, { new: true });
};

const DELETE_PRODUCT = (productId) => {
  return productsDao.deleteById(productId);
};

module.exports = {
  GET_PRODUCTS,
  GET_PRODUCTS_BY_ID,
  GET_PRODUCTS_PAGES,
  CREATE_PRODUCT,
  UPDATE_PRODUCT,
  DELETE_PRODUCT,
};

