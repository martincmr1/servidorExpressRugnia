const multer = require("multer");
const uploader = require("../utils/multer");
const Users = require("./models/users.model");

class UserManager {
  async getUsers(req, res) {
    res.json({ message: "chat" });
  }

  async uploadDocuments(req, res) {
    const userId = req.params.uid;

    try {
      const foundUser = await Users.findOne({ _id: userId });

      if (!foundUser) {
        return res.status(404).send("Usuario no encontrado");
      }

      uploader.single("file")(req, res, async (err) => {
        if (err instanceof multer.MulterError) {
          return res.status(500).send("Error al subir el archivo.");
        } else if (!req.file) {
          return res.status(400).send("Por favor, selecciona un archivo.");
        }

        const newDocument = {
          name: req.file.filename,
          reference: uploader.uploadDirectory,
        };

        foundUser.documents.push(newDocument);
        await foundUser.save();

        return res.status(200).send("Archivo subido correctamente.");
      });
    } catch (error) {
      console.error(error);
      return res.status(500).send("Ocurrió un error en el servidor.");
    }
  }
}
module.exports = UserManager;
