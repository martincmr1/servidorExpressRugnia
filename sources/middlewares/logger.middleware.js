const winstonlogger = require("../utils/winston/logger.winston");

const logger = (req, res, next) => {
  req.logger = winstonlogger;
  req.logger.http(`Method: ${req.method} en ${
    req.url
  } - Params: ${JSON.stringify(req.params)}
   -Queries : ${JSON.stringify(req.query)} - Body : ${JSON.stringify(
    req.body
  )} -
    ${new Date().toLocaleTimeString()}`);
  next();
};

module.exports = logger;
