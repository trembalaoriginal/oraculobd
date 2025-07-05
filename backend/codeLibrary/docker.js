// backend/codeLibrary/docker.js
module.exports = [
  {
    id: 'docker-node-app',
    keywords: ['dockerfile node', 'container nodejs', 'build node'],
    tags: ['docker', 'nodejs', 'deployment'],
    description: 'Dockerfile otimizado para aplicações Node.js.',
    code: `### Stage 1: Build da aplicação (para produção)
FROM node:18-alpine AS builder

WORKDIR /app

# Copia package.json e package-lock.json para otimizar o cache da camada de dependências
COPY package*.json ./

# Instala as dependências de produção (ignora devDependencies)
RUN npm install --production

# Copia o restante do código da aplicação
COPY . .

# Opcional: Se sua aplicação precisa de um passo de build (ex: React app no frontend)
# RUN npm run build

### Stage 2: Criação da imagem final (leve)
FROM node:18-alpine

WORKDIR /app

# Copia apenas as dependências instaladas do estágio de build
COPY --from=builder /app/node_modules ./node_modules

# Copia o código da aplicação (sem devDependencies)
COPY --from=builder /app .

# Expõe a porta que a aplicação Node.js irá escutar
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["node", "server.js"]`,
    weight: 10,
    related: ['js-express-server']
  },
  {
    id: 'docker-python-flask',
    keywords: ['dockerfile python', 'flask', 'container python'],
    tags: ['docker', 'python', 'deployment'],
    description: 'Dockerfile para uma aplicação Python (Flask) leve e pronta para produção.',
    code: `### Stage 1: Build da aplicação
FROM python:3.9-slim-buster AS builder

WORKDIR /app

# Copia o arquivo de requisitos e instala as dependências
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copia o restante do código da aplicação
COPY . .

### Stage 2: Imagem final leve
FROM python:3.9-slim-buster

WORKDIR /app

# Copia as dependências e o código da aplicação do estágio de build
COPY --from=builder /app /app

# Expõe a porta que a aplicação Python irá escutar (ex: para Flask)
EXPOSE 5000

# Comando para iniciar a aplicação (ex: para Gunicorn com Flask)
# Certifique-se de que 'gunicorn' está em requirements.txt
CMD ["gunicorn", "-w", "4", "-b", "0.0.0.0:5000", "app:app"]
# Se usar Flask diretamente para desenvolvimento: CMD ["python", "app.py"]`,
    weight: 9,
    related: ['python-class-example']
  },
  {
    id: 'docker-compose-basic',
    keywords: ['docker-compose', 'multi-container', 'servicos docker', 'yaml docker'],
    tags: ['docker', 'orquestracao', 'multi-servico'],
    description: 'Exemplo básico de `docker-compose.yml` para uma aplicação web com banco de dados.',
    code: `version: '3.8' # Versão da especificação do Docker Compose

services:
  web: # Nome do serviço web (pode ser seu backend Node.js, Python, etc.)
    build: . # Constrói a imagem a partir do Dockerfile no diretório atual
    ports:
      - "80:3000" # Mapeia a porta 80 do host para a porta 3000 do container web
    environment:
      NODE_ENV: production # Variável de ambiente para o container web
      DATABASE_URL: postgres://user:password@db:5432/mydatabase # Exemplo de URL de DB
    depends_on:
      - db # Garante que o serviço 'db' inicie antes do 'web'
    volumes:
      - .:/app # Monta o diretório atual do host no /app do container (bom para dev)
    restart: always # Reinicia o container se ele falhar

  db: # Nome do serviço de banco de dados (ex: PostgreSQL)
    image: postgres:13 # Usa a imagem oficial do PostgreSQL versão 13
    environment:
      POSTGRES_DB: mydatabase # Nome do banco de dados
      POSTGRES_USER: user     # Usuário do banco de dados
      POSTGRES_PASSWORD: password # Senha do usuário
    volumes:
      - db-data:/var/lib/postgresql/data # Mapeia um volume para persistir os dados do banco
    healthcheck: # Verifica a saúde do serviço de banco de dados
      test: ["CMD-SHELL", "pg_isready -U user -d mydatabase"]
      interval: 5s
      timeout: 5s
      retries: 5

volumes:
  db-data: # Define o volume persistente para o banco de dados`,
    weight: 9,
    related: []
  },
  {
    id: 'docker-volume-bind-mount',
    keywords: ['docker volume', 'bind mount', 'persistir dados', 'compartilhar arquivos'],
    tags: ['docker', 'armazenamento'],
    description: 'Exemplos de como usar volumes e bind mounts no Docker.',
    code: `# Usando Volumes (para persistência de dados do container)
# Criar um volume nomeado:
# docker volume create meu-volume-dados

# Rodar um container usando o volume:
docker run -d --name meu-db -v meu-volume-dados:/var/lib/mysql mysql:latest

# Inspecionar o volume:
# docker volume inspect meu-volume-dados

# Usando Bind Mounts (para mapear diretórios do host para o container, ideal para desenvolvimento)
# Mapeia o diretório atual do host para /app no container:
docker run -d --name meu-app -p 3000:3000 -v $(pwd):/app meu-imagem-node:latest

# No Windows (PowerShell):
# docker run -d --name meu-app -p 3000:3000 -v ${PWD}:/app meu-imagem-node:latest

# No Docker Compose (veja o exemplo docker-compose-basic)`,
    weight: 7,
    related: ['docker-compose-basic']
  },
  {
    id: 'docker-build-run',
    keywords: ['docker build', 'docker run', 'criar imagem', 'executar container'],
    tags: ['docker', 'comandos'],
    description: 'Comandos básicos para construir imagens e rodar containers Docker.',
    code: `# 1. Construir uma imagem Docker a partir de um Dockerfile
# Use '.' para indicar o diretório atual como o contexto de build
docker build -t meu-app-node:latest .

# Construir uma imagem com um nome e tag específicos
docker build -t meu-backend:v1.0 -f Dockerfile.prod . # -f para Dockerfile customizado

# 2. Listar imagens
docker images

# 3. Rodar um container a partir de uma imagem
# -d: roda em modo detached (background)
# -p 8080:80: mapeia a porta 8080 do host para a porta 80 do container
# --name meu-servidor-web: nomeia o container
docker run -d -p 8080:80 --name meu-servidor-web meu-app-node:latest

# 4. Listar containers em execução
docker ps

# 5. Parar e Remover um container
docker stop meu-servidor-web
docker rm meu-servidor-web

# 6. Remover uma imagem (deve remover containers antes)
docker rmi meu-app-node:latest`,
    weight: 9,
    related: []
  }
];
