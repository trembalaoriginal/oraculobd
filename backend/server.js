// backend/server.js (adaptado)
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const codeLibraries = require('./codeLibrary'); // Sua biblioteca de código
const searchEngine = require('./searchEngine'); // Seu novo motor de busca

const app = express();
const PORT = process.env.PORT || 3001;

// ... (configuração CORS, bodyParser) ...

// **Inicializa o motor de busca na inicialização do servidor**
searchEngine.initializeSearchIndex(codeLibraries);


app.post("/execute", async (req, res) => {
  const { command } = req.body; // O comando completo vindo do frontend

  if (!command || !command.trim()) {
    return res.status(400).json({ error: "Comando não fornecido." });
  }

  // A busca agora é mais flexível: o comando completo é a query.
  const results = searchEngine.search(command, 3); // Retorna os 3 melhores resultados

  if (results.length > 0) {
    // Retornar múltiplos resultados com descrições
    const formattedResults = results.map(r =>
      `Linguagem: ${r.language.toUpperCase()}\nDescrição: ${r.description}\n\`\`\`${r.language}\n${r.code}\n\`\`\`\n`
    ).join('---\n'); // Separar múltiplos resultados

    res.json({ result: formattedResults });
  } else {
    res.json({ result: `Desculpe, não encontrei nenhum snippet de código para "${command}". Tente uma descrição diferente.` });
  }
});

// ... (app.get("/") e app.listen(PORT)) ...
