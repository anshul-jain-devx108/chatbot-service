
// const { v4: uuidv4 } = require("uuid");
// const ChatModel = require("../models/chatModel");
// const GeminiService = require("../services/geminiService");
// const SSE = require("../utils/sseManager");
// const { beautifyResponse } = require("../utils/responseFormatter");

// class ChatController {
//   static async sendMessage(req, res) {
//     try {
//       console.log("DEBUG: Received request in sendMessage");
//       const { chatId, message } = req.body;
//       const userId = req.user.email;
//       const currentChatId = chatId || uuidv4();

//       await ChatModel.saveMessage(currentChatId, userId, "user", message);
//       const rawAiResponse = await GeminiService.generateResponse(message);
//       const processedResponse = beautifyResponse(rawAiResponse);

//       await ChatModel.saveMessage(currentChatId, userId, "assistant", processedResponse.raw);
//       SSE.sendMessage({ chatId: currentChatId, sender: "assistant", message: processedResponse.raw });

//       res.json({ chatId: currentChatId, response: processedResponse });
//     } catch (error) {
//       console.error("SendMessage Error:", error);
//       res.status(500).json({ error: "Error processing chat request" });
//     }
//   }

//   static async getChatHistory(req, res) {
//     try {
//       const { chatId, limit = 10, lastTimestamp = null } = req.query;
//       const messages = await ChatModel.getChatHistory(chatId, parseInt(limit), lastTimestamp);
//       res.json({ chatId, messages });
//     } catch (error) {
//       console.error("GetChatHistory Error:", error);
//       res.status(500).json({ error: "Error retrieving chat history" });
//     }
//   }

//   static async streamChat(req, res) {
//     SSE.addClient(res);
//   }
// }

// module.exports = ChatController;


const { v4: uuidv4 } = require("uuid");
const ChatModel = require("../models/chatModel");
const GeminiService = require("../services/geminiService");
const SSE = require("../utils/sseManager");
const { beautifyResponse } = require("../utils/responseFormatter");

class ChatController {
  static async sendMessage(req, res) {
    try {
      console.log("DEBUG: Received request in sendMessage");

      const { chatId, classId, message } = req.body;
      const userId = req.user.email;

      if (!classId) {
        return res.status(400).json({ error: "classId is required" });
      }

      const currentChatId = chatId || uuidv4();
      console.log("DEBUG: Using chatId:", currentChatId);

      await ChatModel.saveMessage(currentChatId, classId, userId, "user", message);
      const rawAiResponse = await GeminiService.generateResponse(message);
      const processedResponse = beautifyResponse(rawAiResponse);

      await ChatModel.saveMessage(currentChatId, classId, userId, "assistant", processedResponse.raw);
      SSE.sendMessage({ chatId: currentChatId, sender: "assistant", message: processedResponse.raw });

      res.json({ chatId: currentChatId, response: processedResponse });
    } catch (error) {
      console.error("SendMessage Error:", error);
      res.status(500).json({ error: "Error processing chat request" });
    }
  }

  static async getChatHistory(req, res) {
    try {
      const { chatId, classId, limit = 10, lastTimestamp = null } = req.query;

      if (!classId) {
        return res.status(400).json({ error: "classId is required" });
      }

      const messages = await ChatModel.getChatHistory(chatId, classId, parseInt(limit), lastTimestamp);
      res.json({ chatId, classId, messages });
    } catch (error) {
      console.error("GetChatHistory Error:", error);
      res.status(500).json({ error: "Error retrieving chat history" });
    }
  }

  static async streamChat(req, res) {
    SSE.addClient(res);
  }
}

module.exports = ChatController;
