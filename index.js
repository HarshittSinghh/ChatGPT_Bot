const express = require("express");
const OpenAI = require("openai");
const app = express();
app.use(express.json());
// Setup the OpenAI API client with your key here
const openai = new OpenAI({
  apiKey: "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",
});
app.get("/getResponse", async (req, res) => {
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: "What is the capital of India ?" }],
    stream: true,
  });
  console.log(response.choices[0].message.content);
});
app.listen(3000, () => {
  console.log("Server started on port 3000");
});
