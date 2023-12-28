const mongoose = require("mongoose");
const { CONECT_TO_MONGO } = require("../config");

const connectMongo = async () => {
  try {
    await mongoose.connect(CONECT_TO_MONGO);
    console.log("db is connected");
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectMongo;
