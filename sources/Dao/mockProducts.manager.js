const EnumErrors = require("../handlers/errors/EnumError");
const CustomError = require("../handlers/errors/customError");
const generateUserErrorInfo = require("../handlers/errors/info");
const TYPES_ERRORS = require("../handlers/errors/types.errors");
const generateProducts = require("../utils/mockProducts.util");

class MockProductsManager {
  async getMockProducts(req, res) {
    try {
      const { numProducts = 100 } = req.query;
      const products = await generateProducts(numProducts);
      if (!products) {
        CustomError.createError({
          name: TYPES_ERRORS.USER_CREATION_ERROR,
          cause: generateUserErrorInfo({}),
          message: TYPES_ERRORS.USER_CREATION_ERROR,
          code: EnumErrors.ROUTING_ERROR,
        });
      }
      res.json({ payload: products });
    } catch (error) {}
  }
}

module.exports = MockProductsManager;
