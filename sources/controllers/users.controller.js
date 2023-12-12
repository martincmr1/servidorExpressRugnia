const { Router } = require("express");
const UserManager = require("../Dao/userManager");

const router = Router();

const userManager = new UserManager();

router.get("/premium/:uid", userManager.getUsers.bind(userManager));

router.post("/:uid/documents", userManager.uploadDocuments.bind(userManager));

module.exports = router;
