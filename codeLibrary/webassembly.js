// backend/codeLibrary/webassembly.js
module.exports = [
  {
    id: 'wasm-introduction',
    keywords: ['webassembly', 'wasm', 'introducao', 'o que e wasm'],
    tags: ['web', 'performance', 'compilacao'],
    description: 'Uma introdução ao WebAssembly (Wasm) e seus principais usos.',
    code: `// WebAssembly (Wasm) é um formato de instrução binária de baixo nível,
// para uma máquina virtual baseada em pilha.
// Projetado como um alvo de compilação portátil para linguagens como C/C++/Rust,
// permite executar código de alto desempenho em navegadores web e em outros ambientes.

// Principais características e benefícios:
// 1.  **Performance:** Próximo à velocidade nativa.
// 2.  **Portabilidade:** Roda em todos os navegadores modernos e runtimes fora do navegador (Node.js, Deno).
// 3.  **Segurança:** Executado em um ambiente sandbox, isolado do sistema.
// 4.  **Linguagens Múltiplas:** Permite compilar código de diversas linguagens (C, C++, Rust, Go, C#) para a web.
// 5.  **Complementar ao JavaScript:** Não substitui o JS, mas o complementa para tarefas intensivas.

// Casos de Uso Comuns:
// - Jogos e motores 3D
// - Edição de vídeo/áudio e processamento de imagem
// - Aplicações de engenharia/científicas
// - Realidade Aumentada/Virtual (AR/VR)
// - Emulação de sistemas e máquinas virtuais
// - Aplicações que precisam de criptografia de alto desempenho`,
    weight: 10,
    related: ['wasm-javascript-api']
  },
  {
    id: 'wasm-javascript-api',
    keywords: ['javascript wasm', 'api wasm', 'carregar wasm'],
    tags: ['web', 'javascript', 'interoperabilidade'],
    description: 'Exemplo de como carregar e usar um módulo WebAssembly via JavaScript no navegador.',
    code: `// Supondo que você tenha um arquivo 'add.wasm' compilado de C/C++/Rust:
// int add(int a, int b) { return a + b; }

// Função assíncrona para carregar e instanciar o módulo WASM
async function loadWasmModule() {
  try {
    // 1. Carregar o arquivo .wasm
    const response = await fetch('add.wasm');
    const bytes = await response.arrayBuffer();

    // 2. Instanciar o módulo WebAssembly
    const { instance, module } = await WebAssembly.instantiate(bytes, {
      // Opcional: "imports" que o módulo WASM espera (ex: funções JS que ele pode chamar)
      env: {
        log_number: (num) => console.log('WASM log:', num)
      }
    });

    // 3. Acessar as funções exportadas do módulo WASM
    const addFunction = instance.exports.add; // Supondo que 'add' foi exportada

    // 4. Usar a função WASM
    const result = addFunction(10, 20);
    console.log('Resultado da função WASM (10 + 20):', result); // Saída: 30

    // Opcional: Acessar memória exportada, se houver
    // const memory = instance.exports.memory;
    // const typedArray = new Uint8Array(memory.buffer);

  } catch (error) {
    console.error('Erro ao carregar ou executar WASM:', error);
  }
}

// Chame a função para iniciar o carregamento do WASM
// loadWasmModule();`,
    weight: 9,
    related: ['wasm-introduction']
  },
  {
    id: 'wasm-rust-example',
    keywords: ['rust wasm', 'rust to wasm', 'compilar rust'],
    tags: ['rust', 'webassembly', 'ferramentas'],
    description: 'Exemplo conceitual de código Rust compilado para WebAssembly.',
    code: `// --- Exemplo de Código Rust (src/lib.rs) ---
// Para compilar este código para WASM, você geralmente usaria 'wasm-pack'

// Importa o macro para exportar a função para JavaScript
#[no_mangle]
// Define a função como pública e extern "C" para compatibilidade com JS
pub extern "C" fn multiply(a: i32, b: i32) -> i32 {
    a * b
}

// Um exemplo mais complexo, que aloca memória e retorna um ponteiro
// #[no_mangle]
// pub extern "C" fn create_string(length: usize) -> *mut u8 {
//     let mut vec = Vec::with_capacity(length);
//     let ptr = vec.as_mut_ptr();
//     std::mem::forget(vec); // Não chama o destrutor do Vec
//     ptr
// }
// Para liberar:
// #[no_mangle]
// pub extern "C" fn free_string(ptr: *mut u8, capacity: usize) {
//     unsafe {
//         let _ = Vec::from_raw_parts(ptr, 0, capacity);
//     }
// }


// --- Ferramentas para Compilação ---
// Instalar wasm-pack: cargo install wasm-pack
// Compilar: wasm-pack build --target web

// --- Como Usar no JavaScript (via bundler como Webpack/Vite) ---
/*
// import { multiply } from './pkg/your_crate_name'; // Nome do seu crate Rust

// console.log('Resultado da multiplicação (Rust WASM):', multiply(7, 8)); // Saída: 56
*/`,
    weight: 8,
    related: ['wasm-introduction']
  }
];
