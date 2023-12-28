const EnumErrors = require("../../handlers/errors/EnumError");

const errorHandler = (error, req, res, next) => {
  console.log(error.cause);
  switch (error.code) {
    case EnumErrors.INVALID_TYPES_ERROR:
      res.status(400).json({ status: "Error", error: error.name });
      break;

    default:
      res.status(500).json({ status: "Error", error: "Internal Server Error" });
      break;
  }
};

module.exports = errorHandler;
