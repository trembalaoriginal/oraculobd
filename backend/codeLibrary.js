// Biblioteca de geração local de código
module.exports = {
  html: (desc) => {
    // Login form
    if (/login|loguin/i.test(desc)) {
      return (
`<form action="/login" method="post">
  <label>Email:
    <input type="email" name="email" required />
  </label>
  <label>Senha:
    <input type="password" name="password" required />
  </label>
  <button type="submit">Entrar</button>
</form>`
      );
    }
    // Formulário genérico
    if (/formulário/i.test(desc)) {
      return (
`<form>
  <!-- campos gerados para: ${desc} -->
  <input type="text" placeholder="Seu valor aqui" />
  <button type="submit">Enviar</button>
</form>`
      );
    }
    // Fallback: comenta o pedido
    return `<!-- HTML: ${desc} -->`;
  },

  python: (desc) => {
    if (/somar dois números/i.test(desc)) {
      return (
`def soma(a, b):
    """Retorna a soma de dois números."""
    return a + b`
      );
    }
    // Fallback genérico
    return `# Python: ${desc}`;
  },

  javascript: (desc) => {
    if (/cpf/i.test(desc)) {
      return (
`function validarCPF(cpf) {
  // implementa a validação de CPF aqui
}`
      );
    }
    // Fallback genérico
    return `// JavaScript: ${desc}`;
  },

  css: (desc) => {
    if (/botão azul/i.test(desc)) {
      return (
`.btn-azul {
  background-color: blue;
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
}`
      );
    }
    return `/* CSS: ${desc} */`;
  }
};
