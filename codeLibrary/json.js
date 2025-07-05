// backend/codeLibrary/json.js
module.exports = [
  {
    id: 'json-basic-object',
    keywords: ['json', 'objeto json', 'basico'],
    tags: ['data format', 'fundamentos'],
    description: 'Um objeto JSON simples com tipos de dados básicos.',
    code: `{
  "nome": "Alice",
  "idade": 28,
  "isEstudante": true,
  "materias": ["Matemática", "Física", "Programação"],
  "contato": {
    "email": "alice@exemplo.com",
    "telefone": null
  }
}`,
    weight: 10,
    related: ['json-array-of-objects']
  },
  {
    id: 'json-array-of-objects',
    keywords: ['json array', 'lista de objetos', 'colecao json'],
    tags: ['data format', 'fundamentos'],
    description: 'Um array JSON contendo múltiplos objetos, representando uma coleção de itens.',
    code: `[
  {
    "id": "prod_001",
    "nome": "Laptop Ultrabook",
    "preco": 1500.00,
    "estoque": 25,
    "disponivel": true,
    "tags": ["eletrônicos", "computadores", "portátil"]
  },
  {
    "id": "prod_002",
    "nome": "Monitor Gamer 27\"",
    "preco": 450.00,
    "estoque": 10,
    "disponivel": true,
    "tags": ["eletrônicos", "monitores", "gamer"]
  },
  {
    "id": "prod_003",
    "nome": "Teclado Mecânico",
    "preco": 120.00,
    "estoque": 0,
    "disponivel": false,
    "tags": ["acessórios", "periféricos"]
  }
]`,
    weight: 9,
    related: ['js-array-filter-map-reduce']
  },
  {
    id: 'json-parse-string',
    keywords: ['parse json', 'string para json', 'converter string'],
    tags: ['javascript', 'manipulacao dados'],
    description: 'Converter uma string JSON para um objeto JavaScript.',
    code: `const jsonString = '{"produto": "Fone de Ouvido", "preco": 80.50, "em_estoque": true}';

try {
  const produtoObjeto = JSON.parse(jsonString);
  console.log('Objeto Parsed:', produtoObjeto);
  console.log('Nome do Produto:', produtoObjeto.produto);
  console.log('Preço:', produtoObjeto.preco);
} catch (error) {
  console.error('Erro ao fazer parse da string JSON:', error);
  // Exemplo de string JSON inválida:
  // const invalidJsonString = '{produto: "Cadeira", "preco": 300,}';
  // JSON.parse(invalidJsonString); // Geraria um erro
}`,
    weight: 8,
    related: ['json-stringify-object']
  },
  {
    id: 'json-stringify-object',
    keywords: ['stringify json', 'objeto para string', 'converter objeto'],
    tags: ['javascript', 'manipulacao dados'],
    description: 'Converter um objeto JavaScript para uma string JSON formatada.',
    code: `const usuario = {
  id: 101,
  nome: "Mariana Costa",
  idade: 29,
  ativo: true,
  interesses: ["leitura", "viagens", "tecnologia"]
};

// Converte para string JSON (compacta, sem formatação)
const jsonCompacto = JSON.stringify(usuario);
console.log('JSON Compacto:', jsonCompacto);
// Saída: {"id":101,"nome":"Mariana Costa","idade":29,"ativo":true,"interesses":["leitura","viagens","tecnologia"]}

// Converte para string JSON formatada (indentada para legibilidade)
const jsonFormatado = JSON.stringify(usuario, null, 2); // null para função replacer, 2 para espaços de indentação
console.log('\\nJSON Formatado:');
console.log(jsonFormatado);
/* Saída:
{
  "id": 101,
  "nome": "Mariana Costa",
  "idade": 29,
  "ativo": true,
  "interesses": [
    "leitura",
    "viagens",
    "tecnologia"
  ]
}
*/`,
    weight: 8,
    related: ['json-parse-string']
  }
];
