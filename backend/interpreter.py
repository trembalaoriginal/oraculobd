# backend/interpreter.py
from parser import parse, Program, CommandStatement, Literal, Identifier, Block, \
                   BinaryExpression, IfStatement, ForLoopStatement 
from oraculo_lib import OraculoLib
import asyncio

class SymbolTable:
    """
    Gerencia os escopos das variáveis.
    Cada escopo (função, bloco, loop) tem sua própria tabela de símbolos.
    """
    def __init__(self, parent=None):
        self._symbols = {}
        self.parent = parent # Escopo pai

    def define(self, name: str, value):
        self._symbols[name] = value

    def resolve(self, name: str):
        # Tenta resolver no escopo atual
        if name in self._symbols:
            return self._symbols[name]
        # Se não encontrar, tenta no escopo pai
        if self.parent:
            return self.parent.resolve(name)
        raise NameError(f"Variável '{name}' não definida no escopo.")

class Interpreter:
    def __init__(self):
        self.global_scope = SymbolTable() # O escopo mais externo
        self.current_scope = self.global_scope
        self.output_buffer = [] # Para console.log
        self.html_elements = [] # Para elementos HTML gerados
        self.lib = OraculoLib(self.output_buffer, self.html_elements)
        
        self.ast = None # A AST do programa sendo executado
        self.current_statement_index = 0 # Onde a execução parou
        self.pending_input_request = None # Guarda a requisição de input se a execução pausar

    def set_ast(self, ast: Program):
        """Define a AST para uma nova execução."""
        self.ast = ast
        self.current_statement_index = 0
        self.output_buffer = [] # Limpa a saída para nova execução
        self.html_elements = []
        self.global_scope = SymbolTable() # Reseta o escopo global
        self.current_scope = self.global_scope
        self.lib.reset_state(self.output_buffer, self.html_elements) # Resetar estado da lib

    # --- Métodos de Gerenciamento de Escopo ---
    def enter_scope(self):
        """Cria um novo escopo aninhado."""
        new_scope = SymbolTable(parent=self.current_scope)
        self.current_scope = new_scope

    def exit_scope(self):
        """Retorna ao escopo pai."""
        if self.current_scope.parent:
            self.current_scope = self.current_scope.parent
        else:
            raise Exception("Tentativa de sair do escopo global sem um escopo pai.")

    # --- Métodos de Visitação da AST ---
    async def visit(self, node):
        """Método dispatcher para visitar nós da AST."""
        method_name = f"visit_{type(node).__name__}"
        visitor = getattr(self, method_name, self.generic_visit)
        return await visitor(node)

    async def generic_visit(self, node):
        raise Exception(f"Nenhum método visit_{type(node).__name__} implementado para o nó: {type(node).__name__}")

    async def visit_Program(self, node: Program):
        # Itera sobre os statements a partir do ponto onde a execução parou
        while self.current_statement_index < len(node.statements):
            statement = node.statements[self.current_statement_index]
            await self.visit(statement)
            
            # Se uma requisição de input foi pendurada, pausa a execução
            if self.pending_input_request:
                return # Retorna e espera o input do frontend
            
            self.current_statement_index += 1
        
        # Se a execução chegou ao fim, limpa o estado de input pendente
        self.pending_input_request = None


    async def visit_CommandStatement(self, node: CommandStatement):
        command = node.command_name
        
        # Avalia todos os argumentos antes de executar o comando
        evaluated_args = []
        for arg_node in node.args:
            if isinstance(arg_node, Identifier) and command == 'ask' and arg_node == node.args[-1]:
                evaluated_args.append(arg_node.name) # Passa o nome da variável como string
            else:
                evaluated_args.append(await self.evaluate_node(arg_node))

        if command == "print":
            message = str(evaluated_args[0]) if evaluated_args else ""
            # Substitui variáveis no string (ex: ${name})
            for var_name, var_value in self.current_scope._symbols.items():
                message = message.replace(f"${{{var_name}}}", str(var_value))
            self.lib.dom.print_to_output(message)

        elif command == "create":
            obj_type = evaluated_args[0]
            text = evaluated_args[1]
            # Extrair atributos se houverem, por exemplo: create button "Texto" id "myBtn"
            # Por enquanto, assumimos apenas tipo e texto.
            self.lib.html5.create_element(obj_type, text) 
            
            if node.block:
                # O add_event_handler agora armazena o bloco e o escopo para execução futura
                self.lib.dom.add_event_handler(obj_type, text, node.block, self.current_scope)
                self.lib.dom.print_to_output(f"// Evento onClick configurado para '{obj_type}': '{text}'.")

        elif command == "ask":
            question = evaluated_args[0]
            var_name = evaluated_args[1]
            
            # Pausa a execução e sinaliza para o frontend que um input é necessário
            self.pending_input_request = {
                "variable_name": var_name,
                "question": question
            }
            self.lib.dom.print_to_to_output(f"// [Oráculo]: Aguardando input para '{var_name}' (Pergunta: '{question}').")
            # A execução será retomada no método 'run' quando o input for submetido

        elif command == "ai.craftHtml": # Novo comando para AI
            if not evaluated_args:
                raise ValueError("O comando 'ai.craftHtml' requer um prompt como argumento.")
            
            prompt = evaluated_args[0]
            
            # Adiciona contexto para o LLM gerar HTML
            full_prompt = (
                f"Você é um especialista em desenvolvimento web. Gere **apenas** o código HTML para a seguinte requisição. "
                f"Não inclua markdown, explicações, ou qualquer texto extra, apenas o HTML puro. "
                f"Requisicao: {prompt}"
            )
            
            generated_html = await self.lib.ai.generate_content(full_prompt)
            
            if generated_html:
                self.lib.dom.print_to_output(f"// AI: HTML gerado e injetado no DOM:\n{generated_html}")
                self.lib.html5.append_raw_html(generated_html)
            else:
                self.lib.dom.print_to_output("// AI: Não foi possível gerar HTML.")
        else:
            self.lib.dom.print_to_output(f"Erro: Comando '{command}' não reconhecido ou implementado.")

    async def visit_Literal(self, node: Literal):
        return node.value

    async def visit_Identifier(self, node: Identifier):
        return self.current_scope.resolve(node.name)
    
    async def visit_BinaryExpression(self, node: BinaryExpression):
        left_val = await self.evaluate_node(node.left)
        right_val = await self.evaluate_node(node.right)
        
        # Certifique-se de que os tipos são compatíveis para comparação
        if type(left_val) != type(right_val):
            if isinstance(left_val, (int, float)) and isinstance(right_val, (int, float)):
                pass
            elif isinstance(left_val, str) and isinstance(right_val, (int, float)):
                try: right_val = str(right_val)
                except: pass
            elif isinstance(right_val, str) and isinstance(left_val, (int, float)):
                try: left_val = str(left_val)
                except: pass
        
        if node.operator == '==':
            return left_val == right_val
        elif node.operator == '!=':
            return left_val != right_val
        elif node.operator == '>':
            return left_val > right_val
        elif node.operator == '<':
            return left_val < right_val
        elif node.operator == '>=':
            return left_val >= right_val
        elif node.operator == '<=':
            return left_val <= right_val
        else:
            raise Exception(f"Operador binário desconhecido: {node.operator}")

    async def visit_IfStatement(self, node: IfStatement):
        condition_result = await self.evaluate_node(node.condition)
        
        if condition_result:
            self.enter_scope()
            await self.visit(node.then_block)
            self.exit_scope()
        elif node.else_block:
            self.enter_scope()
            await self.visit(node.else_block)
            self.exit_scope()

    async def visit_ForLoopStatement(self, node: ForLoopStatement):
        self.enter_scope()

        iterator_var_name = node.iterator_var.name

        if node.collection_or_range_end: # for X from A to B
            start_val = await self.evaluate_node(node.collection_or_range_start)
            end_val = await self.evaluate_node(node.collection_or_range_end)

            if not isinstance(start_val, (int, float)) or not isinstance(end_val, (int, float)):
                raise TypeError("Os valores de 'from' e 'to' em um loop 'for' devem ser numéricos.")
            
            for i in range(int(start_val), int(end_val) + 1):
                self.current_scope.define(iterator_var_name, i)
                await self.visit(node.block)
                if self.pending_input_request:
                    self.current_statement_index -= 1
                    return
        
        elif node.collection_or_range_start: # for X in Y
            collection_val = await self.evaluate_node(node.collection_or_range_start)
            
            if isinstance(collection_val, str) and ',' in collection_val:
                items = [item.strip() for item in collection_val.split(',')]
                self.lib.dom.print_to_output(f"// Iterando sobre coleção: {items}")
                for item in items:
                    self.current_scope.define(iterator_var_name, item)
                    await self.visit(node.block)
                    if self.pending_input_request:
                        self.current_statement_index -= 1
                        return
            else:
                raise TypeError(f"Loop 'for in' esperava uma coleção ou string 'item1,item2', encontrou: {type(collection_val).__name__}")
        
        self.exit_scope()

    async def visit_Block(self, node: Block):
        for statement in node.statements:
            await self.visit(statement)
            if self.pending_input_request:
                return

    async def evaluate_node(self, node):
        if isinstance(node, (Literal, Identifier, BinaryExpression)):
            return await self.visit(node)
        return node

    async def run(self):
        """
        Executa o programa a partir do estado atual do interpretador.
        Retorna o HTML, console log, e qualquer requisição de input pendente.
        """
        if not self.ast:
            raise Exception("Nenhum programa carregado para interpretação.")
            
        try:
            await self.visit_Program(self.ast)
            
            if not self.pending_input_request:
                self.current_statement_index = len(self.ast.statements)
            
            html_output_str = "\n".join(self.html_elements)
            console_output_str = "\n".join(self.output_buffer)

            return html_output_str, console_output_str, self.pending_input_request, self.lib.dom._event_handlers_frontend_view()
        except Exception as e:
            error_msg = f"Erro em tempo de execução: {type(e).__name__}: {e}"
            self.lib.dom.print_to_output(error_msg)
            self.pending_input_request = None
            return "", "\n".join(self.output_buffer), None, self.lib.dom._event_handlers_frontend_view()
