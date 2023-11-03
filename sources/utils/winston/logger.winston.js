const winston = require('winston')

const winstonlogger = winston.createLogger({
    transports:[
      new winston.transports.Console({level:'http'}),
      new winston.transports.File({filename: 'errors.log', level:'warn'}),
      new winston.transports.File({filename: 'debug.log', level:'debug'}),
    ],
})

module.exports = winstonlogger


