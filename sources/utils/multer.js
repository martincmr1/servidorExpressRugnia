const multer = require("multer");

const uploadDirectory = process.cwd() + "/sources/files";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDirectory);
  },
  filename: (req, file, cb) => {
    const ext = file.originalname.split(".").pop();

    const nameFile = file.originalname.replace(
      `.${ext}`,
      `-${Date.now()}.${ext}`
    );
    cb(null, nameFile);
  },
});

const uploader = multer({ storage });

module.exports = uploader;
module.exports.uploadDirectory = uploadDirectory;
