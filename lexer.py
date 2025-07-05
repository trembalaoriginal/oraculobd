# backend/lexer.py
import re

# Definição dos tipos de tokens
# A ordem é IMPORTANTE: mais específicos primeiro.
TOKEN_SPECIFICATION = [
    ('STRING',       r'"[^"]*"'),               # Strings entre aspas duplas
    ('NUMBER',       r'\d+(\.\d*)?'),           # Números (inteiros ou flutuantes)
    
    # Operadores e Símbolos
    ('EQEQ',         r'=='),                     # Igualdade (==)
    ('NEQ',          r'!='),                     # Diferente (!=)
    ('LE',           r'<='),                     # Menor ou igual (<=)
    ('LT',           r'<'),                      # Menor (<)
    ('GE',           r'>='),                     # Maior ou igual (>=)
    ('GT',           r'>'),                      # Maior (>)
    ('ARROW',        r'->'),                     # Operador de seta (para onClick e atribuição de variável)
    ('LBRACE',       r'{'),                      # Chave esquerda ({)
    ('RBRACE',       r'}'),                      # Chave direita (})
    ('LPAREN',       r'\('),                     # Parêntese esquerdo (()
    ('RPAREN',       r'\)'),                     # Parêntese direito ())
    
    # Palavras-chave (IDENTIFIERs específicos)
    ('IF',           r'if'),
    ('ELSE',         r'else'),
    ('FOR',          r'for'),
    ('IN',           r'in'),
    ('FROM',         r'from'),
    ('TO',           r'to'),
    ('AND',          r'and'),
    ('OR',           r'or'),
    ('NOT',          r'not'),

    ('IDENTIFIER',   r'[a-zA-Z_][a-zA-Z0-9_.]*'), # Identificadores (variáveis, nomes de funções, incluindo 'ai.craftHtml')
    ('COMMENT',      r'//.*'),                   # Comentários de linha
    ('WHITESPACE',   r'\s+'),                    # Espaços em branco (serão ignorados)
    ('UNKNOWN',      r'.'),                      # Qualquer outro caractere (erro)
]

# Compila o regex para ser mais eficiente
TOKEN_REGEX = '|'.join(f'(?P<{name}>{pattern})' for name, pattern in TOKEN_SPECIFICATION)
TOKEN_PATTERN = re.compile(TOKEN_REGEX, re.VERBOSE)

class Token:
    def __init__(self, type, value, line=None, column=None):
        self.type = type
        self.value = value
        self.line = line
        self.column = column

    def __repr__(self):
        return f"Token({self.type}, '{self.value}', line={self.line}, col={self.column})"

def tokenize(code: str):
    """
    Divide o código OráculoScript em uma lista de objetos Token.
    """
    tokens = []
    line_num = 1
    line_start = 0

    for match in TOKEN_PATTERN.finditer(code):
        token_type = match.lastgroup
        token_value = match.group(token_type)
        column_num = match.start() - line_start + 1

        if token_type == 'WHITESPACE':
            if '\n' in token_value:
                line_num += token_value.count('\n')
                line_start = match.end() - token_value.rfind('\n')
            continue # Ignora espaços em branco

        if token_type == 'COMMENT':
            if '\n' in token_value:
                line_num += token_value.count('\n')
                line_start = match.end() - token_value.rfind('\n')
            continue # Ignora comentários

        if token_type == 'UNKNOWN':
            raise ValueError(f"Caracter inesperado '{token_value}' na linha {line_num}, coluna {column_num}")

        tokens.append(Token(token_type, token_value, line_num, column_num))
        
    return tokens
