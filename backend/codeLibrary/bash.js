// backend/codeLibrary/bash.js
module.exports = [
  {
    id: 'bash-list-files',
    keywords: ['listar arquivos', 'ls', 'ver conteudo pasta'],
    tags: ['terminal', 'navegacao'],
    description: 'Comandos para listar arquivos e diretórios.',
    code: `ls          # Lista arquivos e diretórios no diretório atual
ls -l       # Lista detalhada (permissões, proprietário, tamanho, data)
ls -a       # Lista todos, incluindo arquivos ocultos (que começam com '.')
ls -lh      # Lista detalhada com tamanhos legíveis por humanos (ex: 1.2M, 5.0G)
ls -F       # Adiciona indicadores (/ para diretórios, * para executáveis)`,
    weight: 10,
    related: ['bash-change-directory']
  },
  {
    id: 'bash-change-directory',
    keywords: ['mudar diretorio', 'cd', 'entrar pasta'],
    tags: ['terminal', 'navegacao'],
    description: 'Comandos para mudar o diretório de trabalho no terminal.',
    code: `cd minha_pasta/subpasta/     # Entrar em um diretório específico
cd ..                        # Voltar um nível de diretório
cd ../..                     # Voltar dois níveis
cd ~                         # Ir para o diretório home do usuário
cd /                         # Ir para o diretório raiz do sistema
cd -                         # Voltar para o diretório anterior (atalho)`,
    weight: 10,
    related: ['bash-list-files']
  },
  {
    id: 'bash-create-directory',
    keywords: ['criar pasta', 'mkdir', 'fazer diretorio'],
    tags: ['terminal', 'gerenciamento arquivos'],
    description: 'Cria um ou mais diretórios.',
    code: `mkdir minha_nova_pasta           # Cria uma nova pasta no diretório atual
mkdir -p pai/filho/neto        # Cria diretórios aninhados, se o pai não existir
mkdir projeto_{backend,frontend} # Cria múltiplas pastas (backend_projeto, frontend_projeto)`,
    weight: 9,
    related: ['bash-remove-file-dir']
  },
  {
    id: 'bash-remove-file-dir',
    keywords: ['remover arquivo', 'remover pasta', 'rm', 'excluir'],
    tags: ['terminal', 'gerenciamento arquivos', 'cuidado'],
    description: 'Remove arquivos e diretórios (use com extrema cautela!).',
    code: `rm meu_arquivo.txt             # Remove um arquivo
rm -i outro_arquivo.log        # Pede confirmação antes de remover
rm -r minha_pasta/             # Remove um diretório e seu conteúdo (recursivo)
rm -rf pasta_critica/          # Remove diretório e conteúdo sem pedir confirmação (CUIDADO EXTREMO!)
                               # rm -rf / NÃO FAÇA ISSO EM SISTEMAS REAIS!`,
    weight: 9,
    related: ['bash-create-directory']
  },
  {
    id: 'bash-copy-move',
    keywords: ['copiar', 'mover', 'renomear', 'cp', 'mv'],
    tags: ['terminal', 'gerenciamento arquivos'],
    description: 'Copia e move/renomeia arquivos e diretórios.',
    code: `# Copiar arquivos
cp arquivo_origem.txt arquivo_destino.txt              # Copia arquivo
cp arquivo1.txt arquivo2.txt pasta_destino/            # Copia múltiplos arquivos para um diretório
cp -r pasta_origem/ pasta_destino/                   # Copia diretório recursivamente

# Mover/Renomear arquivos e diretórios
mv arquivo_antigo.txt arquivo_novo.txt                 # Renomeia um arquivo
mv meu_arquivo.txt nova_pasta/                       # Move arquivo para outra pasta
mv minha_pasta/ outra_pasta_no_mesmo_nivel/          # Move/renomeia diretório`,
    weight: 8,
    related: []
  },
  {
    id: 'bash-view-file-content',
    keywords: ['ver arquivo', 'ler arquivo', 'conteudo arquivo', 'cat', 'less', 'tail'],
    tags: ['terminal', 'visualizacao'],
    description: 'Comandos para visualizar o conteúdo de arquivos.',
    code: `cat meu_documento.txt         # Exibe o conteúdo completo do arquivo no terminal
less meu_log.log              # Exibe o conteúdo paginado (use 'q' para sair, 'espaço' para próxima página)
head -n 10 meu_arquivo.txt    # Exibe as primeiras 10 linhas do arquivo
tail -n 10 meu_arquivo.txt    # Exibe as últimas 10 linhas do arquivo
tail -f meu_servidor.log      # Exibe as últimas linhas e continua mostrando novas linhas em tempo real`,
    weight: 7,
    related: ['python-file-io']
  },
  {
    id: 'bash-find-text',
    keywords: ['buscar texto', 'grep', 'pesquisar', 'encontrar palavra'],
    tags: ['terminal', 'busca'],
    description: 'Pesquisa por padrões de texto dentro de arquivos.',
    code: `grep "minha_palavra" meu_arquivo.txt      # Procura 'minha_palavra' no arquivo
grep -i "Minha_Palavra" meu_arquivo.txt   # Ignora maiúsculas/minúsculas
grep -r "erro" /var/log/                  # Pesquisa recursivamente por 'erro' em todos os arquivos em /var/log/
grep -l "funcao" *.js                     # Lista apenas os nomes dos arquivos que contêm 'funcao'
cat meu_log.txt | grep "ERRO"             # Usando pipe para filtrar a saída de outro comando`,
    weight: 8,
    related: []
  },
  {
    id: 'bash-permissions',
    keywords: ['permissoes', 'chmod', 'chown', 'arquivo executavel'],
    tags: ['terminal', 'seguranca', 'administracao'],
    description: 'Comandos para gerenciar permissões de arquivos e diretórios.',
    code: `chmod +x meu_script.sh              # Adiciona permissão de execução para o proprietário
chmod 755 meu_arquivo.txt           # Define permissões rwxr-xr-x (proprietário: read, write, execute; grupo/outros: read, execute)
                                    # 7 (rwx) = 4+2+1
                                    # 5 (rx) = 4+1
chown usuario:grupo meu_arquivo.txt # Altera o proprietário e o grupo de um arquivo`,
    weight: 6,
    related: []
  },
  {
    id: 'bash-network-commands',
    keywords: ['rede', 'ping', 'ip', 'portas', 'netstat', 'curl', 'wget'],
    tags: ['terminal', 'rede'],
    description: 'Comandos básicos para diagnóstico de rede.',
    code: `ping google.com                # Testa a conectividade com um host
ifconfig / ip addr show        # Mostra configurações de interface de rede (IP, etc.)
netstat -tulnp                 # Lista portas abertas e processos (requer sudo para ver PIDs)
curl -v http://localhost:3000  # Faz uma requisição HTTP e mostra detalhes da resposta
wget https://example.com/file.zip # Baixa um arquivo da internet`,
    weight: 7,
    related: ['js-fetch-api-get']
  }
];
