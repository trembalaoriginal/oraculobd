# backend/parser.py
from lexer import tokenize, Token

# --- Classes para representar os nós da AST (Abstract Syntax Tree) ---
class Node:
    pass

class Program(Node):
    def __init__(self, statements):
        self.statements = statements

class CommandStatement(Node):
    def __init__(self, command_name: str, args: list, block=None):
        self.command_name = command_name # Ex: "print", "create", "ask", "ai.craftHtml"
        self.args = args                 # Lista de argumentos (Literal, Identifier, Expression)
        self.block = block               # Bloco de código associado (para onClick {})

class Literal(Node): # Para strings, números, booleanos
    def __init__(self, value, type):
        self.value = value
        self.type = type # 'STRING', 'NUMBER', 'BOOLEAN'

class Identifier(Node): # Para nomes de variáveis ou comandos
    def __init__(self, name):
        self.name = name

class Block(Node): # Para blocos de código ({ ... })
    def __init__(self, statements):
        self.statements = statements

# --- Expressões para Condições e Laços ---
class BinaryExpression(Node):
    def __init__(self, left, operator: Token, right):
        self.left = left
        self.operator = operator.value # '==', '>', '<', etc.
        self.right = right

class BooleanLiteral(Node):
    def __init__(self, value: bool):
        self.value = value

# --- Estruturas de Controle de Fluxo ---
class IfStatement(Node):
    def __init__(self, condition, then_block, else_block=None):
        self.condition = condition # Uma expressão que avalia para True/False
        self.then_block = then_block # Bloco de código a ser executado se a condição for verdadeira
        self.else_block = else_block # Bloco de código a ser executado se a condição for falsa (opcional)

class ForLoopStatement(Node):
    def __init__(self, iterator_var: Identifier, collection_or_range_start, collection_or_range_end=None):
        self.iterator_var = iterator_var # Nome da variável do loop (ex: 'i', 'planet')
        # Para 'for x in [list]': collection_or_range_start = list, collection_or_range_end = None
        # Para 'for i from A to B': collection_or_range_start = A, collection_or_range_end = B
        self.collection_or_range_start = collection_or_range_start 
        self.collection_or_range_end = collection_or_range_end
        self.block = None # O bloco de código do loop (será anexado depois)


