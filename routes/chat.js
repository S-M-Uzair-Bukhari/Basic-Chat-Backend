const express = require("express");
const router = express.Router();

const chatController = require("../controller/chat");

router.post("/chat/createRoom", chatController.createRoom);
router.get("/chat/getRoom", chatController.getRoom);
router.get("/chat/getMessages", chatController.getMessages);

module.exports = router;
