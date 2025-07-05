# backend/oraculo_lib.py
import asyncio
import uuid
import re
import os # Para acessar variáveis de ambiente

class OraculoLib:
    """
    Biblioteca padrão para OráculoScript, interagindo com o ambiente.
    """
    def __init__(self, output_buffer, html_elements):
        self._output_buffer = output_buffer
        self._html_elements = html_elements
        self.dom = self._DOM(self._output_buffer, self._html_elements, self._get_event_handlers_backend_ref())
        self.html5 = self._HTML5(self._output_buffer, self._html_elements)
        self.ai = self._AI(self._output_buffer)
        self.storage = self._Storage(self._output_buffer)
        self.http = self._HTTP(self._output_buffer)
        
        # Armazena manipuladores de eventos definidos no OráculoScript
        # {event_id: {'block': AST_node, 'scope': SymbolTable_instance, 'element_id': str}}
        self._event_handlers_backend = {} 

    def _get_event_handlers_backend_ref(self):
        """Retorna uma referência para _event_handlers_backend."""
        return self._event_handlers_backend

    def reset_state(self, output_buffer, html_elements):
        """Reseta o estado da biblioteca para uma nova execução."""
        self._output_buffer = output_buffer
        self._html_elements = html_elements
        self._event_handlers_backend = {} # Limpa handlers de eventos
        
        # Reinicializa sub-classes com as novas referências de buffer
        self.dom = self._DOM(self._output_buffer, self._html_elements, self._get_event_handlers_backend_ref())
        self.html5 = self._HTML5(self._output_buffer, self._html_elements)
        self.ai = self._AI(self._output_buffer)
        self.storage = self._Storage(self._output_buffer)
        self.http = self._HTTP(self._output_buffer)

    class _DOM:
        def __init__(self, output_buffer, html_elements, event_handlers_backend_ref):
            self._output_buffer = output_buffer
            self._html_elements = html_elements
            self._event_handlers_backend = event_handlers_backend_ref # Referência ao dict do pai
            # Armazena os eventos que são expostos para o frontend
            # {event_id: {'element_id': ..., 'type': 'onClick'}}
            self._event_handlers_exposed_to_frontend = {}

        def print_to_output(self, message: str):
            """Simula a impressão no console/terminal."""
            self._output_buffer.append(f"[console]: {message}")

        def add_event_handler(self, element_type: str, element_text: str, event_block, scope_at_definition):
            """
            Registra um manipulador de eventos no backend e prepara-o para o frontend.
            Gera um ID único para o evento.
            """
            # Usar o ID do elemento gerado pelo HTML5 para associar
            # Para isso, o create_element precisaria retornar o ID e ser passado aqui.
            # Por agora, vamos gerar um ID aqui e assumir que o frontend encontrará.
            element_id = f"{element_type}-{text_to_id(element_text)}-{str(uuid.uuid4())[:4]}"
            event_id = f"event-{str(uuid.uuid4())}"

            # Armazena o bloco do evento e seu escopo no backend
            self._event_handlers_backend[event_id] = {
                'block': event_block,
                'scope': scope_at_definition, # Escopo em que o evento foi definido
                'element_id': element_id # O ID do elemento HTML ao qual está associado
            }
            # Adiciona ao mapeamento para o frontend
            self._event_handlers_exposed_to_frontend[event_id] = {
                'element_id': element_id,
                'event_type': 'onClick' # Por enquanto, apenas onClick
            }
            self._output_buffer.append(f"// DOM: Evento '{event_id}' (onClick para '{element_text}' - ID: {element_id}) registrado.")
            # A classe HTML5 precisa garantir que o elemento gerado tenha este element_id
            # Para simplificar, o frontend vai procurar o ID correto.
            return element_id

        def get_event_handler(self, event_id: str):
            """Retorna as informações do manipulador de evento pelo ID."""
            return self._event_handlers_backend.get(event_id)

        def _event_handlers_frontend_view(self):
            """Retorna uma visão simplificada dos eventos para o frontend."""
            return self._event_handlers_exposed_to_frontend

        def count_elements(self, tag_name: str) -> int:
            count = sum(1 for html_str in self._html_elements if f"<{tag_name}" in html_str)
            self._output_buffer.append(f"// DOM: Contando elementos '{tag_name}'. Encontrados: {count}")
            return count
        
        def show_alert(self, message: str):
            self._output_buffer.append(f"// DOM: Alerta exibido no navegador: '{message}'")

    class _HTML5:
        def __init__(self, output_buffer, html_elements):
            self._output_buffer = output_buffer
            self._html_elements = html_elements

        def create_element(self, obj_type: str, text: str, attributes: dict = None):
            element_id = f"oraculoscript-el-{str(uuid.uuid4())[:8]}" # ID único para o elemento
            attrs_str = ""
            
            if attributes:
                attrs_str = " ".join([f'{k}="{v}"' for k, v in attributes.items()])
            
            final_attrs = f'id="{element_id}" {attrs_str}'.strip() # Garante o ID
            
            if obj_type == "title":
                self._html_elements.append(f"<h1 {final_attrs}>{text}</h1>")
                self._output_buffer.append(f"// HTML5: Título '{text}' (ID: {element_id}) criado.")
            elif obj_type == "button":
                self._html_elements.append(f"<button {final_attrs}>{text}</button>")
                self._output_buffer.append(f"// HTML5: Botão '{text}' (ID: {element_id}) criado.")
            else:
                self._html_elements.append(f"<div {final_attrs}>{text}</div>")
                self._output_buffer.append(f"// HTML5: Elemento '{obj_type}' com texto '{text}' (ID: {element_id}) criado.")
            
            return element_id # Retorna o ID do elemento criado

        def append_raw_html(self, html_string: str):
            """Adiciona uma string HTML bruta à lista de elementos para renderização."""
            self._html_elements.append(html_string)
            self._output_buffer.append(f"// HTML5: Injetado HTML bruto no documento.")


    class _AI:
        def __init__(self, output_buffer):
            self._output_buffer = output_buffer
            # Carrega a chave de API de uma variável de ambiente
            self._gemini_api_key = os.getenv("GEMINI_API_KEY") 
            if not self._gemini_api_key:
                self._output_buffer.append("// AVISO: Variável de ambiente GEMINI_API_KEY não definida. A AI não funcionará.")

        async def generate_content(self, prompt: str) -> str:
            """
            Chama a API de um modelo de linguagem (ex: Gemini) para gerar conteúdo.
            A 'prompt' deve instruir o LLM sobre o que gerar (ex: código HTML).
            """
            if not self._gemini_api_key:
                return ""

            self._output_buffer.append(f"[AI.generate_content]: Enviando prompt ao LLM: '{prompt[:80]}...'")
            
            try:
                import google.generativeai as genai
                genai.configure(api_key=self._gemini_api_key)
                
                # Modelos específicos para geração de texto ou código
                # 'gemini-pro' é um bom ponto de partida. 'gemini-pro-vision' para multimodal.
                model = genai.GenerativeModel('gemini-pro') 
                
                # Configurações de geração para focar na saída de código
                generation_config = genai.GenerationConfig(
                    temperature=0.4, # Menor temperatura para respostas mais determinísticas/focadas
                    max_output_tokens=2048, # Aumentar para código HTML mais longo
                    top_p=0.95,
                    top_k=40
                )
                
                response = await asyncio.to_thread(
                    model.generate_content,
                    prompt,
                    generation_config=generation_config
                )
                
                generated_text = response.text.strip()
                self._output_buffer.append(f"[AI.generate_content]: Conteúdo gerado pelo LLM.")
                return generated_text
            except ImportError:
                self._output_buffer.append("// ERRO: google-generativeai não instalado. Execute 'pip install google-generativeai'")
                return ""
            except Exception as e:
                self._output_buffer.append(f"// ERRO ao chamar LLM: {e}")
                return f""

    class _Storage:
        def __init__(self, output_buffer):
            self._output_buffer = output_buffer
            self._data = {}

        def set_item(self, key: str, value: str):
            self._data[key] = value
            self._output_buffer.append(f"[Storage.set_item]: '{key}' = '{value}'")

        def get_item(self, key: str):
            value = self._data.get(key, None)
            self._output_buffer.append(f"[Storage.get_item]: '{key}' = '{value}'")
            return value
        
    class _HTTP:
        def __init__(self, output_buffer):
            self._output_buffer = output_buffer

        async def get(self, url: str):
            self._output_buffer.append(f"[HTTP.get]: Requisição GET para {url}")
            await asyncio.sleep(0.05)
            return {"status": 200, "data": "simulated_response"}

def text_to_id(text: str) -> str:
    """Converte um texto em um ID seguro para HTML."""
    return re.sub(r'[^a-zA-Z0-9_-]', '', text.replace(' ', '-')).lower()