class Parser:
    def __init__(self, tokens):
        self.tokens = tokens
        self.current_token_index = 0
        self.current_token = self.tokens[self.current_token_index] if self.tokens else None

    def advance(self):
        """Avança para o próximo token."""
        self.current_token_index += 1
        self.current_token = self.tokens[self.current_token_index] if self.current_token_index < len(self.tokens) else None

    def eat(self, token_type):
        """Consome o token atual se ele corresponder ao tipo esperado."""
        if self.current_token and self.current_token.type == token_type:
            value = self.current_token.value
            self.advance()
            return value
        else:
            raise SyntaxError(f"Esperado token '{token_type}', encontrado '{self.current_token.type if self.current_token else 'EOF'}' na linha {self.current_token.line if self.current_token else 'N/A'}, coluna {self.current_token.column if self.current_token else 'N/A'}")

    def peek(self, offset=1):
        """Retorna o token à frente sem consumi-lo."""
        peek_index = self.current_token_index + offset
        if 0 <= peek_index < len(self.tokens):
            return self.tokens[peek_index]
        return None

    def parse(self):
        """Ponto de entrada do parser: parseia o programa completo."""
        statements = []
        while self.current_token is not None:
            statements.append(self.parse_statement())
        return Program(statements)

    def parse_statement(self):
        """Parseia uma única instrução (comando ou estrutura de controle)."""
        if self.current_token is None:
            raise SyntaxError("Fim de arquivo inesperado ao parsear instrução.")

        if self.current_token.type == 'IF':
            return self.parse_if_statement()
        elif self.current_token.type == 'FOR':
            return self.parse_for_loop()
        elif self.current_token.type == 'IDENTIFIER': # Assume que comandos como 'print', 'create', 'ask', 'ai.craftHtml' começam com IDENTIFIER
            return self.parse_command_statement()
        else:
            raise SyntaxError(f"Instrução inesperada começando com '{self.current_token.value}' (tipo: {self.current_token.type}) na linha {self.current_token.line}, coluna {self.current_token.column}")

    def parse_command_statement(self):
        """Parseia um comando como 'print', 'create', 'ask', 'ai.craftHtml'."""
        command_name = self.eat('IDENTIFIER')

        args = []
        block = None
        
        while (self.current_token and 
               self.current_token.type in ['STRING', 'IDENTIFIER', 'NUMBER'] and
               self.peek().type != 'ARROW'):
            
            if self.current_token.type == 'STRING':
                args.append(Literal(self.eat('STRING').strip('"'), 'STRING'))
            elif self.current_token.type == 'IDENTIFIER':
                args.append(Identifier(self.eat('IDENTIFIER')))
            elif self.current_token.type == 'NUMBER':
                args.append(Literal(float(self.eat('NUMBER')), 'NUMBER'))
            else:
                break

        if self.current_token and self.current_token.type == 'ARROW':
            self.eat('ARROW') 
            
            if self.current_token.type == 'IDENTIFIER' and self.current_token.value == 'onClick':
                self.eat('IDENTIFIER')
                block = self.parse_block()
            elif self.current_token.type == 'IDENTIFIER':
                var_name = self.eat('IDENTIFIER')
                args.append(Identifier(var_name)) 
            else:
                raise SyntaxError(f"Esperado 'onClick' ou um identificador após '->', encontrado '{self.current_token.value}' na linha {self.current_token.line}, coluna {self.current_token.column}")
        
        return CommandStatement(command_name, args, block)


    def parse_expression(self):
        """
        Parseia uma expressão. Por enquanto, focamos em expressões binárias simples
        para condições (ex: name == "Visitante").
        """
        left = self._parse_primary_expression()

        # Operadores de comparação
        if self.current_token and self.current_token.type in ['EQEQ', 'NEQ', 'LT', 'LE', 'GT', 'GE']:
            operator = self.current_token
            self.advance() # Consome o operador
            right = self._parse_primary_expression()
            return BinaryExpression(left, operator, right)
        
        return left

    def _parse_primary_expression(self):
        """Parseia o tipo mais básico de expressão: Literal, Identifier."""
        token = self.current_token
        if token is None:
            raise SyntaxError("Fim de arquivo inesperado ao parsear expressão primária.")

        if token.type == 'STRING':
            self.eat('STRING')
            return Literal(token.value.strip('"'), 'STRING')
        elif token.type == 'NUMBER':
            self.eat('NUMBER')
            return Literal(float(token.value), 'NUMBER')
        elif token.type == 'IDENTIFIER':
            self.eat('IDENTIFIER')
            return Identifier(token.value)
        elif token.type == 'LPAREN': # Suporte básico para parênteses em expressões
            self.eat('LPAREN')
            expr = self.parse_expression()
            self.eat('RPAREN')
            return expr
        else:
            raise SyntaxError(f"Expressão primária inesperada: '{token.value}' (tipo: {token.type}) na linha {token.line}, coluna {token.column}")

    def parse_if_statement(self):
        """Parseia uma instrução 'if'."""
        self.eat('IF')
        
        condition = self.parse_expression()
        then_block = self.parse_block()

        else_block = None
        if self.current_token and self.current_token.type == 'ELSE':
            self.eat('ELSE')
            else_block = self.parse_block()

        return IfStatement(condition, then_block, else_block)

    def parse_for_loop(self):
        """Parseia uma instrução 'for'."""
        self.eat('FOR')
        
        iterator_var = Identifier(self.eat('IDENTIFIER'))

        collection_or_range_start = None
        collection_or_range_end = None

        if self.current_token and self.current_token.type == 'IN':
            self.eat('IN')
            if self.current_token.type == 'STRING':
                collection_or_range_start = Literal(self.eat('STRING').strip('"'), 'STRING')
            elif self.current_token.type == 'IDENTIFIER':
                collection_or_range_start = Identifier(self.eat('IDENTIFIER'))
            else:
                raise SyntaxError(f"Esperado STRING ou IDENTIFIER após 'in', encontrado '{self.current_token.type}'")
        
        elif self.current_token and self.current_token.type == 'FROM':
            self.eat('FROM')
            start_node = self._parse_primary_expression()
            if not (isinstance(start_node, Literal) and start_node.type == 'NUMBER') and \
               not isinstance(start_node, Identifier):
                raise SyntaxError(f"Esperado NUMBER ou IDENTIFIER após 'from', encontrado '{type(start_node).__name__}'")
            collection_or_range_start = start_node

            self.eat('TO')
            end_node = self._parse_primary_expression()
            if not (isinstance(end_node, Literal) and end_node.type == 'NUMBER') and \
               not isinstance(end_node, Identifier):
                raise SyntaxError(f"Esperado NUMBER ou IDENTIFIER após 'to', encontrado '{type(end_node).__name__}'")
            collection_or_range_end = end_node
        else:
            raise SyntaxError(f"Esperado 'in' ou 'from' após o identificador do loop 'for', encontrado '{self.current_token.type}'")

        loop_block = self.parse_block()
        for_loop_node = ForLoopStatement(iterator_var, collection_or_range_start, collection_or_range_end)
        for_loop_node.block = loop_block
        return for_loop_node


    def parse_block(self):
        """Parseia um bloco de código entre chaves."""
        self.eat('LBRACE')
        statements = []
        while self.current_token and self.current_token.type != 'RBRACE':
            statements.append(self.parse_statement())
        self.eat('RBRACE')
        return Block(statements)

def parse(code: str) -> Program:
    """
    Função principal para parsear o código e retornar a AST.
    """
    tokens = tokenize(code)
    tokens = [t for t in tokens if t.type not in ['UNKNOWN', 'WHITESPACE', 'COMMENT']]
    
    parser = Parser(tokens)
    return parser.parse()
