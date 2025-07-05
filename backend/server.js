const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// GET só para teste
app.get('/', (req, res) => {
  res.send('Oráculo backend rodando. Use POST / para enviar comandos.');
});

// POST /
app.post('/', async (req, res) => {
  const { command } = req.body;

  if (!command) {
    return res.status(400).json({ error: 'O comando é obrigatório.' });
  }

  try {
    const geminiApiKey = process.env.GEMINI_API_KEY || 'SUA_API_KEY';
    const geminiEndpoint = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';

    const geminiResponse = await axios.post(
      `${geminiEndpoint}?key=${geminiApiKey}`,
      {
        contents: [
          {
            parts: [{ text: command }]
          }
        ]
      }
    );

    const respostaGemini = geminiResponse.data.candidates?.[0]?.content?.parts?.[0]?.text || 'Sem resposta.';

    res.json({ result: respostaGemini });
  } catch (error) {
    console.error('Erro na API do Gemini:', error.message);
    res.status(500).json({ error: 'Erro ao processar o comando.' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
