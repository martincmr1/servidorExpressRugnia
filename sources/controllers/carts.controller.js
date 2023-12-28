const { Router } = require("express");
const CartsManagerFs = require("../Dao/CartsManagerFs");
const router = Router();

const cartsManagerfs = new CartsManagerFs();

router.get("/:cid", cartsManagerfs.getCartbyId.bind(cartsManagerfs));

router.post(
  "/:cid/product/:pid",
  cartsManagerfs.addProductToCart.bind(cartsManagerfs)
);

router.post("/", cartsManagerfs.createCart.bind(cartsManagerfs));

module.exports = router;
