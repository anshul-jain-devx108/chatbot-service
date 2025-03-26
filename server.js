require("dotenv").config();
const express = require("express");
const cors = require("cors");
const chatRoutes = require("./routes/chatRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

// CORS Configuration
app.use(cors({
  origin: "*",
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type", "Authorization"],
  exposedHeaders: ["Content-Type", "Authorization"]
}));

// Middleware to Disable Timeout for SSE
app.use((req, res, next) => {
  req.setTimeout(0); // Disable timeout for long-lived SSE connections
  next();
});

app.use(express.json());
app.use("/api", chatRoutes);

// Start Server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
