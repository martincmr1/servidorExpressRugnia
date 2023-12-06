const mongoose = require("mongoose");

const userCollection = "user";

const userSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  email: String,
  age: Number,
  password: String,
 cart: { type: mongoose.Schema.Types.ObjectId, ref: "cart" },
 
 
 
 role: { type: String, enum: ["user", "premium", "admin"], default: "user" },
});

const Users = mongoose.model(userCollection, userSchema);

module.exports = Users;

