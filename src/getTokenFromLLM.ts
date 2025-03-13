// import dotenv from "dotenv";
// dotenv.config();

// // import OpenAI from "openai";
// // const openai = new OpenAI({
// //   baseURL: "https://openrouter.ai/api/v1",
// //   apiKey:"",
// //   defaultHeaders: {
// //     "HTTP-Referer": "", // Optional. Site URL for rankings on openrouter.ai.
// //     "X-Title": "", // Optional. Site title for rankings on openrouter.ai.
// //   }
// // })
// export async function getTokenFromLLM(contents: string) {
//   try {
//     // Check if the API key is set
//     if (!process.env.OPENROUTER_API_KEY) {
//       throw new Error("OPENROUTER_API_KEY is not set in the environment variables.");
//     }

//     console.log('API Key:', process.env.OPENROUTER_API_KEY);

//     const question = 'write a basic react code for a todo app';
//     const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
//       method: 'POST',
//       headers: {
//         Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         model: 'deepseek/deepseek-r1:free',
//         messages: [{ role: 'user', content: question }],
//       }),
//     });

//     // Log the response status and headers for debugging
//     console.log('Response Status:', response.status);
//     console.log('Response Headers:', response.headers);

//     // Check if the response is successful
//     if (!response.ok) {
//       const errorResponse = await response.json();
//       throw new Error(`API request failed: ${response.status} ${response.statusText}. Details: ${JSON.stringify(errorResponse)}`);
//     }

//     const completion = await response.json();
//     console.log('API Response:', completion);

//     // Format and return the response
//     const formatResponse = (text: string) => {
//       return text
//         .replace(/\*\*(.*?)\*\*/g, "\x1b[1m$1\x1b[0m")  // Bold text
//         .replace(/\n/g, "\n\n")  // Extra spacing for readability
//         .replace(/-\s/g, "• ");  // Convert lists to bullets
//     };

//     const formattedResponse = formatResponse(completion.choices[0].message.content);
//     console.log(formattedResponse);

//     return formattedResponse;
//   } catch (error) {
//     console.error('Error in getTokenFromLLM:', error);
//     throw error; // Re-throw the error to handle it in the caller
//   }
// }

export async function getTokenFromLLM(contents: string) {

  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
      "HTTP-Referer": "<YOUR_SITE_URL>", // Optional. Site URL for rankings on openrouter.ai.
      "X-Title": "<YOUR_SITE_NAME>", // Optional. Site title for rankings on openrouter.ai.
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      "model": "deepseek/deepseek-r1:free",
      "messages": [
        {
          "role": "system",
          "content": "You are an AI agent that processes tweets to determine if they are signaling a buy opportunity for a Solana-based token. Your goal is to detect whether the tweet suggests buying a token (either explicitly or implicitly) and extract the Solana token address if present.Only return if it says its a bullish. If the tweet is not about a Solana-based token, return null. Note : return just the tokenaddress or null if not found.No other should be returned.",
        },
        {
          "role": "user",
          "content": contents,
        }
      ]
    })
  });

  const completion = await response.json();
  return completion.choices[0].message.content
}