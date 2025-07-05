// backend/codeLibrary/javascript.js
module.exports = [
  {
    id: 'js-express-server',
    keywords: ['servidor express', 'api nodejs', 'rest api', 'backend'],
    tags: ['backend', 'nodejs', 'api'],
    description: 'Um servidor Express.js básico para uma API REST simples.',
    code: `const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json()); // Middleware para parsear JSON no corpo da requisição

// Rota GET de exemplo
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Bem-vindo à sua API Express!' });
});

// Rota POST de exemplo
app.post('/data', (req, res) => {
  const { name, value } = req.body;
  if (!name || !value) {
    return res.status(400).json({ error: 'Nome e valor são obrigatórios.' });
  }
  console.log('Dados recebidos:', { name, value });
  res.status(201).json({ message: 'Dados processados com sucesso!', received: { name, value } });
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(\`Servidor Express rodando em http://localhost:\${PORT}\`);
});`,
    weight: 10,
    related: ['docker-node']
  },
  {
    id: 'js-debounce-function',
    keywords: ['debounce', 'otimizar', 'performance', 'evento'],
    tags: ['utilitario', 'performance', 'funcao'],
    description: 'Implementação de uma função debounce para otimização de eventos.',
    code: `/**
 * Retorna uma função que só pode ser executada após um certo atraso
 * desde a última vez que foi chamada. Útil para eventos como redimensionamento,
 * rolagem ou digitação para evitar execuções excessivas.
 * @param {Function} func A função original a ser "debounced".
 * @param {number} delay O tempo de atraso em milissegundos.
 * @returns {Function} A versão "debounced" da função.
 */
function debounce(func, delay) {
  let timeoutId; // Variável para armazenar o ID do timer

  return function(...args) {
    // 'this' mantém o contexto original da chamada
    const context = this;

    // Limpa qualquer timer anterior para reiniciar o atraso
    clearTimeout(timeoutId);

    // Configura um novo timer
    timeoutId = setTimeout(() => {
      // Executa a função original após o atraso
      func.apply(context, args);
    }, delay);
  };
}

// --- Exemplo de Uso ---
// function searchUsers(query) {
//   console.log('Pesquisando por:', query);
//   // Simule uma chamada de API aqui
// }

// const debouncedSearch = debounce(searchUsers, 500); // Debounce de 500ms

// // No seu input:
// // <input type="text" onkeyup="(e) => debouncedSearch(e.target.value)" />
// // ou
// // document.getElementById('searchInput').addEventListener('keyup', (e) => {
// //   debouncedSearch(e.target.value);
// // });`,
    weight: 9,
    related: []
  },
  {
    id: 'js-dom-manipulation-add-remove',
    keywords: ['dom', 'manipular html', 'criar elemento', 'remover elemento'],
    tags: ['frontend', 'dom'],
    description: 'Exemplos de como adicionar e remover elementos no DOM.',
    code: `// 1. Selecionar um elemento existente
const container = document.getElementById('app-root'); // Assumindo um div com id="app-root"

if (container) {
  // 2. Criar um novo elemento (ex: um parágrafo)
  const newParagraph = document.createElement('p');
  newParagraph.textContent = 'Este parágrafo foi adicionado dinamicamente!';
  newParagraph.style.color = 'blue';
  newParagraph.classList.add('dynamic-text'); // Adiciona uma classe CSS

  // 3. Adicionar o novo elemento ao container
  container.appendChild(newParagraph);
  console.log('Parágrafo adicionado.');

  // 4. Criar e adicionar um botão que remove a si mesmo
  const removeButton = document.createElement('button');
  removeButton.textContent = 'Remover Este Botão';
  removeButton.style.marginTop = '10px';
  removeButton.onclick = function() {
    this.remove(); // 'this' se refere ao próprio botão
    console.log('Botão removido.');
  };
  container.appendChild(removeButton);

  // 5. Remover um elemento específico após um tempo (ex: o parágrafo adicionado)
  setTimeout(() => {
    if (newParagraph.parentNode) { // Verifica se ainda está no DOM
      newParagraph.parentNode.removeChild(newParagraph);
      console.log('Parágrafo removido após 5 segundos.');
    }
  }, 5000);

} else {
  console.error('Elemento com ID "app-root" não encontrado no DOM.');
}`,
    weight: 8,
    related: ['html-basic-structure']
  },
  {
    id: 'js-fetch-api-get',
    keywords: ['fetch', 'api get', 'http request', 'requisicao'],
    tags: ['rede', 'assincrono', 'api'],
    description: 'Como fazer uma requisição GET simples usando Fetch API.',
    code: `/**
 * Busca dados de uma URL usando a Fetch API (método GET).
 * @param {string} url O endpoint da API.
 * @returns {Promise<Object>} Uma promessa que resolve para os dados JSON.
 */
async function fetchData(url) {
  try {
    const response = await fetch(url);

    // Lança um erro se a resposta não for OK (status 2xx)
    if (!response.ok) {
      throw new Error(\`Erro HTTP! Status: \${response.status}\`);
    }

    const data = await response.json(); // Converte a resposta para JSON
    return data;
  } catch (error) {
    console.error('Erro ao buscar dados:', error);
    // Relança o erro para que o chamador possa lidar com ele
    throw error;
  }
}

// --- Exemplo de Uso ---
// fetchData('https://jsonplaceholder.typicode.com/posts/1')
//   .then(data => {
//     console.log('Dados do Post:', data);
//   })
//   .catch(error => {
//     console.error('Falha ao carregar o post:', error);
//   });

// fetchData('https://api.github.com/users/octocat')
//   .then(data => {
//     console.log('Dados do Usuário GitHub:', data);
//   })
//   .catch(error => {
//     console.error('Falha ao carregar dados do GitHub:', error);
//   });`,
    weight: 9,
    related: ['js-fetch-api-post']
  },
  {
    id: 'js-fetch-api-post',
    keywords: ['fetch post', 'enviar dados', 'http post', 'api post'],
    tags: ['rede', 'assincrono', 'api'],
    description: 'Como enviar dados (POST) para uma API usando Fetch API.',
    code: `/**
 * Envia dados para uma URL usando a Fetch API (método POST).
 * @param {string} url O endpoint da API.
 * @param {Object} data O objeto de dados a ser enviado (será convertido para JSON).
 * @returns {Promise<Object>} Uma promessa que resolve para a resposta JSON da API.
 */
async function postData(url, data) {
  try {
    const response = await fetch(url, {
      method: 'POST', // Define o método HTTP como POST
      headers: {
        'Content-Type': 'application/json', // Informa que o corpo da requisição é JSON
      },
      body: JSON.stringify(data), // Converte o objeto JavaScript em string JSON
    });

    if (!response.ok) {
      throw new Error(\`Erro HTTP! Status: \${response.status}\`);
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error('Erro ao enviar dados:', error);
    throw error;
  }
}

// --- Exemplo de Uso ---
// const newUser = {
//   name: 'Fulano de Tal',
//   job: 'Desenvolvedor'
// };

// postData('https://jsonplaceholder.typicode.com/posts', newUser) // Exemplo: api que aceita POST
//   .then(data => {
//     console.log('Resposta da API:', data);
//   })
//   .catch(error => {
//     console.error('Falha ao enviar dados:', error);
//   });`,
    weight: 9,
    related: ['js-express-server']
  },
  {
    id: 'js-form-validation',
    keywords: ['validacao formulario', 'validar input', 'regex email'],
    tags: ['frontend', 'formulario', 'validacao'],
    description: 'Validação de formulário JavaScript com exemplos de email e senha.',
    code: `function validateForm() {
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');
  const emailError = document.getElementById('email-error');
  const passwordError = document.getElementById('password-error');

  let isValid = true;

  // Validação de Email
  if (!emailInput.value || !isValidEmail(emailInput.value)) {
    emailError.textContent = 'Por favor, insira um email válido.';
    emailError.style.display = 'block';
    isValid = false;
  } else {
    emailError.textContent = '';
    emailError.style.display = 'none';
  }

  // Validação de Senha (mínimo 6 caracteres)
  if (!passwordInput.value || passwordInput.value.length < 6) {
    passwordError.textContent = 'A senha deve ter pelo menos 6 caracteres.';
    passwordError.style.display = 'block';
    isValid = false;
  } else {
    passwordError.textContent = '';
    passwordError.style.display = 'none';
  }

  return isValid;
}

// Função auxiliar para validar formato de email
function isValidEmail(email) {
  const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(String(email).toLowerCase());
}

// --- Exemplo de HTML para o formulário ---
// <form onsubmit="return validateForm()">
//   <label for="email">Email:</label>
//   <input type="email" id="email" name="email" required>
//   <span id="email-error" style="color: red; display: none;"></span>

//   <label for="password">Senha:</label>
//   <input type="password" id="password" name="password" required>
//   <span id="password-error" style="color: red; display: none;"></span>

//   <button type="submit">Enviar</button>
// </form>`,
    weight: 9,
    related: ['html-login-form', 'css-form-styles']
  },
  {
    id: 'js-array-filter-map-reduce',
    keywords: ['array', 'filter', 'map', 'reduce', 'manipular array', 'funcoes array'],
    tags: ['utilitario', 'data manipulation'],
    description: 'Exemplos de uso de `filter`, `map` e `reduce` em arrays.',
    code: `const products = [
  { id: 1, name: 'Laptop', price: 1200, category: 'Electronics', inStock: true },
  { id: 2, name: 'Keyboard', price: 75, category: 'Electronics', inStock: false },
  { id: 3, name: 'Coffee Mug', price: 15, category: 'Home', inStock: true },
  { id: 4, name: 'Monitor', price: 300, category: 'Electronics', inStock: true },
  { id: 5, name: 'Notebook', price: 5, category: 'Office', inStock: true }
];

// --- 1. filter: Criar um novo array com elementos que passam em um teste ---
const inStockElectronics = products.filter(product =>
  product.category === 'Electronics' && product.inStock
);
console.log('Produtos eletrônicos em estoque:', inStockElectronics);
// Expected: [ {id: 1, ...Laptop}, {id: 4, ...Monitor} ]

// --- 2. map: Criar um novo array aplicando uma função a cada elemento ---
const productNames = products.map(product => product.name);
console.log('Nomes dos produtos:', productNames);
// Expected: [ 'Laptop', 'Keyboard', 'Coffee Mug', 'Monitor', 'Notebook' ]

const discountedPrices = products.map(product => ({
  ...product,
  price: product.price * 0.9 // 10% de desconto
}));
console.log('Preços com desconto:', discountedPrices);

// --- 3. reduce: Reduzir um array a um único valor ---
const totalInventoryValue = products.reduce((accumulator, product) => {
  return accumulator + (product.price * (product.inStock ? 1 : 0)); // Soma apenas os em estoque
}, 0); // O 0 é o valor inicial do accumulator
console.log('Valor total do estoque (somente em estoque):', totalInventoryValue);
// Expected (1200 + 15 + 300 + 5) = 1520`,
    weight: 8,
    related: []
  },
  {
    id: 'js-localstorage-usage',
    keywords: ['localstorage', 'salvar dados navegador', 'armazenar', 'persistir dados'],
    tags: ['frontend', 'browser-api', 'dados'],
    description: 'Como usar localStorage para armazenar dados simples no navegador.',
    code: `// --- Salvar dados no localStorage ---
function saveUserData(user) {
  try {
    localStorage.setItem('currentUser', JSON.stringify(user));
    console.log('Dados do usuário salvos no localStorage.');
  } catch (e) {
    console.error('Erro ao salvar no localStorage:', e);
  }
}

// --- Carregar dados do localStorage ---
function loadUserData() {
  try {
    const userData = localStorage.getItem('currentUser');
    return userData ? JSON.parse(userData) : null;
  } catch (e) {
    console.error('Erro ao carregar do localStorage:', e);
    return null;
  }
}

// --- Remover dados do localStorage ---
function removeUserData() {
  localStorage.removeItem('currentUser');
  console.log('Dados do usuário removidos do localStorage.');
}

// --- Exemplo de Uso ---
// const user = { name: 'Alice', theme: 'dark', lastLogin: new Date() };
// saveUserData(user);

// const loadedUser = loadUserData();
// if (loadedUser) {
//   console.log('Usuário carregado:', loadedUser);
// }

// removeUserData();
// console.log('Dados após remoção:', loadUserData());`,
    weight: 7,
    related: []
  },
  {
    id: 'js-toggle-class',
    keywords: ['toggle class', 'adicionar remover classe', 'interacao ui'],
    tags: ['frontend', 'dom', 'ui'],
    description: 'Alternar uma classe CSS em um elemento HTML para efeitos visuais.',
    code: `// Função para alternar uma classe CSS em um elemento
function toggleCssClass(elementId, className) {
  const element = document.getElementById(elementId);
  if (element) {
    element.classList.toggle(className);
    console.log(\`Classe '\${className}' alternada para o elemento #\${elementId}\`);
  } else {
    console.error(\`Elemento com ID '\${elementId}' não encontrado.\`);
  }
}

// --- Exemplo de Uso ---
// HTML: <div id="myElement" class="active">Conteúdo</div>
// CSS:
// .active { background-color: yellow; border: 2px solid orange; }
// .hidden { display: none; }

// Para alternar entre 'active' e 'inative':
// toggleCssClass('myElement', 'active');

// Para esconder/mostrar:
// toggleCssClass('myElement', 'hidden');

// Você pode chamar esta função em um evento de clique de botão
// <button onclick="toggleCssClass('myElement', 'highlight')">Alternar Destaque</button>`,
    weight: 6,
    related: ['css-navbar-responsive']
  }
];
