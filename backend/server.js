const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());

// configure a sua chave API Gemini aqui
const genAI = new GoogleGenerativeAI("SUA_API_KEY_GEMINI");

app.post("/execute", async (req, res) => {
  const { command } = req.body;

  if (!command) {
    return res.status(400).json({ error: "Comando não fornecido" });
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent(`Crie o código para: ${command}`);
    const response = await result.response;
    const text = response.text();

    res.json({ result: text });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao processar comando" });
  }
});

app.get("/", (req, res) => {
  res.send("Oráculo backend ativo");
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
