
// class ChatModel {
//   // Saves a message by appending it to the 'messages' array in the chat document.
//   static async saveMessage(chatId, userId, sender, message) {
//     const chatRef = db.collection("chats").doc(chatId);
//     await chatRef.set(
//       {
//         userId,
//         messages: admin.firestore.FieldValue.arrayUnion({
//           sender,
//           message,
//           timestamp: new Date(),
//         }),
//       },
//       { merge: true }
//     );
//   }

//   // Retrieves chat history (paginated by Firestore query)
//   static async getChatHistory(chatId, limit = 10, lastTimestamp = null) {
//     let query = db.collection("chats").doc(chatId).collection("messages").orderBy("timestamp", "desc").limit(limit);

//     if (lastTimestamp) {
//       query = query.startAfter(lastTimestamp);
//     }

//     const snapshot = await query.get();
//     return snapshot.docs.map(doc => doc.data());
//   }
// }

// module.exports = ChatModel;

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
//           timestamp: new Date(),
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
//       throw new Error("Chat not found");
//     }

//     let messages = chatDoc.data().messages || [];

//     // Sort messages in descending order based on timestamp
//     messages = messages.sort((a, b) => b.timestamp - a.timestamp);

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
  // Save message by appending it to the 'messages' array
  static async saveMessage(chatId, userId, sender, message) {
    const chatRef = db.collection("chats").doc(chatId);
    await chatRef.set(
      {
        userId,
        messages: admin.firestore.FieldValue.arrayUnion({
          sender,
          message,
          timestamp: new Date().toISOString(),
        }),
      },
      { merge: true }
    );
  }

  // Retrieve chat history directly from the 'messages' array
  static async getChatHistory(chatId, limit = 10, lastTimestamp = null) {
    const chatRef = db.collection("chats").doc(chatId);
    const chatDoc = await chatRef.get();

    if (!chatDoc.exists) {
      console.warn("Chat not found for chatId:", chatId);
      return [];
    }

    let messages = chatDoc.data().messages || [];

    // Sort messages by timestamp (descending)
    messages.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

    if (lastTimestamp) {
      messages = messages.filter(msg => new Date(msg.timestamp) < new Date(lastTimestamp));
    }

    return messages.slice(0, limit);
  }
}

module.exports = ChatModel;
