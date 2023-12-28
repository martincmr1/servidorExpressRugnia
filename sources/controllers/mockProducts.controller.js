const { Router } = require("express");
const MockProductsManager = require("../Dao/mockProducts.manager");
const router = Router();

const mockProductsManager = new MockProductsManager();

router.get("/", mockProductsManager.getMockProducts.bind(mockProductsManager));

module.exports = router;
