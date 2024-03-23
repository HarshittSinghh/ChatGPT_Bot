const express = require("express");
const OpenAI = require("openai");
const dotenv = require("dotenv");
dotenv.config(); // Load environment variables from .env file

const app = express();
app.use(express.json());

// Setup the OpenAI API client with your key from environment variables
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.get("/getResponse", async (req, res) => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: "What is the capital of India?" }],
      stream: true,
    });
    console.log(response.choices[0].message.content);
    res.json({ response: response.choices[0].message.content });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "An error occurred" });
  }
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
