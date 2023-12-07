const express = require("express");
const app = express();
const handlebars = require("express-handlebars");
const router = require("../router");
const connectMongo = require("../db");
const path = require("path");

const cookieParser = require("cookie-parser");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const initializePassport = require("../config/passport.config");
const passport = require("passport");
const compression = require("express-compression");
const errorHandler = require("../middlewares/errors");
const logger = require("../middlewares/logger.middleware");
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require('swagger-ui-express')

require('dotenv').config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(__dirname, "../public"));
//app.use(express.static(process.cwd() + "sources/public"));
app.engine("handlebars", handlebars.engine());
//app.set("views", process.cwd() + "/sources/views");

app.set("views", path.join(__dirname, "../views"));
console.log(path.join(__dirname, "../views"));

//app.set("views", process.cwd() + "/views");
app.set("view engine", "handlebars");
app.use(cookieParser());
app.use(compression({
  brotli:{enabled:true,zlib:{}}
}))
app.use(errorHandler)
app.use(logger)

//console.log(process.cwd() + "/sources/views");

app.use(
  session({
    store: MongoStore.create({
      mongoUrl:process.env.MONGO_URL,    
      mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
      ttl: 3600,
    }),
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

initializePassport();
app.use(passport.initialize());
app.use(passport.session());

const swaggerOptios = {
  definition :{
    openapi:'3.0.1',
    info:{
      title:'Documentacion del E-Commerce',
      description:'Funcionamiento de la App',
    }
  },
  apis: [`${process.cwd()}/docs/**/*.yaml`]

}



const spec =swaggerJSDoc(swaggerOptios)
app.use('/apis',swaggerUi.serve,swaggerUi.setup(spec))



connectMongo();

router(app);

module.exports = app;
