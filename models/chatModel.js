

// const admin = require("firebase-admin");
// const { db } = require("../config/firebase");

// class ChatModel {
//   // Save message by appending it to the 'messages' array
//   static async saveMessage(chatId, userId, sender, message) {
//     const chatRef = db.collection("chats").doc(chatId);
//     await chatRef.set(
//       {
//         userId,
//         messages: admin.firestore.FieldValue.arrayUnion({
//           sender,
//           message,
//           timestamp: new Date().toISOString(),
//         }),
//       },
//       { merge: true }
//     );
//   }

//   // Retrieve chat history directly from the 'messages' array
//   static async getChatHistory(chatId, limit = 10, lastTimestamp = null) {
//     const chatRef = db.collection("chats").doc(chatId);
//     const chatDoc = await chatRef.get();

//     if (!chatDoc.exists) {
//       console.warn("Chat not found for chatId:", chatId);
//       return [];
//     }

//     let messages = chatDoc.data().messages || [];

//     // Sort messages by timestamp (descending)
//     messages.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

//     if (lastTimestamp) {
//       messages = messages.filter(msg => new Date(msg.timestamp) < new Date(lastTimestamp));
//     }

//     return messages.slice(0, limit);
//   }
// }

// module.exports = ChatModel;


const admin = require("firebase-admin");
const { db } = require("../config/firebase");

class ChatModel {
  // Save message and associate it with a class
  static async saveMessage(chatId, classId, userId, sender, message) {
    const chatRef = db.collection("chats").doc(chatId);
    await chatRef.set(
      {
        userId,
        classId, // Store classId in Firestore
        messages: admin.firestore.FieldValue.arrayUnion({
          sender,
          message,
          timestamp: new Date().toISOString(),
        }),
      },
      { merge: true }
    );
  }

  // Retrieve chat history for a specific chat and class
  static async getChatHistory(chatId, classId, limit = 10, lastTimestamp = null) {
    const chatRef = db.collection("chats").doc(chatId);
    const chatDoc = await chatRef.get();

    if (!chatDoc.exists) {
      console.warn("Chat not found for chatId:", chatId);
      return [];
    }

    const chatData = chatDoc.data();
    if (chatData.classId !== classId) {
      console.warn("Class ID mismatch, no access to chat history");
      return [];
    }

    let messages = chatData.messages || [];
    messages.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

    if (lastTimestamp) {
      messages = messages.filter(msg => new Date(msg.timestamp) < new Date(lastTimestamp));
    }

    return messages.slice(0, limit);
  }
}

module.exports = ChatModel;

