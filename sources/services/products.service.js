const Products = require("../Dao/models/product.model");

const GET_PRODUCTS_PAGES = () => {
  return Products.countDocuments();
};

const GET_PRODUCTS = () => {
  return Products.find();
};

const GET_PRODUCTS_BY_ID = (productId) => {
  return Products.findById(productId);
};

const CREATE_PRODUCT = (newProductData) => {
  return Products.create(newProductData);
};

const UPDATE_PRODUCT = (productData) => {
  return Products.findByIdAndUpdate(productData);
};

const DELETE_PRODUCT = (productId) => {
  return Products.findByIdAndUpdate(productId);
};

module.exports = {
  GET_PRODUCTS,
  GET_PRODUCTS_BY_ID,
  GET_PRODUCTS_PAGES,
  CREATE_PRODUCT,
  UPDATE_PRODUCT,
  DELETE_PRODUCT,
};
