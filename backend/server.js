const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("✅ Oráculo IA backend rodando!");
});

app.post("/execute", async (req, res) => {
  const { command } = req.body;

  if (!command) {
    return res.status(400).json({ error: "Nenhum comando enviado" });
  }

  try {
    const geminiApiKey = process.env.GEMINI_API_KEY; // configure no Render
    const geminiEndpoint =
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent";

    const response = await axios.post(
      `${geminiEndpoint}?key=${geminiApiKey}`,
      {
        contents: [
          {
            parts: [{ text: command }]
          }
        ]
      }
    );

    const result =
      response.data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Nenhuma resposta gerada.";

    res.json({ result });
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500)
