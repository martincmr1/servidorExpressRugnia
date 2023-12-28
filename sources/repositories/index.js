const MessageRepository = require("./message.repository");
const MessageAdapter = require("../adapter/factory");

const messageRepository = new MessageRepository(new MessageAdapter());

module.exports = messageRepository;
