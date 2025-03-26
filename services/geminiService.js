const axios = require("axios");

class GeminiService {
  static async generateResponse(prompt) {
    // Retrieve required values from environment variables
    const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
    const YOUR_SITE_URL = process.env.YOUR_SITE_URL || "http://localhost";
    const YOUR_SITE_NAME = process.env.YOUR_SITE_NAME || "Chatbot Service";

    // OpenRouter API endpoint for chat completions
    const url = "https://openrouter.ai/api/v1/chat/completions";

    // Build the request body.
    // This example sends only a text prompt. If you need image content, adjust accordingly.
    const requestBody = {
      model: "google/gemma-3-1b-it:free",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: prompt,
            }
          ],
        },
      ],
    };

    try {
      const response = await axios.post(url, requestBody, {
        headers: {
          "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
          "HTTP-Referer": YOUR_SITE_URL,
          "X-Title": YOUR_SITE_NAME,
          "Content-Type": "application/json",
        },
      });

      // Adjust response parsing based on the API response structure.
      const textResponse = response.data.choices[0].message.content;
      return textResponse;
    } catch (error) {
      console.error(
        "Error calling OpenRouter API:",
        error.response ? error.response.data : error.message
      );
      throw new Error("OpenRouter API error");
    }
  }
}

module.exports = GeminiService;
