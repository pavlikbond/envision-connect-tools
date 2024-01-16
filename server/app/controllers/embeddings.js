import axios from "axios";

export async function getEmbeddings(text) {
  try {
    const response = await axios.post(
      "https://api.openai.com/v1/embeddings",
      {
        model: "text-embedding-ada-002",
        input: text.replace(/\n/g, ""),
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );
    const result = response.data;
    //console.log(result);
    return result.data[0].embedding;
  } catch (error) {
    console.log("error calling openai embeddings api", error);
    throw error;
  }
}
