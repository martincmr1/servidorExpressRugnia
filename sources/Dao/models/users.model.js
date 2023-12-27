const mongoose = require("mongoose");

const userCollection = "user";

const documentSchema = new mongoose.Schema({
  name: String,
  reference: String,
});

const userSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  email: String,
  age: Number,
  password: String,
  number:String,
  cart: { type: mongoose.Schema.Types.ObjectId, ref: "cart" },
  role: { type: String, enum: ["user", "premium", "admin"], default: "user" },
  documents: [documentSchema],
  createdAt:String,
  last_connection: Date,
});

const Users = mongoose.model(userCollection, userSchema);

module.exports = Users;
