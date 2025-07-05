// oraculobd/backend/server.js
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const dotenv = require('dotenv');

// Carrega variáveis de ambiente do arquivo .env (apenas para desenvolvimento local)
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001; // Usa a porta do ambiente (Render) ou 3001 localmente

// Configuração CORS - MUITO IMPORTANTE!
// **A URL do seu frontend deployado no Render precisa estar AQUI!**
// Pela última imagem, a URL é https://oraculofd-1.onrender.com
const allowedOrigins = [
    "http://localhost:5173", // Para desenvolvimento local do frontend
    "http://localhost:3000", // Outra porta comum para frontend local
    "https://oraculofd-1.onrender.com" // <-- SUA URL EXATA DO FRONTEND AQUI!
];

app.use(cors({
    origin: function (origin, callback) {
        // Permite requisições sem 'origin' (ex: de ferramentas como Postman ou curl)
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            const msg = `A política CORS para este site não permite acesso da Origem ${origin} especificada.`;
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Adicione todos os métodos que você usa
    allowedHeaders: ["Content-Type", "Authorization"], // Adicione todos os cabeçalhos que você usa
    credentials: true // Permite que o navegador inclua cookies e cabeçalhos de autorização
}));
app.use(bodyParser.json());

// Configure sua chave API Gemini aqui.
// Em produção no Render, ela será carregada da variável de ambiente GEMINI_API_KEY.
// Localmente, ela será carregada do .env.
const API_KEY = process.env.GEMINI_API_KEY; // Apenas pega do ambiente
if (!API_KEY) {
    console.error("ERRO: Variável de ambiente GEMINI_API_KEY não configurada.");
    process.exit(1); // Sai do processo se a chave não estiver configurada
}
const genAI = new GoogleGenerativeAI(API_KEY);

// Rota única para lidar com todos os comandos do frontend
app.post("/execute", async (req, res) => {
  const { command } = req.body; // O comando completo vindo do frontend (ex: "exec print('Olá')", "ask Qual o tempo?")

  if (!command) {
    return res.status(400).json({ error: "Comando não fornecido" });
  }

  let promptText = "";
  let resultKey = "result"; // Chave padrão para a resposta

  if (command.startsWith("exec ")) {
    // Comando 'exec' (execução de Python) não é suportado por este backend Node.js
    return res.json({ result: "O comando 'exec' (execução de código Python) não é suportado por este backend Node.js. Por favor, use 'ask' ou 'html'." });
  } else if (command.startsWith("ask ")) {
    promptText = `Responda à pergunta: ${command.substring(4)}`;
    resultKey = "answer";
  } else if (command.startsWith("html ")) {
    promptText = `Gere apenas o código HTML para a seguinte requisição. Não inclua markdown, explicações, ou qualquer texto extra, apenas o HTML puro. Requisicao: ${command.substring(5)}`;
    resultKey = "html_code";
  } else {
    // Comportamento padrão se nenhum prefixo conhecido for encontrado
    promptText = `Crie o código para: ${command}`;
    resultKey = "result";
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent(promptText);
    const response = await result.response;
    const text = response.text();

    const responseBody = {};
    responseBody[resultKey] = text;
    res.json(responseBody);

  } catch (err) {
    console.error("Erro ao processar comando Gemini:", err);
    // Erros da API Gemini podem ter detalhes no `err.message`
    let errorMessage = "Erro ao processar comando com a IA.";
    if (err.message && err.message.includes("API key not valid")) {
        errorMessage = "Erro de autenticação da API Gemini. Verifique sua chave API.";
    } else if (err.message) {
        errorMessage += ` Detalhes: ${err.message}`;
    }
    res.status(500).json({ error: errorMessage });
  }
});

// Rota de saúde para verificar se o backend está ativo
app.get("/", (req, res) => {
  res.send("Oráculo backend ativo (Node.js)");
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
