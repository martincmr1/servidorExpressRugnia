const { Server } = require("socket.io");
const fs = require("fs");
const path = require("path");
const productsFilePath = path.join(process.cwd(), "./productos.json");
const Messages = require("./Dao/models/messages.model");

const realtimeServer = (httpServer) => {
  const io = new Server(httpServer);

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
};

module.exports = realtimeServer;
