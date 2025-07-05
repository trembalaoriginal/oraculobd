// oraculobd/backend/server.js
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const dotenv = require('dotenv'); // Para carregar variáveis de ambiente localmente

// Carrega variáveis de ambiente do arquivo .env (apenas para desenvolvimento local)
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001; // Usa a porta do ambiente (Render) ou 3001 localmente

// Configuração CORS - MUITO IMPORTANTE!
// **AQUI VOCÊ PRECISARÁ DA URL DO SEU FRONTEND DEPLOYADO NO RENDER**
// Por enquanto, para testes locais e deploy inicial, usaremos '*', mas depois você vai ALTERAR.
const allowedOrigins = [
    "http://localhost:5173", // Para desenvolvimento local do frontend
    "http://localhost:3000", // Outra porta comum para frontend local
    // **COLE AQUI A URL DO SEU FRONTEND DEPLOYADO NO RENDER**
    // Exemplo: "https://oraculofd-1.onrender.com"
    "*" // **ATENÇÃO: Este '*' deve ser substituído pela URL do seu frontend em produção!**
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
    }
}));
app.use(bodyParser.json());

// Configure sua chave API Gemini aqui.
// Em produção no Render, ela será carregada da variável de ambiente GEMINI_API_KEY.
// Localmente, ela será carregada do .env ou você pode colar aqui para testes rápidos.
const API_KEY = process.env.GEMINI_API_KEY || "SUA_API_KEY_GEMINI_AQUI"; // **ALTERAR AQUI PARA SUA CHAVE OU GARANTIR VARIÁVEL DE AMBIENTE**
const genAI = new GoogleGenerativeAI(API_KEY);

// Rota única para lidar com todos os comandos do frontend
app.post("/execute", async (req, res) => {
  const { command } = req.body; // O comando completo vindo do frontend (ex: "exec print('Olá')", "ask Qual o tempo?")

  if (!command) {
    return res.status(400).json({ error: "Comando não fornecido" });
  }

  let promptText = "";
  let resultType = "text"; // Para indicar o tipo de resposta

  if (command.startsWith("exec ")) {
    // Comando 'exec' (execução de Python) não é suportado por este backend Node.js
    return res.json({ result: "O comando 'exec' (execução de código Python) não é suportado por este backend Node.js. Por favor, use 'ask' ou 'html'." });
  } else if (command.startsWith("ask ")) {
    promptText = `Responda à pergunta: ${command.substring(4)}`;
    resultType = "answer";
  } else if (command.startsWith("html ")) {
    promptText = `Gere apenas o código HTML para a seguinte requisição. Não inclua markdown, explicações, ou qualquer texto extra, apenas o HTML puro. Requisicao: ${command.substring(5)}`;
    resultType = "html_code";
  } else {
    // Comportamento padrão se nenhum prefixo conhecido for encontrado
    promptText = `Crie o código para: ${command}`;
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent(promptText);
    const response = await result.response;
    const text = response.text();

    // Retorna a resposta com base no tipo de resultado esperado
    if (resultType === "answer") {
        res.json({ answer: text });
    } else if (resultType === "html_code") {
        res.json({ html_code: text });
    } else {
        res.json({ result: text });
    }

  } catch (err) {
    console.error("Erro ao processar comando Gemini:", err);
    res.status(500).json({ error: "Erro ao processar comando com a IA. Verifique os logs do backend." });
  }
});

// Rota de saúde para verificar se o backend está ativo
app.get("/", (req, res) => {
  res.send("Oráculo backend ativo (Node.js)");
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
