# backend/app.py
from fastapi import FastAPI, Request, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import asyncio
import uuid # Para gerar IDs de sessão

# Importe o interpretador principal
from interpreter import Interpreter, SymbolTable, Program, CommandStatement, Literal, Identifier, Block, \
                         BinaryExpression, IfStatement, ForLoopStatement, parse 

app = FastAPI(
    title="OráculoScript Backend",
    description="API para interpretar e executar código OráculoScript."
)

# Configuração do CORS
origins = ["*"] # Mantenha "*" para desenvolvimento, restrinja para produção.
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Armazenamento temporário para estados de interpretação.
# Em produção, isso seria um banco de dados ou cache distribuído (Redis).
# {session_id: Interpreter_instance}
active_sessions = {}

class CodeExecutionRequest(BaseModel):
    code: str
    session_id: str = None # Pode vir nulo para uma nova sessão

class UserInputRequest(Base BaseModel):
    session_id: str
    variable_name: str
    input_value: str

class EventTriggerRequest(BaseModel):
    session_id: str
    event_id: str # O ID do evento gerado pelo backend
    # Quaisquer outros dados do evento, como detalhes do clique

@app.post("/interpret")
async def interpret_code(request: CodeExecutionRequest):
    """
    Endpoint para iniciar ou continuar a execução de código OráculoScript.
    """
    session_id = request.session_id
    interpreter_instance = None
    initial_call = False

    if session_id and session_id in active_sessions:
        interpreter_instance = active_sessions[session_id]
        # Se for uma sessão existente sem código novo, é uma continuação.
        # Caso contrário, pode ser um reinício ou novo código.
        if request.code: # Novo código enviado para uma sessão existente, reinicia.
             interpreter_instance = Interpreter()
             active_sessions[session_id] = interpreter_instance
             initial_call = True
    else: # Nova sessão
        session_id = str(uuid.uuid4())
        interpreter_instance = Interpreter()
        active_sessions[session_id] = interpreter_instance
        initial_call = True

    try:
        # Se é uma nova execução ou reinício, parseia e executa do zero.
        if initial_call:
            ast = parse(request.code)
            interpreter_instance.set_ast(ast)
            
        # O método run pode pausar se encontrar um 'ask'
        html_output, console_log, pending_input_request, event_handlers = await interpreter_instance.run()

        response = {
            "status": "success",
            "session_id": session_id,
            "html_output": html_output,
            "console_log": console_log,
            "pending_input_request": pending_input_request, # {variable_name: "name", question: "Qual seu nome?"}
            "event_handlers": event_handlers # IDs e detalhes dos eventos registrados para o frontend
        }
        return response
    except Exception as e:
        # Em caso de erro, limpa a sessão para evitar estados quebrados
        if session_id in active_sessions:
            del active_sessions[session_id]
        raise HTTPException(status_code=400, detail=f"Erro de execução do OráculoScript (sessão {session_id}): {type(e).__name__}: {e}")

@app.post("/submit_input")
async def submit_input(request: UserInputRequest):
    """
    Endpoint para o frontend submeter uma resposta a um comando 'ask'.
    """
    session_id = request.session_id
    if session_id not in active_sessions:
        raise HTTPException(status_code=404, detail=f"Sessão '{session_id}' não encontrada ou expirada.")
    
    interpreter_instance = active_sessions[session_id]
    
    try:
        # Define a variável no escopo da sessão e continua a execução
        interpreter_instance.current_scope.define(request.variable_name, request.input_value)
        interpreter_instance.lib.dom.print_to_output(f"// [Oráculo]: Recebida entrada para '{request.variable_name}': '{request.input_value}'")
        
        # Continua a execução do interpretador onde parou
        html_output, console_log, pending_input_request, event_handlers = await interpreter_instance.run()
        
        return {
            "status": "success",
            "session_id": session_id,
            "html_output": html_output,
            "console_log": console_log,
            "pending_input_request": pending_input_request,
            "event_handlers": event_handlers
        }
    except Exception as e:
        if session_id in active_sessions:
            del active_sessions[session_id]
        raise HTTPException(status_code=400, detail=f"Erro ao processar entrada do usuário na sessão {session_id}: {type(e).__name__}: {e}")

@app.post("/trigger_event")
async def trigger_event(request: EventTriggerRequest):
    """
    Endpoint para o frontend disparar um evento simulado (ex: onClick).
    """
    session_id = request.session_id
    if session_id not in active_sessions:
        raise HTTPException(status_code=404, detail=f"Sessão '{session_id}' não encontrada ou expirada.")

    interpreter_instance = active_sessions[session_id]

    try:
        event_info = interpreter_instance.lib.dom.get_event_handler(request.event_id)
        if not event_info:
            raise HTTPException(status_code=404, detail=f"Manipulador de evento '{request.event_id}' não encontrado.")
        
        # Executa o bloco do evento no escopo em que ele foi definido
        original_scope = interpreter_instance.current_scope # Salva o escopo atual
        interpreter_instance.current_scope = event_info['scope'] # Muda para o escopo do evento
        
        interpreter_instance.lib.dom.print_to_output(f"// [Oráculo]: Evento '{request.event_id}' disparado!")
        
        # Executa o bloco de comandos associado ao evento
        # O bloco é uma lista de CommandStatements ou outros nós da AST
        for statement_node in event_info['block'].statements:
            await interpreter_instance.visit(statement_node)

        # Restaura o escopo original (embora para eventos de UI, o escopo geralmente não é restaurado assim)
        # Para um interpretador mais avançado, eventos podem ter seu próprio sub-interpretador ou contexto.
        interpreter_instance.current_scope = original_scope

        # Retorna o estado atualizado do HTML e console, mas sem mudar o fluxo principal de execução.
        return {
            "status": "success",
            "session_id": session_id,
            "html_output": "\n".join(interpreter_instance.html_elements),
            "console_log": "\n".join(interpreter_instance.output_buffer),
            "pending_input_request": None, # Eventos não pedem input imediatamente
            "event_handlers": interpreter_instance.lib.dom._event_handlers_frontend_view() # Atualiza os handlers se mudaram
        }

    except Exception as e:
        interpreter_instance.lib.dom.print_to_output(f"// [Oráculo]: Erro ao disparar evento '{request.event_id}': {type(e).__name__}: {e}")
        raise HTTPException(status_code=400, detail=f"Erro ao disparar evento '{request.event_id}' na sessão {session_id}: {type(e).__name__}: {e}")


@app.get("/")
async def read_root():
    return {"message": "Bem-vindo ao Backend do OráculoScript!"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)
