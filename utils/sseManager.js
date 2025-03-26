// const clients = new Set();

// module.exports = {
//   addClient: (res) => {
//     res.setHeader("Content-Type", "text/event-stream");
//     res.setHeader("Cache-Control", "no-cache");
//     res.setHeader("Connection", "keep-alive");

//     clients.add(res);

//     res.on("close", () => {
//       clients.delete(res);
//     });
//   },

//   sendMessage: (message) => {
//     clients.forEach((res) => res.write(`data: ${JSON.stringify(message)}\n\n`));
//   }
// };


const SSE = {
  clients: [],

  addClient(res) {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.flushHeaders(); // Ensure headers are sent immediately

    SSE.clients.push(res);

    res.on('close', () => {
      SSE.clients = SSE.clients.filter(client => client !== res);
      console.log("Client disconnected.");
    });

    console.log("Client connected.");
  },

  sendMessage(data) {
    SSE.clients.forEach(client => {
      client.write(`data: ${JSON.stringify(data)}\n\n`);
    });
  }
};

module.exports = SSE;
