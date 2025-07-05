// backend/codeLibrary/sql.js
module.exports = [
  {
    id: 'sql-create-table',
    keywords: ['criar tabela', 'ddl', 'schema', 'definir estrutura'],
    tags: ['database', 'ddl'],
    description: 'Comando SQL para criar uma tabela de usuários com diferentes tipos de dados.',
    code: `CREATE TABLE IF NOT EXISTS usuarios (
    id SERIAL PRIMARY KEY, -- Chave primária auto-incrementada (PostgreSQL/SQL Server)
    nome VARCHAR(100) NOT NULL, -- Nome do usuário (obrigatório)
    email VARCHAR(100) UNIQUE NOT NULL, -- Email único e obrigatório
    idade INT, -- Idade do usuário (inteiro)
    data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Data de cadastro padrão
    ativo BOOLEAN DEFAULT TRUE -- Status ativo/inativo
);

-- Exemplo para MySQL
-- CREATE TABLE IF NOT EXISTS produtos (
--     id INT AUTO_INCREMENT PRIMARY KEY,
--     nome VARCHAR(255) NOT NULL,
--     preco DECIMAL(10, 2) NOT NULL,
--     estoque INT DEFAULT 0
-- );`,
    weight: 10,
    related: ['sql-insert-data']
  },
  {
    id: 'sql-select-basic',
    keywords: ['select', 'consultar', 'buscar dados', 'ler tabela'],
    tags: ['database', 'dml', 'consulta'],
    description: 'Comandos SQL básicos para selecionar dados de uma tabela.',
    code: `SELECT * FROM produtos; -- Seleciona todas as colunas e todas as linhas

SELECT nome, preco, estoque FROM produtos; -- Seleciona colunas específicas

SELECT nome, preco FROM produtos WHERE estoque > 0; -- Seleciona produtos em estoque

SELECT nome, preco FROM produtos WHERE preco BETWEEN 50.00 AND 100.00 ORDER BY preco DESC; -- Filtrar por faixa de preço e ordenar

SELECT DISTINCT categoria FROM produtos; -- Seleciona categorias únicas`,
    weight: 10,
    related: ['sql-insert-data', 'sql-update-data', 'sql-delete-data']
  },
  {
    id: 'sql-insert-data',
    keywords: ['insert', 'inserir dados', 'adicionar registro'],
    tags: ['database', 'dml'],
    description: 'Comando SQL para inserir novas linhas em uma tabela.',
    code: `INSERT INTO usuarios (nome, email, idade)
VALUES ('Ana Silva', 'ana.silva@email.com', 28);

INSERT INTO produtos (nome, preco, estoque)
VALUES ('Smart TV 4K', 1800.00, 15),
       ('Fone Bluetooth', 150.00, 50),
       ('Webcam HD', 80.00, 30);

-- Inserindo apenas alguns campos (outros usarão o padrão ou NULL)
INSERT INTO usuarios (nome, email)
VALUES ('Pedro Costa', 'pedro.costa@email.com');`,
    weight: 9,
    related: ['sql-create-table', 'sql-select-basic']
  },
  {
    id: 'sql-update-data',
    keywords: ['update', 'atualizar dados', 'modificar registro'],
    tags: ['database', 'dml'],
    description: 'Comando SQL para atualizar dados existentes em uma tabela.',
    code: `UPDATE produtos
SET preco = 1750.00, estoque = 12
WHERE nome = 'Smart TV 4K';

UPDATE usuarios
SET idade = 31
WHERE email = 'ana.silva@email.com';

-- Atualizar múltiplos registros
UPDATE produtos
SET estoque = estoque + 5
WHERE categoria = 'Eletrônicos';`,
    weight: 9,
    related: ['sql-select-basic']
  },
  {
    id: 'sql-delete-data',
    keywords: ['delete', 'remover dados', 'apagar registro'],
    tags: ['database', 'dml'],
    description: 'Comando SQL para deletar linhas de uma tabela.',
    code: `DELETE FROM produtos
WHERE estoque = 0; -- Deleta todos os produtos sem estoque

DELETE FROM usuarios
WHERE idade < 18; -- Deleta usuários menores de 18 anos

-- Deletar todos os registros da tabela (cuidado!)
-- DELETE FROM minha_tabela;
-- TRUNCATE TABLE minha_tabela; -- Mais rápido para esvaziar, não loga individualmente`,
    weight: 8,
    related: ['sql-select-basic']
  },
  {
    id: 'sql-join-example',
    keywords: ['join', 'unir tabelas', 'relacionamento', 'inner join', 'left join'],
    tags: ['database', 'consulta', 'avancado'],
    description: 'Exemplos de como usar JOINs para combinar dados de múltiplas tabelas.',
    code: `-- Supondo as tabelas:
-- usuarios (id, nome, email)
-- pedidos (id, usuario_id, data_pedido, total)

-- INNER JOIN: Retorna apenas linhas que possuem correspondência em AMBAS as tabelas.
SELECT u.nome, p.data_pedido, p.total
FROM usuarios u
INNER JOIN pedidos p ON u.id = p.usuario_id;

-- LEFT JOIN: Retorna todas as linhas da tabela da ESQUERDA e as correspondências da DIREITA (NULL se não houver).
-- Mostra todos os usuários e seus pedidos, mesmo que não tenham nenhum.
SELECT u.nome, p.data_pedido, p.total
FROM usuarios u
LEFT JOIN pedidos p ON u.id = p.usuario_id;

-- RIGHT JOIN: Retorna todas as linhas da tabela da DIREITA e as correspondências da ESQUERDA (NULL se não houver).
-- Mostra todos os pedidos e seus usuários, mesmo que o usuário não exista (cenário raro).
SELECT u.nome, p.data_pedido, p.total
FROM usuarios u
RIGHT JOIN pedidos p ON u.id = p.usuario_id;

-- FULL OUTER JOIN (alguns bancos, como PostgreSQL): Retorna linhas quando há correspondência em UMA das tabelas.
-- Mostra todos os usuários e todos os pedidos, preenchendo com NULL onde não há correspondência.
-- SELECT u.nome, p.data_pedido, p.total
-- FROM usuarios u
-- FULL OUTER JOIN pedidos p ON u.id = p.usuario_id;`,
    weight: 9,
    related: []
  },
  {
    id: 'sql-group-by-having',
    keywords: ['group by', 'agrupar', 'sum', 'count', 'having'],
    tags: ['database', 'consulta', 'agregacao'],
    description: 'Como usar GROUP BY e HAVING para agrupar dados e filtrar grupos.',
    code: `-- Supondo a tabela:
-- pedidos (id, usuario_id, data_pedido, total, status)

-- Contar o número total de pedidos por status
SELECT status, COUNT(id) AS total_pedidos
FROM pedidos
GROUP BY status;

-- Calcular o valor total de vendas por usuário
SELECT usuario_id, SUM(total) AS valor_total_compras
FROM pedidos
GROUP BY usuario_id
ORDER BY valor_total_compras DESC;

-- Encontrar usuários que fizeram mais de 5 pedidos
SELECT usuario_id, COUNT(id) AS numero_de_pedidos
FROM pedidos
GROUP BY usuario_id
HAVING COUNT(id) > 5;

-- Encontrar categorias com valor médio de produto acima de R$ 1000
-- Supondo: produtos (id, nome, preco, categoria)
SELECT categoria, AVG(preco) AS preco_medio
FROM produtos
GROUP BY categoria
HAVING AVG(preco) > 1000;`,
    weight: 8,
    related: ['sql-select-basic']
  }
];
