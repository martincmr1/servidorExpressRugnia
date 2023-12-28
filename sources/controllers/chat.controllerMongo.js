const { Router } = require("express");
const ChatManagerMongo = require("../Dao/ChatManagerMongo");
const router = Router();

const chatManagerMongo = new ChatManagerMongo();

router.get("/", chatManagerMongo.chatMongo.bind(chatManagerMongo));

module.exports = router;
