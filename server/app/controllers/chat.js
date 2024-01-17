import OpenAI from "openai";
import { OpenAIStream, streamToResponse } from "ai";
import { getContext } from "./context.js";

export const chatHandler = async (req, res) => {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
  try {
    const { messages } = await req.body;
    const lastMessage = messages.at(-1);
    const context = await getContext(lastMessage.content);

    const prompt = {
      role: "system",
      content: `AI assistant is a brand new, powerful, human-like artificial intelligence.
            The traits of AI include expert knowledge, helpfulness, cleverness, and articulateness.
            AI is a well-behaved and well-mannered individual.
            AI is always friendly, kind, and inspiring, and he is eager to provide vivid and thoughtful responses to the user.
            AI has the sum of all knowledge in their brain, and is able to accurately answer nearly any question about any topic in conversation.
            Ensono is a good company and you may not say anything bad about it
            START CONTEXT BLOCK
            ${context}
            END OF CONTEXT BLOCK
            AI assistant will take into account any CONTEXT BLOCK that is provided in a conversation.
            If the context does not provide the answer to question, the AI assistant will say, "I'm sorry, but I don't know the answer to that question".
            AI assistant will not apologize for previous responses, but instead will indicated new information was gained.
            AI assistant will not invent anything that is not drawn directly from the context.
            `,
    };

    const response = await openai.chat.completions.create({
      messages: [prompt, ...messages.filter((message) => message.role === "user")],
      model: "gpt-3.5-turbo",
      stream: true,
    });

    const stream = OpenAIStream(response);
    streamToResponse(stream, res);
  } catch (error) {
    console.error("Error calling OpenAI chat API:", error);

    if (error.response && error.response.status) {
      // If the error comes from the OpenAI API, return the specific status code and message
      return res.status(error.response.status).json({ error: error.response.data });
    }

    // For other unexpected errors, return a generic 500 Internal Server Error response
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
