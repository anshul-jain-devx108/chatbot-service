const express = require("express");
const ChatController = require("../controllers/chatController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/chat", authMiddleware, ChatController.sendMessage);
router.get("/chat/history", authMiddleware, ChatController.getChatHistory);
router.get("/chat/stream", ChatController.streamChat);

module.exports = router;
