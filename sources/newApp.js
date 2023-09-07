const express = require("express");
const fs = require("fs");
const path = require("path");
const productsFilePath = path.join(process.cwd(), "./productos.json");
const handlebars = require("express-handlebars");
const { Server } = require("socket.io");
const router = require("./router");
const connectMongo = require("./db");
const Messages = require("./Dao/models/messages.model");
const cookieParser = require("cookie-parser");

const app = express();
const httpServer = app.listen(8080, () => {
  console.log(`Server running at port 8080`);
});

const io = new Server(httpServer);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(process.cwd() + "/public"));
app.engine("handlebars", handlebars.engine());
app.set("views", process.cwd() + "/views");
app.set("view engine", "handlebars");
app.use(cookieParser());

connectMongo();

router(app);

const messages = [];

io.on("connection", async (socket) => {
  console.log("server io running with id", socket.id);
  try {
    const produc = await fs.promises.readFile(productsFilePath, "utf-8");
    const productsFilter = JSON.parse(produc);
    io.emit("mensaje", productsFilter);
  } catch (error) {
    console.log("Error leyendo el archivo:", error);
  }
  socket.on("message", async (data) => {
    messages.push(data);

    io.emit("messageLogs", messages);
    try {
      await Messages.create({ user: data.user, message: data.message });
    } catch (error) {
      console.log("Error almacenando el mensaje en MongoDB:", error);
    }
  });
  socket.on("auth", (data) => {
    socket.emit("messageLogs", messages);
    socket.broadcast.emit("newUser", data);
  });
});

/////////COOKIES/////////////////////////////////

app.get("/set", (req, res) => {
  res
    .cookie("server", "express", {
      maxAge: 50000000,
    })
    .send("cookie set");
});

app.get("/get", (req, res) => {
  res.send(req.cookies.server);
});

app.get("/del", (req, res) => {
  res.clearCookie("server").send("cookie eliminada");
});

module.exports = app;
