const { Router } = require("express");
const ProductManagerMongo = require("../Dao/ProductManagerMongo");

const router = Router();

const productManagerMongo = new ProductManagerMongo();

router.get("/", productManagerMongo.getProducts.bind(productManagerMongo));

router.get(
  "/:pid",
  productManagerMongo.getProductById.bind(productManagerMongo)
);

router.post("/", productManagerMongo.createProduct.bind(productManagerMongo));

router.put(
  "/:pid",
  productManagerMongo.updateProduct.bind(productManagerMongo)
);

router.delete(
  "/:pid",
  productManagerMongo.deleteProduct.bind(productManagerMongo)
);

module.exports = router;
