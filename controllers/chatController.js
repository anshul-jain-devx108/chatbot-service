// const { v4: uuidv4 } = require("uuid");
// const ChatModel = require("../models/chatModel");
// const GeminiService = require("../services/geminiService");
// const SSE = require("../utils/sseManager");

// class ChatController {
//   // Endpoint to send a message and stream the AI response
//   static async sendMessage(req, res) {
//     try {
//       const { chatId, message } = req.body;
//       // Use the authenticated user's email as userId
//       const userId = req.user.email;

//       // If no chatId is provided, create a new one
//       const currentChatId = chatId || uuidv4();
//       await ChatModel.saveMessage(currentChatId, userId, "user", message);

//       const aiResponse = await GeminiService.generateResponse(message);
//       await ChatModel.saveMessage(currentChatId, userId, "assistant", aiResponse);

//       // Send the AI response via SSE to all connected clients
//       SSE.sendMessage({ chatId: currentChatId, sender: "assistant", message: aiResponse });

//       res.json({ chatId: currentChatId, message: aiResponse });
//     } catch (error) {
//       res.status(500).json({ error: "Error processing chat request" });
//     }
//   }

//   // Endpoint to retrieve chat history (supports pagination via query params)
//   static async getChatHistory(req, res) {
//     try {
//       const { chatId, limit, lastTimestamp } = req.query;
//       const history = await ChatModel.getChatHistory(chatId, limit, lastTimestamp);
//       res.json({ chatId, history });
//     } catch (error) {
//       res.status(500).json({ error: "Failed to fetch chat history" });
//     }
//   }

//   // Endpoint to add a client to the SSE stream for real-time responses
//   static async streamChat(req, res) {
//     SSE.addClient(res);
//   }
// }

// module.exports = ChatController;

// const { v4: uuidv4 } = require("uuid");
// const ChatModel = require("../models/chatModel");
// const GeminiService = require("../services/geminiService");
// const SSE = require("../utils/sseManager");

// class ChatController {
//   // Endpoint to send a message and stream the AI response
//   static async sendMessage(req, res) {
//     try {
//       console.log("DEBUG: Received request in sendMessage");
//       console.log("DEBUG: Request body:", req.body);
//       console.log("DEBUG: Authenticated user:", req.user);

//       const { chatId, message } = req.body;
//       const userId = req.user.email;
      
//       // Generate a new chatId if not provided
//       const currentChatId = chatId || uuidv4();
//       console.log("DEBUG: Using chatId:", currentChatId);

//       // Save user message
//       console.log("DEBUG: Saving user message to Firestore");
//       await ChatModel.saveMessage(currentChatId, userId, "user", message);
//       console.log("DEBUG: User message saved successfully");

//       // Generate AI response using Gemini/OpenRouter
//       console.log("DEBUG: Calling GeminiService.generateResponse with message:", message);
//       const aiResponse = await GeminiService.generateResponse(message);
//       console.log("DEBUG: Received AI response:", aiResponse);

//       // Save AI response
//       console.log("DEBUG: Saving AI response to Firestore");
//       await ChatModel.saveMessage(currentChatId, userId, "assistant", aiResponse);
//       console.log("DEBUG: AI response saved successfully");

//       // Send the AI response via SSE to all connected clients
//       console.log("DEBUG: Sending AI response via SSE");
//       SSE.sendMessage({ chatId: currentChatId, sender: "assistant", message: aiResponse });

//       console.log("DEBUG: Sending final JSON response");
//       res.json({ chatId: currentChatId, message: aiResponse });
//     } catch (error) {
//       console.error("SendMessage Error:", error);
//       res.status(500).json({ error: "Error processing chat request" });
//     }
//   }

//   // Endpoint to retrieve chat history (supports pagination via query params)
//   static async getChatHistory(req, res) {
//     try {
//       console.log("DEBUG: Received request in getChatHistory");
//       const { chatId, limit, lastTimestamp } = req.query;
//       console.log("DEBUG: Query params:", req.query);

//       const history = await ChatModel.getChatHistory(chatId, limit, lastTimestamp);
//       console.log("DEBUG: Retrieved chat history:", history);

//       res.json({ chatId, history });
//     } catch (error) {
//       console.error("GetChatHistory Error:", error);
//       res.status(500).json({ error: "Failed to fetch chat history" });
//     }
//   }

//   // Endpoint to add a client to the SSE stream for real-time responses
//   static async streamChat(req, res) {
//     try {
//       console.log("DEBUG: Client connected to SSE stream");
//       SSE.addClient(res);
//     } catch (error) {
//       console.error("StreamChat Error:", error);
//       res.status(500).json({ error: "Error setting up SSE stream" });
//     }
//   }
// }

// module.exports = ChatController;


// const { v4: uuidv4 } = require("uuid");
// const ChatModel = require("../models/chatModel");
// const GeminiService = require("../services/geminiService");
// const SSE = require("../utils/sseManager");
// const { beautifyResponse } = require("../utils/responseFormatter");

// class ChatController {
//   // Endpoint to send a message and stream the AI response
//   static async sendMessage(req, res) {
//     try {
//       console.log("DEBUG: Received request in sendMessage");
//       console.log("DEBUG: Request body:", req.body);
//       console.log("DEBUG: Authenticated user:", req.user);

//       const { chatId, message } = req.body;
//       const userId = req.user.email;
      
//       // Generate a new chatId if not provided
//       const currentChatId = chatId || uuidv4();
//       console.log("DEBUG: Using chatId:", currentChatId);

//       // Save user message
//       console.log("DEBUG: Saving user message to Firestore");
//       await ChatModel.saveMessage(currentChatId, userId, "user", message);
//       console.log("DEBUG: User message saved successfully");

