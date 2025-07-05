// backend/server.js
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const codeLibraries = require('./codeLibrary'); // Sua biblioteca de código
const searchEngine = require('./searchEngine'); // Seu motor de busca aprimorado

const app = express();
const PORT = process.env.PORT || 3001;

// Configuração CORS (garanta que a URL do seu frontend esteja correta)
const allowedOrigins = [
  'https://oraculofd-1.onrender.com', // Frontend Render
  'http://localhost:5173',          // Frontend local (Vite padrão)
  'http://localhost:3000'           // Frontend local (Outro)
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'A política de CORS para este site não permite acesso a partir da origem especificada.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
}));

app.use(bodyParser.json());

// **Inicializa o motor de busca na inicialização do servidor**
// Isso é crucial para o desempenho: o índice é construído uma vez.
searchEngine.initializeSearchIndex(codeLibraries);

app.get("/", (req, res) => {
  res.send("Oráculo Backend está online! Use a rota /execute para comandos.");
});

// Rota única para lidar com todos os comandos do frontend
app.post("/execute", async (req, res) => {
  const { command } = req.body;

  if (!command || !command.trim()) {
    return res.status(400).json({ error: "Comando não fornecido." });
  }

  // Realiza a busca usando o motor otimizado
  const results = searchEngine.search(command, 3); // Pega os 3 melhores resultados
  const suggestions = searchEngine.generateSuggestions(results, 3); // Gera 3 sugestões baseadas nos resultados

  if (results.length > 0) {
    // Formata a saída para o frontend
    let formattedResponse = results.map(r =>
      `Linguagem: ${r.language.toUpperCase()}\n` +
      `Descrição: ${r.description}\n` +
      `\`\`\`${r.language === 'javascript' ? 'js' : r.language}\n${r.code}\n\`\`\`\n`
    ).join('---\n'); // Separador entre múltiplos resultados

    if (suggestions.length > 0) {
        formattedResponse += `\n\n--- Sugestões ---\n` +
                             suggestions.map(s => `> ${s}`).join('\n');
    }

    res.json({ result: formattedResponse });
  } else {
    // Se não encontrar nada, tenta uma busca mais genérica para sugestões
    const fallbackSuggestions = searchEngine.generateSuggestions(
        searchEngine.search("common code", 5), // Busca por termos comuns
        3
    );
    let noResultMsg = `Desculpe, não encontrei nenhum snippet de código para "${command}".`;
    if (fallbackSuggestions.length > 0) {
        noResultMsg += `\n\n--- Sugestões --- \n` +
                       fallbackSuggestions.map(s => `> ${s}`).join('\n');
    }
    res.json({ result: noResultMsg });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor Oráculo Backend rodando na porta ${PORT}`);
});
