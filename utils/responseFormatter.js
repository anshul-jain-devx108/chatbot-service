// // utils/responseFormatter.js

// /**
//  * Processes and formats the raw AI response.
//  * You can customize this function to format text, add timestamps, or apply any beautification.
//  *
//  * @param {string} rawResponse - The raw response from the AI service.
//  * @returns {Object} - An object containing a formatted message and additional info.
//  */
// function beautifyResponse(rawResponse) {
//     // For example, trim extra spaces and ensure proper punctuation.
//     let formatted = rawResponse.trim();
  
//     // Ensure the response ends with a period.
//     if (formatted && !/[.!?]$/.test(formatted)) {
//       formatted += ".";
//     }
  
//     // Example: You might want to split by sentences and capitalize them.
//     const sentences = formatted.split(/[.?!]\s*/).filter(Boolean).map(sentence => {
//       return sentence.charAt(0).toUpperCase() + sentence.slice(1);
//     });
  
//     // Join back to form a beautified message.
//     const beautifiedMessage = sentences.join(". ") + ".";
  
//     // Optionally add a timestamp or additional data.
//     const formattedResponse = {
//       message: beautifiedMessage,
//       processedAt: new Date().toISOString()
//     };
  
//     return formattedResponse;
//   }
  
//   module.exports = { beautifyResponse };
  

const marked = require("marked");

/**
 * Processes and formats the raw AI response.
 * Converts markdown content into HTML for a beautiful, rich-text output.
 *
 * @param {string} rawResponse - The raw response from the AI service.
 * @returns {Object} - An object containing both raw and HTML formatted message.
 */
function beautifyResponse(rawResponse) {
  // Clean up the response text
  let cleanedResponse = rawResponse.trim();

  // Convert markdown to HTML using marked
  let htmlResponse = marked.parse(cleanedResponse);

  // Optionally, you could do further processing here:
  // - Remove unwanted tags
  // - Adjust inline styling
  // - Convert bullet lists or headings if needed

  return {
    raw: cleanedResponse,
    html: htmlResponse,
    processedAt: new Date().toISOString()
  };
}

module.exports = { beautifyResponse };
