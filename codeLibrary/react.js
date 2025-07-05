// backend/codeLibrary/react.js
module.exports = [
  {
    id: 'react-functional-component',
    keywords: ['componente funcional', 'functional component', 'componente basico'],
    tags: ['react', 'componente', 'fundamentos'],
    description: 'A estrutura básica de um componente funcional React.',
    code: `import React from 'react';

/**
 * Componente funcional simples que exibe uma mensagem.
 * @param {Object} props - As propriedades passadas para o componente.
 * @param {string} props.message - A mensagem a ser exibida.
 */
export default function GreetUser({ message = "Olá do React!" }) {
  return (
    <div style={{ padding: '20px', border: '1px solid #61dafb', borderRadius: '8px', backgroundColor: '#e0f7fa', textAlign: 'center' }}>
      <h1>{message}</h1>
      <p>Este é um componente funcional React.</p>
    </div>
  );
}`,
    weight: 10,
    related: ['react-usestate']
  },
  {
    id: 'react-usestate',
    keywords: ['usestate', 'estado', 'state management', 'hook'],
    tags: ['react', 'hook', 'estado'],
    description: 'Como usar o hook `useState` para gerenciar o estado em componentes funcionais.',
    code: `import React, { useState } from 'react';

export default function Counter() {
  // Declara uma nova variável de estado chamada "count"
  // e uma função para atualizá-la, "setCount".
  // O valor inicial de count é 0.
  const [count, setCount] = useState(0);

  const increment = () => {
    // Atualiza o estado incrementando o valor atual de count
    setCount(prevCount => prevCount + 1);
  };

  const decrement = () => {
    setCount(prevCount => prevCount - 1);
  };

  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px', maxWidth: '300px', margin: '20px auto', textAlign: 'center' }}>
      <p style={{ fontSize: '1.5em', marginBottom: '15px' }}>Contador: <strong>{count}</strong></p>
      <button onClick={increment} style={{ padding: '10px 15px', marginRight: '10px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
        Incrementar
      </button>
      <button onClick={decrement} style={{ padding: '10px 15px', backgroundColor: '#f44336', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
        Decrementar
      </button>
    </div>
  );
}`,
    weight: 10,
    related: ['react-useeffect']
  },
  {
    id: 'react-useeffect',
    keywords: ['useeffect', 'efeito colateral', 'lifecycle', 'hook'],
    tags: ['react', 'hook', 'lifecycle'],
    description: 'Como usar o hook `useEffect` para efeitos colaterais em componentes.',
    code: `import React, { useState, useEffect } from 'react';

export default function DataFetcher() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Função assíncrona para buscar dados
    const fetchData = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts/1');
        if (!response.ok) {
          throw new Error(\`HTTP error! status: \${response.status}\`);
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData(); // Chama a função de busca quando o componente monta

    // Cleanup function (opcional): Executada quando o componente desmonta
    // ou antes do efeito rodar novamente se as dependências mudarem.
    return () => {
      console.log('Cleanup do efeito: Componente desmontando ou efeito re-executando.');
      // Cancela requisições pendentes ou limpa listeners
    };
  }, []); // Array de dependências vazio: o efeito roda apenas uma vez (no componentDidMount)

  if (loading) return <p>Carregando dados...</p>;
  if (error) return <p>Erro ao carregar: {error.message}</p>;

  return (
    <div style={{ padding: '20px', border: '1px solid #a7d9b9', borderRadius: '8px', backgroundColor: '#e6ffe6', margin: '20px auto', maxWidth: '500px' }}>
      <h3 style={{ color: '#28a745' }}>Dados Carregados:</h3>
      <p><strong>Título:</strong> {data.title}</p>
      <p><strong>Corpo:</strong> {data.body.substring(0, 100)}...</p>
    </div>
  );
}`,
    weight: 9,
    related: ['js-fetch-api-get']
  },
  {
    id: 'react-conditional-rendering',
    keywords: ['renderizacao condicional', 'if else react', 'mostrar esconder'],
    tags: ['react', 'renderizacao'],
    description: 'Como renderizar elementos React condicionalmente.',
    code: `import React, { useState } from 'react';

export default function ConditionalMessage() {
  const [showMessage, setShowMessage] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  return (
    <div style={{ padding: '20px', border: '1px solid #ffcc00', borderRadius: '8px', backgroundColor: '#fffbe6', margin: '20px auto', maxWidth: '400px' }}>
      <h2>Renderização Condicional</h2>

      {/* Exemplo 1: Operador Ternário */}
      {isLoggedIn ? (
        <p style={{ color: 'green' }}>Bem-vindo de volta!</p>
      ) : (
        <p style={{ color: 'red' }}>Por favor, faça login.</p>
      )}
      <button onClick={() => setIsLoggedIn(!isLoggedIn)} style={{ margin: '10px 0', padding: '8px 15px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
        Toggle Login
      </button>

      <hr style={{ margin: '20px 0', borderColor: '#ddd' }} />

      {/* Exemplo 2: Operador Lógico && */}
      <button onClick={() => setShowMessage(!showMessage)} style={{ padding: '8px 15px', backgroundColor: '#6c757d', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
        {showMessage ? 'Esconder Mensagem' : 'Mostrar Mensagem'}
      </button>
      {showMessage && (
        <p style={{ marginTop: '15px', padding: '10px', backgroundColor: '#d4edda', border: '1px solid #28a745', borderRadius: '5px' }}>
          Esta mensagem aparece condicionalmente!
        </p>
      )}
    </div>
  );
}`,
    weight: 8,
    related: ['react-usestate']
  },
  {
    id: 'react-list-rendering',
    keywords: ['lista react', 'map', 'renderizar lista', 'key'],
    tags: ['react', 'renderizacao'],
    description: 'Como renderizar uma lista de elementos usando o método `map` e a prop `key`.',
    code: `import React from 'react';

export default function ProductList() {
  const products = [
    { id: 1, name: 'Smart TV 50"', price: 2500 },
    { id: 2, name: 'Soundbar', price: 500 },
    { id: 3, name: 'Console de Jogos', price: 2000 },
    { id: 4, name: 'Fone de Ouvido', price: 150 },
  ];

  return (
    <div style={{ padding: '20px', border: '1px solid #d1ecf1', borderRadius: '8px', backgroundColor: '#e0f5f9', margin: '20px auto', maxWidth: '600px' }}>
      <h2 style={{ color: '#0c5460' }}>Nossos Produtos</h2>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {products.map(product => (
          <li key={product.id} // A prop 'key' é essencial para otimização e estabilidade de listas
              style={{
                backgroundColor: 'white',
                margin: '10px 0',
                padding: '15px',
                borderRadius: '5px',
                boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
            <span>{product.name}</span>
            <span style={{ fontWeight: 'bold', color: '#007bff' }}>R$ {product.price.toFixed(2)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}`,
    weight: 9,
    related: ['js-array-filter-map-reduce']
  },
  {
    id: 'react-controlled-form',
    keywords: ['formulario controlado', 'input react', 'controlado'],
    tags: ['react', 'formulario', 'estado'],
    description: 'Um formulário React controlado usando `useState` para gerenciar os inputs.',
    code: `import React, { useState } from 'react';

export default function UserRegistrationForm() {
  // Cada campo do formulário tem seu próprio estado
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault(); // Previne o comportamento padrão de recarregar a página
    console.log('Formulário enviado:', { firstName, lastName, email });
    alert(\`Usuário registrado: \${firstName} \${lastName}, Email: \${email}\`);

    // Limpa os campos após o envio
    setFirstName('');
    setLastName('');
    setEmail('');
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px', maxWidth: '400px', margin: '20px auto', padding: '30px', border: '1px solid #cce5ff', borderRadius: '10px', backgroundColor: '#e6f7ff', boxShadow: '0 4px 10px rgba(0,0,0,0.05)' }}>
      <h2 style={{ textAlign: 'center', color: '#0056b3', marginBottom: '20px' }}>Registro de Usuário</h2>
      <div>
        <label htmlFor="firstName" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Nome:</label>
        <input
          type="text"
          id="firstName"
          value={firstName} // O valor é controlado pelo estado
          onChange={(e) => setFirstName(e.target.value)} // Atualiza o estado na mudança
          required
          style={{ width: 'calc(100% - 18px)', padding: '10px', border: '1px solid #a8d6f2', borderRadius: '5px' }}
        />
      </div>
      <div>
        <label htmlFor="lastName" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Sobrenome:</label>
        <input
          type="text"
          id="lastName"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
          style={{ width: 'calc(100% - 18px)', padding: '10px', border: '1px solid #a8d6f2', borderRadius: '5px' }}
        />
      </div>
      <div>
        <label htmlFor="email" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ width: 'calc(100% - 18px)', padding: '10px', border: '1px solid #a8d6f2', borderRadius: '5px' }}
        />
      </div>
      <button type="submit" style={{ padding: '12px 20px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '1.05em', fontWeight: 'bold', transition: 'background-color 0.3s' }}>
        Registrar
      </button>
    </form>
  );
}`,
    weight: 9,
    related: ['js-form-validation']
  },
  {
    id: 'react-context-api',
    keywords: ['context api', 'gerenciamento estado global', 'compartilhar estado'],
    tags: ['react', 'estado', 'avancado'],
    description: 'Exemplo de uso da Context API do React para gerenciamento de estado global simples.',
    code: `// --- 1. Criar o Contexto (em um arquivo separado, ex: src/contexts/ThemeContext.js) ---
import React, { createContext, useState, useContext } from 'react';

const ThemeContext = createContext(); // Cria o Contexto

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light'); // Estado global do tema

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const contextValue = {
    theme,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

// Hook customizado para facilitar o consumo do contexto
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme deve ser usado dentro de um ThemeProvider');
  }
  return context;
};

// --- 2. Usar o Provider no Componente Raiz (ex: src/App.jsx ou src/main.jsx) ---
// import { ThemeProvider } from './contexts/ThemeContext';
/*
function App() {
  return (
    <ThemeProvider>
      <div className={theme}> // A classe 'theme' pode ser aplicada aqui
        <Header />
        <MainContent />
        <Footer />
      </div>
    </ThemeProvider>
  );
}
*/

// --- 3. Consumir o Contexto em Componentes Filhos (ex: src/components/ThemeToggler.jsx) ---
// import React from 'react';
// import { useTheme } from '../contexts/ThemeContext';

/*
function ThemeToggler() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button onClick={toggleTheme}>
      Mudar para Tema {theme === 'light' ? 'Escuro' : 'Claro'}
    </button>
  );
}
*/`,
    weight: 8,
    related: []
  }
];
