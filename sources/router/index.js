const cartsController = require("../controllers/cartsController");
const productsController = require("../controllers/productsController");
const realTimeProductsController = require("../controllers/realTimeProductsController");
const mongoProductsController = require("../controllers/mongoProductsController");
const cartsControllerMongo = require("../controllers/cartsControllerMongo");
const chatControllerMongo = require("../controllers/chatControllerMongo");

const authController = require("../auth/controller.auth");
const templateController = require("../templates/controller.template");
const {
  protectedRouteProducts,
} = require("../middlewares/protected-route.middleware");
//const { authToken } = require("../utils/jwt.util");

const router = (app) => {
  app.use("/api/products", productsController);
  app.use("/api/carts", cartsController);
  app.use("/realtimeproducts", realTimeProductsController);
  app.use("/mongo", protectedRouteProducts, mongoProductsController);
  app.use("/cartsMongo", cartsControllerMongo);
  app.use("/chat", chatControllerMongo);

  app.use("/", templateController);
  app.use("/auth", authController);
  app.use("*", (req, res) => {
    res.render("notFound");
  });
};

module.exports = router;
