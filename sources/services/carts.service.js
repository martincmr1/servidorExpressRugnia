const Carts = require("../Dao/models/carts.model");

const GET_CARTS = (filter) => {
  return Carts.find(filter);
};

const GET_ONE_CART = (cartId) => {
  return Carts.findOne(cartId);
};

const GET_CART_BY_ID = (cartId) => {
  return Carts.findById(cartId);
};

const CREATE_CART = (newCart) => {
  return Carts.create(newCart);
};

const UPDATE_CART = (filter, update, options) => {
  return Carts.findByIdAndUpdate(filter, update, options);
};

const DELETE_CART = (cartId) => {
  return Carts.findByIdAndDelete(cartId);
};

const DELETE_ALL_CARTS = () => {
  return Carts.deleteMany({});
};

module.exports = {
  GET_CARTS,
  GET_CART_BY_ID,
  GET_ONE_CART,
  CREATE_CART,
  UPDATE_CART,
  DELETE_CART,
  DELETE_ALL_CARTS,
};
