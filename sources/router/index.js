const cartsController = require("../controllers/carts.controller");
const productsController = require("../controllers/products.controllerFs");
const realTimeProductsController = require("../controllers/products.controllerRealTime");
const mongoProductsController = require("../controllers/products.controllerMongo");
const cartsControllerMongo = require("../controllers/carts.controllerMongo");
const chatControllerMongo = require("../controllers/chat.controllerMongo");
const mockUserscontroller = require("../controllers/mockUsers.controller")
const mockProductscontroller = require("../controllers/mockProducts.controller")

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
  app.use("/mockUsers",mockUserscontroller);
  app.use("/mockingproducts",mockProductscontroller);

  app.use("/", templateController);
  app.use("/auth", authController);
  app.use("*", (req, res) => {
    res.render("notFound");
  });
};

module.exports = router;
