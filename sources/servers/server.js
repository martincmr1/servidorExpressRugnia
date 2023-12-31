const express = require("express");
const app = express();
const handlebars = require("express-handlebars");
const router = require("../router");
const connectMongo = require("../db");

require("dotenv").config();

const cookieParser = require("cookie-parser");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const initializePassport = require("../config/passport.config");
const passport = require("passport");
const compression = require("express-compression");
const errorHandler = require("../middlewares/errors");
const logger = require("../middlewares/logger.middleware");
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const { MONGO_URL, SECRET } = require("../config");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(process.cwd() + "/sources/public"));
app.engine("handlebars", handlebars.engine());
app.set("views", process.cwd() + "/sources/views");
app.set("view engine", "handlebars");
app.use(cookieParser());
app.use(
  compression({
    brotli: { enabled: true, zlib: {} },
  })
);
app.use(errorHandler);
app.use(logger);

app.use(
  session({
    store: MongoStore.create({
      mongoUrl: MONGO_URL,

      mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
      ttl: 3600,
    }),

    secret: SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

initializePassport();
app.use(passport.initialize());
app.use(passport.session());

const swaggerOptios = {
  definition: {
    openapi: "3.0.1",
    info: {
      title: "Documentacion del E-Commerce",
      description: "Funcionamiento de la App",
    },
  },
  apis: [`${process.cwd()}/sources/docs/**/*.yaml`],
};

const spec = swaggerJSDoc(swaggerOptios);
app.use("/documentation", swaggerUi.serve, swaggerUi.setup(spec));

connectMongo();

router(app);

module.exports = app;