//       // Generate AI response using Gemini/OpenRouter
//       console.log("DEBUG: Calling GeminiService.generateResponse with message:", message);
//       const rawAiResponse = await GeminiService.generateResponse(message);
//       console.log("DEBUG: Raw AI response:", rawAiResponse);

//       // Beautify or process the raw response
//       const processedResponse = beautifyResponse(rawAiResponse);
//       console.log("DEBUG: Processed AI response:", processedResponse);

//       // Save assistant's message (store only the beautified message, if desired)
//       await ChatModel.saveMessage(currentChatId, userId, "assistant", processedResponse.message);
//       console.log("DEBUG: Assistant message saved successfully");

//       // Send the AI response via SSE to all connected clients
//       SSE.sendMessage({ chatId: currentChatId, sender: "assistant", message: processedResponse.message });

//       // Return the processed response in the JSON response
//       res.json({ chatId: currentChatId, response: processedResponse });
//     } catch (error) {
//       console.error("SendMessage Error:", error);
//       res.status(500).json({ error: "Error processing chat request" });
//     }
//   }

//   // Endpoint to retrieve chat history (supports pagination via query params)
//   static async getChatHistory(req, res) {
//     try {
//       const { chatId, limit, lastTimestamp } = req.query;
//       const history = await ChatModel.getChatHistory(chatId, limit, lastTimestamp);
//       res.json({ chatId, history });
//     } catch (error) {
//       res.status(500).json({ error: "Failed to fetch chat history" });
//     }
//   }

//   // Endpoint to add a client to the SSE stream for real-time responses
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

// class ChatController {
//   // Endpoint to send a message and stream the AI response
//   static async sendMessage(req, res) {
//     try {
//       console.log("DEBUG: Received request in sendMessage");
//       console.log("DEBUG: Request body:", req.body);
//       console.log("DEBUG: Authenticated user:", req.user);

//       const { chatId, message } = req.body;
//       const userId = req.user.email;
      
//       // Generate a new chatId if not provided
//       const currentChatId = chatId || uuidv4();
//       console.log("DEBUG: Using chatId:", currentChatId);

//       // Save user message
//       console.log("DEBUG: Saving user message to Firestore");
//       await ChatModel.saveMessage(currentChatId, userId, "user", message);
//       console.log("DEBUG: User message saved successfully");

//       // Generate AI response using Gemini/OpenRouter
//       console.log("DEBUG: Calling GeminiService.generateResponse with message:", message);
//       const rawAiResponse = await GeminiService.generateResponse(message);
//       console.log("DEBUG: Raw AI response:", rawAiResponse);

//       // Beautify or process the raw response into HTML
//       const processedResponse = beautifyResponse(rawAiResponse);
//       console.log("DEBUG: Processed AI response:", processedResponse);

//       // Save assistant's message (store only the raw text if desired)
//       await ChatModel.saveMessage(currentChatId, userId, "assistant", processedResponse.raw);
//       console.log("DEBUG: Assistant message saved successfully");

//       // Send the AI response via SSE to all connected clients
//       SSE.sendMessage({ chatId: currentChatId, sender: "assistant", message: processedResponse.raw });

//       // Return the processed response (both raw and HTML) in the JSON response
//       res.json({ chatId: currentChatId, response: processedResponse });
//     } catch (error) {
//       console.error("SendMessage Error:", error);
//       res.status(500).json({ error: "Error processing chat request" });
//     }
//   }

//   // Endpoint to retrieve chat history (supports pagination via query params)
//     // Retrieve chat history directly from Firestore document
//     static async getChatHistory(chatId, limit = 10, lastTimestamp = null) {
//       const chatRef = db.collection("chats").doc(chatId);
//       const chatDoc = await chatRef.get();
  
//       if (!chatDoc.exists) {
//         throw new Error("Chat not found");
//       }
  
//       let messages = chatDoc.data().messages || [];
  
//       // Convert timestamps to Date objects if needed
//       messages = messages.map((msg) => ({
//         ...msg,
//         timestamp: msg.timestamp.toDate ? msg.timestamp.toDate() : msg.timestamp,
//       }));
  
//       // Sort messages by timestamp
//       messages = messages.sort((a, b) => b.timestamp - a.timestamp);
  
//       if (lastTimestamp) {
//         messages = messages.filter((msg) => new Date(msg.timestamp) < new Date(lastTimestamp));
//       }
  
//       return messages.slice(0, limit);
//     }
  

//   // Endpoint to add a client to the SSE stream for real-time responses
//   static async streamChat(req, res) {
//     SSE.addClient(res);
//   }
// }

// module.exports = ChatController;


class ChatController {
  static async sendMessage(req, res) {
    try {
      console.log("DEBUG: Received request in sendMessage");
      const { chatId, message } = req.body;
      const userId = req.user.email;
      const currentChatId = chatId || uuidv4();

      await ChatModel.saveMessage(currentChatId, userId, "user", message);
      const rawAiResponse = await GeminiService.generateResponse(message);
      const processedResponse = beautifyResponse(rawAiResponse);

      await ChatModel.saveMessage(currentChatId, userId, "assistant", processedResponse.raw);
      SSE.sendMessage({ chatId: currentChatId, sender: "assistant", message: processedResponse.raw });

      res.json({ chatId: currentChatId, response: processedResponse });
    } catch (error) {
      console.error("SendMessage Error:", error);
      res.status(500).json({ error: "Error processing chat request" });
    }
  }

  static async getChatHistory(req, res) {
    try {
      const { chatId, limit = 10, lastTimestamp = null } = req.query;
      const messages = await ChatModel.getChatHistory(chatId, parseInt(limit), lastTimestamp);
      res.json({ chatId, messages });
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