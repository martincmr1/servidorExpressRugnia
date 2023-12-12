const mongoose = require("mongoose");

const connectMongo = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://martincmr1:admin@cluster0.0spsbev.mongodb.net/ecommerce?retryWrites=true&w=majority"
    );
    console.log("db is connected");
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectMongo;
