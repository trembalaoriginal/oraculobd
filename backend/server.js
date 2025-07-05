const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// GET / — rota de sanity check
app.get('/', (req, res) => {
  res.send('🔮 Oráculo IA backend rodando.');
});

// POST / — recebe { command } e devolve { result }
app.post('/', async (req, res) => {
  const { command } = req.body;
  if (!command) {
    return res.status(400).json({ error: 'O comando é obrigatório.' });
  }

  try {
    const apiKey = process.env.GEMINI_API_KEY; // Defina no painel do Render
    const endpoint = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';

    const { data } = await axios.post(
      `${endpoint}?key=${apiKey}`,
      { contents: [{ parts: [{ text: command }] }] }
    );

    const result =
      data.candidates?.[0]?.content?.parts?.[0]?.text ||
      'Não consegui gerar resposta.';

    res.json({ result });
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ error: 'Falha ao chamar a API de IA.' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Backend escutando em http://localhost:${PORT}`);
});
