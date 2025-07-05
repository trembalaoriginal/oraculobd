// backend/codeLibrary/git.js
module.exports = [
  {
    id: 'git-init-repo',
    keywords: ['init', 'iniciar repositorio', 'novo projeto git'],
    tags: ['git', 'fundamentos'],
    description: 'Inicializa um novo repositório Git no diretório atual.',
    code: `git init`,
    weight: 9,
    related: ['git-add-commit']
  },
  {
    id: 'git-add-commit',
    keywords: ['add', 'commit', 'salvar alteracoes', 'registrar mudancas'],
    tags: ['git', 'fundamentos'],
    description: 'Adiciona arquivos para o staging area e cria um commit.',
    code: `# Adicionar todos os arquivos novos e modificados ao staging area
git add .

# Adicionar um arquivo específico
git add minha_pasta/meu_arquivo.txt

# Criar um commit com uma mensagem descritiva
git commit -m "Minha mensagem de commit: Adicionando nova funcionalidade"

# Atalho: Adicionar todos os arquivos modificados e commitar (cuidado com arquivos novos!)
# git commit -am "Mensagem para modificações existentes"`,
    weight: 10,
    related: ['git-push']
  },
  {
    id: 'git-push',
    keywords: ['push', 'enviar para remoto', 'subir codigo'],
    tags: ['git', 'colaboracao'],
    description: 'Envia commits locais para um repositório remoto.',
    code: `# Envia a branch atual para o remoto 'origin'
git push origin <nome-da-branch>
# Ex: git push origin main

# Configura a branch local para rastrear a branch remota e faz o push
# Útil na primeira vez que você faz push de uma nova branch
git push --set-upstream origin <nome-da-branch>
# Atalho: git push -u origin <nome-da-branch>`,
    weight: 9,
    related: ['git-pull']
  },
  {
    id: 'git-pull',
    keywords: ['pull', 'puxar alteracoes', 'sincronizar'],
    tags: ['git', 'colaboracao'],
    description: 'Baixa e integra alterações do repositório remoto para o local.',
    code: `# Baixa e mescla (merge) as alterações da branch remota para a atual
git pull origin <nome-da-branch>
# Ex: git pull origin main

# Ou, se a branch local já estiver configurada para rastrear uma remota:
git pull`,
    weight: 9,
    related: ['git-push', 'git-fetch']
  },
  {
    id: 'git-clone',
    keywords: ['clonar', 'clone', 'baixar repositorio'],
    tags: ['git', 'fundamentos'],
    description: 'Clona um repositório Git de uma URL para o diretório local.',
    code: `git clone <URL-do-repositorio>

# Exemplo:
# git clone https://github.com/usuario/meu-projeto.git
# git clone git@github.com:usuario/meu-projeto.git

# Clonar para um nome de pasta diferente
git clone <URL-do-repositorio> <nome-da-pasta-local>`,
    weight: 8,
    related: ['git-init-repo']
  },
  {
    id: 'git-branch',
    keywords: ['branch', 'ramo', 'criar branch', 'trocar branch', 'checkout'],
    tags: ['git', 'fluxo de trabalho'],
    description: 'Comandos para criar, listar e trocar de branches.',
    code: `# Listar todas as branches locais e remotas
git branch -a

# Criar uma nova branch
git branch <nome-da-nova-branch>

# Trocar para uma branch existente
git checkout <nome-da-branch-existente>

# Criar uma nova branch E trocar para ela (atalho)
git checkout -b <nome-da-nova-branch>

# Excluir uma branch local (após merge)
git branch -d <nome-da-branch-para-deletar>

# Excluir uma branch local (mesmo que não tenha merge - cuidado!)
git branch -D <nome-da-branch-para-deletar>`,
    weight: 9,
    related: ['git-merge']
  },
  {
    id: 'git-merge',
    keywords: ['merge', 'mesclar branch', 'unir branches'],
    tags: ['git', 'fluxo de trabalho'],
    description: 'Integra alterações de uma branch em outra.',
    code: `# Primeiro, vá para a branch que você quer atualizar
git checkout main # Ou a branch destino, ex: develop

# Em seguida, mescle a branch que contém as mudanças
git merge <nome-da-branch-com-mudancas>
# Ex: git merge feature/nova-funcionalidade

# Se houver conflitos, edite os arquivos, depois:
# git add .
# git commit -m "Resolve conflitos de merge da feature/..."`,
    weight: 8,
    related: ['git-branch']
  },
  {
    id: 'git-status',
    keywords: ['status', 'verificar status', 'mudancas pendentes'],
    tags: ['git', 'fundamentos'],
    description: 'Mostra o status da árvore de trabalho e do staging area.',
    code: `git status`,
    weight: 7,
    related: ['git-add-commit']
  },
  {
    id: 'git-log',
    keywords: ['log', 'historico', 'commits'],
    tags: ['git', 'auditoria'],
    description: 'Exibe o histórico de commits.',
    code: `# Exibe o histórico de commits completo
git log

# Exibe o histórico de commits de forma mais concisa
git log --oneline

# Exibe o histórico em grafo com branches e merges
git log --graph --oneline --all

# Exibe os commits de um arquivo específico
git log -- <caminho/do/arquivo>`,
    weight: 6,
    related: []
  },
  {
    id: 'git-revert-reset',
    keywords: ['reverter', 'desfazer', 'reset', 'alterar historico'],
    tags: ['git', 'avancado', 'recuperacao'],
    description: 'Comandos para desfazer alterações e manipular o histórico (use com cautela!).',
    code: `# git revert: Desfaz um commit criando um NOVO commit que inverte as mudanças.
# É seguro para commits que já foram "pushed" (enviados para o remoto).
git revert <hash-do-commit>

# git reset --soft: Volta o HEAD para um commit, mas mantém as mudanças no staging area.
git reset --soft <hash-do-commit>

# git reset --mixed (padrão): Volta o HEAD para um commit, e move as mudanças para o diretório de trabalho (não no staging).
git reset --mixed <hash-do-commit>

# git reset --hard: ATENÇÃO! Volta o HEAD para um commit e descarta TODAS as mudanças locais (staging e working directory).
# Use com extrema cautela, pois PODE APAGAR TRABALHO NÃO COMMITADO.
git reset --hard <hash-do-commit>`,
    weight: 7,
    related: ['git-add-commit']
  }
];
