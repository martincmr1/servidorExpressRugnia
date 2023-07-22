const express = require('express');
const routes = require('./routes');

const showAllProductsRoute = routes.allProductsRoutes;
const productById = routes.idProductRoutes;
const controllerAllProduct = routes.controllerAllProduct;
const controllerProductById = routes.controllerProductById;

const port = 8080;
const app = express();

app.listen(port, () => {
  console.log(`Server running at port ${port}`);
});

app.get(productById, controllerProductById);
app.get(showAllProductsRoute, controllerAllProduct);




