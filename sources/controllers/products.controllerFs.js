const { Router } = require("express");
const ProductManagerFs = require("../Dao/ProductManagerFs");
const router = Router();

const productManagerFs = new ProductManagerFs();

router.get("/", productManagerFs.getProducts.bind(productManagerFs));

router.get("/:pid", productManagerFs.getProductById.bind(productManagerFs));

router.post("/", productManagerFs.createProduct.bind(productManagerFs));

router.put("/:pid", productManagerFs.updateProduct.bind(productManagerFs));

router.delete("/:pid", productManagerFs.deleteProduct.bind(productManagerFs));

module.exports = router;
