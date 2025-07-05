// backend/codeLibrary/python.js
module.exports = [
  {
    id: 'python-class-example',
    keywords: ['classe', 'poo', 'orientacao objeto', 'objeto'],
    tags: ['fundamentos', 'poo'],
    description: 'Definição e uso de uma classe Python básica com métodos.',
    code: `class Pessoa:
    def __init__(self, nome, idade):
        """
        Método construtor da classe Pessoa.
        Inicializa um objeto Pessoa com nome e idade.
        """
        self.nome = nome
        self.idade = idade
        print(f"Pessoa {self.nome} criada.")

    def apresentar(self):
        """
        Retorna uma string de apresentação da pessoa.
        """
        return f"Olá, meu nome é {self.nome} e tenho {self.idade} anos."

    def fazer_aniversario(self):
        """
        Incrementa a idade da pessoa em um ano.
        """
        self.idade += 1
        print(f"Feliz aniversário! {self.nome} agora tem {self.idade} anos.")

# --- Exemplo de Uso ---
# Criando instâncias (objetos) da classe Pessoa
pessoa1 = Pessoa("Alice", 30)
pessoa2 = Pessoa("Bob", 25)

print(pessoa1.apresentar()) # Saída: Olá, meu nome é Alice e tenho 30 anos.
print(pessoa2.apresentar()) # Saída: Olá, meu nome é Bob e tenho 25 anos.

pessoa1.fazer_aniversario() # Saída: Feliz aniversário! Alice agora tem 31 anos.
print(pessoa1.apresentar()) # Saída: Olá, meu nome é Alice e tenho 31 anos.`,
    weight: 10,
    related: []
  },
  {
    id: 'python-file-io',
    keywords: ['arquivo', 'ler arquivo', 'escrever arquivo', 'manipular arquivo'],
    tags: ['io', 'fundamentos'],
    description: 'Exemplos de como ler e escrever em arquivos em Python.',
    code: `# --- Escrevendo em um arquivo (modo 'w' - write, sobrescreve) ---
# Se o arquivo não existir, ele será criado.
with open('saudacao.txt', 'w', encoding='utf-8') as f:
    f.write("Olá, este é um texto escrito em Python.\\n")
    f.write("Esta é a segunda linha.\\n")
print("Arquivo 'saudacao.txt' criado e escrito.")

# --- Lendo de um arquivo (modo 'r' - read) ---
try:
    with open('saudacao.txt', 'r', encoding='utf-8') as f:
        conteudo = f.read() # Lê todo o conteúdo do arquivo
        print("\\nConteúdo de 'saudacao.txt':")
        print(conteudo)
except FileNotFoundError:
    print("Erro: O arquivo 'saudacao.txt' não foi encontrado.")

# --- Adicionando a um arquivo (modo 'a' - append) ---
# Adiciona texto ao final do arquivo, sem sobrescrever.
with open('saudacao.txt', 'a', encoding='utf-8') as f:
    f.write("Esta linha foi adicionada com append.\\n")
print("Texto adicionado a 'saudacao.txt'.")

# --- Lendo linha por linha ---
print("\\nLendo 'saudacao.txt' linha por linha:")
with open('saudacao.txt', 'r', encoding='utf-8') as f:
    for linha in f:
        print(f"Linha: {linha.strip()}") # .strip() remove espaços em branco e quebras de linha`,
    weight: 9,
    related: []
  },
  {
    id: 'python-list-operations',
    keywords: ['lista', 'array python', 'manipular lista', 'funcoes lista'],
    tags: ['fundamentos', 'estrutura de dados'],
    description: 'Operações comuns em listas Python: adicionar, remover, iterar, compreensão.',
    code: `minha_lista = [10, 20, 30, 40, 50]
print(f"Lista inicial: {minha_lista}")

# 1. Adicionar elementos
minha_lista.append(60) # Adiciona ao final
print(f"Após append(60): {minha_lista}") # [10, 20, 30, 40, 50, 60]

minha_lista.insert(0, 5) # Insere no índice 0
print(f"Após insert(0, 5): {minha_lista}") # [5, 10, 20, 30, 40, 50, 60]

# 2. Remover elementos
minha_lista.remove(20) # Remove a primeira ocorrência do valor 20
print(f"Após remove(20): {minha_lista}") # [5, 10, 30, 40, 50, 60]

elemento_removido = minha_lista.pop(2) # Remove pelo índice (aqui, 30) e retorna o elemento
print(f"Após pop(2): {minha_lista}, Elemento removido: {elemento_removido}") # [5, 10, 40, 50, 60], Elemento removido: 30

del minha_lista[0] # Remove pelo índice
print(f"Após del minha_lista[0]: {minha_lista}") # [10, 40, 50, 60]

# 3. Iterar sobre a lista
print("\\nIterando sobre a lista:")
for item in minha_lista:
    print(f"- {item}")

# 4. Compreensão de Lista (List Comprehension)
# Criar uma nova lista com base em uma existente de forma concisa
pares = [num for num in minha_lista if num % 2 == 0]
print(f"Números pares: {pares}") # [10, 40, 60]

quadrados = [num**2 for num in minha_lista]
print(f"Quadrados dos números: {quadrados}") # [100, 1600, 2500, 3600]

# 5. Outras operações úteis
print(f"Tamanho da lista: {len(minha_lista)}")
print(f"Elemento máximo: {max(minha_lista)}")
print(f"Elemento mínimo: {min(minha_lista)}")
print(f"Soma dos elementos: {sum(minha_lista)}")
minha_lista.sort() # Ordena a lista (in-place)
print(f"Lista ordenada: {minha_lista}")`,
    weight: 9,
    related: []
  },
  {
    id: 'python-dictionary-operations',
    keywords: ['dicionario', 'json python', 'mapa', 'chave valor'],
    tags: ['fundamentos', 'estrutura de dados'],
    description: 'Operações básicas em dicionários Python: acessar, adicionar, remover, iterar.',
    code: `meu_dicionario = {
    "nome": "João",
    "idade": 30,
    "cidade": "São Paulo",
    "profissão": "Engenheiro"
}
print(f"Dicionário inicial: {meu_dicionario}")

# 1. Acessar valores
print(f"Nome: {meu_dicionario['nome']}") # Acesso direto (gera erro se a chave não existir)
print(f"Idade (usando .get()): {meu_dicionario.get('idade', 'Não Informado')}") # Acesso seguro, com fallback
print(f"País (usando .get() com default): {meu_dicionario.get('pais', 'Brasil')}")

# 2. Adicionar ou Modificar elementos
meu_dicionario["idade"] = 31 # Modifica valor existente
meu_dicionario["estado"] = "SP" # Adiciona novo par chave-valor
print(f"Dicionário após modificação/adição: {meu_dicionario}")

# 3. Remover elementos
elemento_removido = meu_dicionario.pop("cidade") # Remove e retorna o valor
print(f"Após pop('cidade'): {meu_dicionario}, Elemento removido: {elemento_removido}")

del meu_dicionario["estado"] # Remove pelo chave
print(f"Após del meu_dicionario['estado']: {meu_dicionario}")

# 4. Iterar sobre dicionário
print("\\nIterando sobre chaves:")
for chave in meu_dicionario:
    print(f"Chave: {chave}")

print("\\nIterando sobre valores:")
for valor in meu_dicionario.values():
    print(f"Valor: {valor}")

print("\\nIterando sobre itens (pares chave-valor):")
for chave, valor in meu_dicionario.items():
    print(f"{chave}: {valor}")`,
    weight: 8,
    related: []
  },
  {
    id: 'python-string-manipulation',
    keywords: ['string', 'manipular texto', 'formatar string', 'split join'],
    tags: ['fundamentos', 'texto'],
    description: 'Operações comuns de manipulação de strings em Python.',
    code: `texto = "Olá, mundo! Python é divertido."
print(f"Texto original: '{texto}'")

# 1. Tamanho da string
print(f"Tamanho do texto: {len(texto)}")

# 2. Acesso a caracteres (indexação e fatiamento)
print(f"Primeiro caractere: {texto[0]}")
print(f"Último caractere: {texto[-1]}")
print(f"Fatiamento (2 a 7): {texto[2:8]}") # 'á, mun'
print(f"Reverter string: {texto[::-1]}") # '.oditrevid é nohtyP !odnum ,álO'

# 3. Métodos de string
print(f"Maiúsculas: {texto.upper()}")
print(f"Minúsculas: {texto.lower()}")
print(f"Capitalizar: {texto.capitalize()}") # 'Olá, mundo! python é divertido.'
print(f"Título: {texto.title()}") # 'Olá, Mundo! Python É Divertido.'

# 4. Busca e substituição
print(f"Contém 'Python'? {'Python' in texto}")
print(f"Índice de 'mundo': {texto.find('mundo')}") # Retorna -1 se não encontrar
print(f"Substituir 'mundo' por 'planeta': {texto.replace('mundo', 'planeta')}")

# 5. Dividir e Juntar (split e join)
palavras = texto.split(' ') # Divide por espaço
print(f"Palavras: {palavras}") # ['Olá,', 'mundo!', 'Python', 'é', 'divertido.']

novo_texto = "-".join(palavras) # Junta as palavras com hífen
print(f"Juntar com '-': {novo_texto}") # 'Olá,-mundo!-Python-é-divertido.'

# 6. Remover espaços em branco (strip)
texto_com_espacos = "   olá, mundo!   "
print(f"Texto com espaços: '{texto_com_espacos}'")
print(f"Texto sem espaços (strip): '{texto_com_espacos.strip()}'")`,
    weight: 7,
    related: []
  },
  {
    id: 'python-error-handling',
    keywords: ['try except', 'tratamento erro', 'excecao'],
    tags: ['fundamentos', 'erros'],
    description: 'Como lidar com erros em Python usando blocos `try`, `except`, `finally` e `else`.',
    code: `def dividir(a, b):
    try:
        resultado = a / b
    except ZeroDivisionError:
        print("Erro: Divisão por zero não é permitida.")
        return None
    except TypeError:
        print("Erro: Tipos de dados inválidos para divisão.")
        return None
    except Exception as e: # Captura qualquer outra exceção
        print(f"Ocorreu um erro inesperado: {e}")
        return None
    else:
        # Este bloco é executado APENAS se nenhum erro ocorreu no 'try'
        print("Divisão realizada com sucesso!")
        return resultado
    finally:
        # Este bloco SEMPRE será executado, ocorrendo erro ou não
        print("Bloco finally executado.")

# --- Exemplos de Uso ---
print("--- Teste 1: Divisão normal ---")
resultado1 = dividir(10, 2) # Saída: Divisão realizada com sucesso! \n Bloco finally executado. \n Resultado: 5.0
if resultado1 is not None:
    print(f"Resultado: {resultado1}")

print("\\n--- Teste 2: Divisão por zero ---")
resultado2 = dividir(10, 0) # Saída: Erro: Divisão por zero não é permitida. \n Bloco finally executado. \n Resultado: None
if resultado2 is not None:
    print(f"Resultado: {resultado2}")

print("\\n--- Teste 3: Tipos inválidos ---")
resultado3 = dividir(10, "2") # Saída: Erro: Tipos de dados inválidos para divisão. \n Bloco finally executado. \n Resultado: None
if resultado3 is not None:
    print(f"Resultado: {resultado3}")`,
    weight: 8,
    related: []
  }
];
