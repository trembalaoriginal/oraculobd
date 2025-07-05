const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Rota para teste
app.get("/", (req, res) => {
  res.send("Oráculo IA backend está no ar!");
});

// Rota para processar comandos
app.post("/execute", async (req, res) => {
  const { command } = req.body;

  if (!command) {
    return res.status(400).json({ error: "Nenhum comando recebido" });
  }

  try {
    // Aqui você configura sua API do Gemini
    const geminiApiKey = process.env.GEMINI_API_KEY; // salve no painel do Render
    const geminiEndpoint =
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent";

    const geminiResponse = await axios.post(
      `${geminiEndpoint}?key=${geminiApiKey}`,
      {
        contents: [
          {
            parts: [
              {
                text: command,
              },
            ],
          },
        ],
      }
    );

    const result =
      geminiResponse.data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Não foi possível gerar a resposta.";

    res.json({ result });
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ error: "Erro ao processar comando" });
  }
});

// Start
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
