const mongoose = require("mongoose");

const cartCollection = "cart";

const cartSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  products: [
    {
      id: {
        type: Number,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
});

const Carts = mongoose.model(cartCollection, cartSchema);

module.exports = Carts;
