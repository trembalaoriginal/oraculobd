const express = require('express');
const cors = require('cors');
const { html, python, javascript, css } = require('./codeLibrary');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// sanity check
app.get('/', (req, res) => res.send('Oráculo offline rodando!'));

app.post('/', (req, res) => {
  const { command } = req.body;
  if (!command) {
    return res.status(400).json({ error: 'O comando é obrigatório.' });
  }

  // separa: primeira palavra = linguagem, resto = descrição
  const [langRaw, ...rest] = command.trim().split(/\s+/);
  const lang = langRaw.toLowerCase();
  const desc = rest.join(' ');

  let snippet;
  switch (lang) {
    case 'html':
      snippet = html(desc);
      break;
    case 'python':
      snippet = python(desc);
      break;
    case 'javascript':
    case 'js':
      snippet = javascript(desc);
      break;
    case 'css':
      snippet = css(desc);
      break;
    default:
      snippet = `// Linguagem "${lang}" não suportada.`;
  }

  return res.json({ result: snippet });
});

app.listen(PORT, () => {
  console.log(`🚀 Oráculo offline escutando em http://localhost:${PORT}`);
});
