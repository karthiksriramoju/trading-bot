import dotenv from "dotenv";
dotenv.config();

// import OpenAI from "openai";
// const openai = new OpenAI({
//   baseURL: "https://openrouter.ai/api/v1",
//   apiKey:"",
//   defaultHeaders: {
//     "HTTP-Referer": "", // Optional. Site URL for rankings on openrouter.ai.
//     "X-Title": "", // Optional. Site title for rankings on openrouter.ai.
//   }
// })
export async function getTokenFromLLM(contents: string) {
      try {
        const question = 'write a basic react code for a todo app';
        const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body:JSON.stringify({
            model: 'deepseek/deepseek-r1:free',
            messages: [{ role: 'user', content: question }],
          }),
        });
        console.log(response)
        const completion = await response.json();

        // const formatResponse = (text:any) => {
        //   return text
        //     .replace(/\*\*(.*?)\*\*/g, "\x1b[1m$1\x1b[0m")  // Bold text
        //     .replace(/\n/g, "\n\n")  // Extra spacing for readability
        //     .replace(/-\s/g, "• ");  // Convert lists to bullets
        // };

        // console.log(formatResponse(completion.choices[0].message.content))

        // return completion.choices[0].message.content

      } catch (error) {
        console.error('Error in getTokenFromLLM:', error);
        return error
    }
}

