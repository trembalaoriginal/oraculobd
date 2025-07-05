// backend/codeLibrary/css.js
module.exports = [
  {
    id: 'css-reset',
    keywords: ['reset', 'normalize', 'limpar css', 'estilos padrao'],
    tags: ['fundamentos', 'layout'],
    description: 'Um CSS reset básico para garantir consistência entre navegadores.',
    code: `/* CSS Reset Básico */
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
  font-family: 'Arial', sans-serif;
}

img, picture, video, canvas, svg {
  display: block;
  max-width: 100%;
}

input, button, textarea, select {
  font: inherit;
}

p, h1, h2, h3, h4, h5, h6 {
  overflow-wrap: break-word;
}

ul, ol {
  list-style: none;
}

a {
  text-decoration: none;
  color: inherit;
}`,
    weight: 9,
    related: ['html-basic-structure']
  },
  {
    id: 'css-button-primary',
    keywords: ['botao', 'primario', 'azul', 'button'],
    tags: ['componente', 'ui'],
    description: 'Um estilo CSS para um botão primário com hover.',
    code: `.btn-primary {
  background-color: #007bff; /* Azul primário */
  color: white;
  padding: 12px 25px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1.1em;
  font-weight: bold;
  transition: background-color 0.3s ease, transform 0.2s ease;
  display: inline-block; /* Para padding funcionar bem */
  text-align: center;
}
.btn-primary:hover {
  background-color: #0056b3; /* Azul mais escuro no hover */
  transform: translateY(-2px);
}
.btn-primary:active {
  transform: translateY(0);
}`,
    weight: 10,
    related: ['html-button']
  },
  {
    id: 'css-responsive-layout',
    keywords: ['responsivo', 'mobile first', 'layout', 'media query', 'design'],
    tags: ['layout', 'responsividade', 'fundamentos'],
    description: 'Um exemplo de layout responsivo com media queries (mobile-first).',
    code: `/* Mobile First: Estilos padrão para telas pequenas */
body {
  font-family: 'Open Sans', sans-serif;
  margin: 0;
  padding: 15px;
  background-color: #f4f7f6;
  color: #333;
}

.container {
  width: 100%;
  max-width: 1200px; /* Limite máximo para o container */
  margin: 0 auto;
  padding: 0 15px;
  box-sizing: border-box;
}

.header, .footer {
  text-align: center;
  padding: 20px;
  background-color: #e0e0e0;
  margin-bottom: 20px;
  border-radius: 8px;
}

.main-content {
  display: flex;
  flex-direction: column; /* Colunas empilhadas no mobile */
  gap: 20px;
}

.card {
  background-color: white;
  padding: 25px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

/* Medium devices (tablets, 768px and up) */
@media (min-width: 768px) {
  .main-content {
    flex-direction: row; /* Colunas lado a lado no tablet */
    flex-wrap: wrap; /* Permite quebrar linha */
  }
  .card {
    flex: 1 1 calc(50% - 10px); /* Duas colunas */
  }
}

/* Large devices (desktops, 1024px and up) */
@media (min-width: 1024px) {
  .card {
    flex: 1 1 calc(33.333% - 14px); /* Três colunas */
  }
}`,
    weight: 10,
    related: ['html-responsive-table']
  },
  {
    id: 'css-flexbox-center',
    keywords: ['centralizar', 'flexbox', 'div centro'],
    tags: ['layout', 'flexbox'],
    description: 'Estilo Flexbox para centralizar um elemento vertical e horizontalmente.',
    code: `.center-container {
  display: flex;
  justify-content: center; /* Alinha itens horizontalmente no centro */
  align-items: center;     /* Alinha itens verticalmente no centro */
  height: 100vh;           /* Ocupa a altura total da viewport para centralização vertical */
  background-color: #f0f8ff; /* Apenas para visualização */
}

.centered-element {
  width: 200px;
  height: 150px;
  background-color: #007bff;
  color: white;
  display: flex; /* Para centralizar o texto dentro do elemento */
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  font-size: 1.2em;
}`,
    weight: 9
  },
  {
    id: 'css-grid-layout',
    keywords: ['grid', 'layout grid', 'duas colunas', 'tres colunas'],
    tags: ['layout', 'grid'],
    description: 'Um layout CSS Grid simples para organizar itens em colunas e linhas.',
    code: `.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); /* Colunas responsivas */
  gap: 20px; /* Espaçamento entre os itens do grid */
  padding: 20px;
  background-color: #e6f7ff;
  border-radius: 10px;
}

.grid-item {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.08);
  text-align: center;
  font-family: 'Verdana', sans-serif;
  color: #333;
}`,
    weight: 8
  },
  {
    id: 'css-form-styles',
    keywords: ['estilo formulario', 'input design', 'form css'],
    tags: ['frontend', 'formulario', 'design'],
    description: 'Estilos CSS para campos de formulário e botões.',
    code: `/* Estilos para Formulários */
form {
  font-family: 'Roboto', sans-serif;
}

label {
  display: block;
  margin-bottom: 8px;
  color: #444;
  font-weight: 500;
}

input[type="text"],
input[type="email"],
input[type="password"],
textarea {
  width: calc(100% - 24px); /* Ajusta para padding */
  padding: 12px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 6px;
  box-sizing: border-box;
  font-size: 1em;
  color: #333;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

input[type="text"]:focus,
input[type="email"]:focus,
input[type="password"]:focus,
textarea:focus {
  border-color: #007bff;
  box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.25);
  outline: none;
}

textarea {
  resize: vertical; /* Permite redimensionar verticalmente */
  min-height: 80px;
}

button[type="submit"] {
  background-color: #007bff;
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1.1em;
  font-weight: bold;
  transition: background-color 0.3s ease;
}

button[type="submit"]:hover {
  background-color: #0056b3;
}`,
    weight: 9,
    related: ['html-login-form', 'html-contact-form']
  },
  {
    id: 'css-navbar-responsive',
    keywords: ['navbar', 'menu responsivo', 'navegacao mobile', 'hamburguer'],
    tags: ['frontend', 'componente', 'responsividade'],
    description: 'CSS para uma barra de navegação responsiva com menu hamburguer.',
    code: `<style>
/* Base styles for desktop */
.navbar {
  background-color: #333;
  color: white;
  padding: 15px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.navbar-brand {
  font-size: 1.8em;
  font-weight: bold;
  color: white;
  text-decoration: none;
}

.navbar-nav {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
}

.nav-item {
  margin-left: 25px;
}

.nav-link {
  color: white;
  text-decoration: none;
  font-size: 1.1em;
  transition: color 0.3s ease;
}

.nav-link:hover {
  color: #007bff;
}

.menu-toggle {
  display: none; /* Esconde o ícone de toggle por padrão em desktop */
  cursor: pointer;
  font-size: 2em;
}

/* Mobile styles */
@media (max-width: 768px) {
  .navbar-nav {
    display: none; /* Esconde o menu em telas pequenas */
    flex-direction: column;
    width: 100%;
    position: absolute;
    top: 60px; /* Ajuste se o navbar tiver altura diferente */
    left: 0;
    background-color: #444;
    padding: 10px 0;
    box-shadow: 0 4px 8px rgba(0,0,0,0.2);
    z-index: 1000;
  }

  .navbar-nav.open {
    display: flex; /* Mostra o menu quando 'open' */
  }

  .nav-item {
    margin: 10px 20px;
    text-align: center;
  }

  .menu-toggle {
    display: block; /* Mostra o ícone de toggle em mobile */
  }
}
</style>

`,
    weight: 8,
    related: ['html-navigation-bar', 'javascript-toggle-class']
  },
  {
    id: 'css-card-shadow',
    keywords: ['sombra', 'card shadow', 'box-shadow'],
    tags: ['design', 'efeito'],
    description: 'Estilos para adicionar uma sombra suave a um card ou caixa.',
    code: `.card-shadow {
  background-color: white;
  border-radius: 8px;
  padding: 20px;
  margin: 15px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1), /* Sombra principal */
              0 8px 20px rgba(0, 0, 0, 0.05); /* Sombra mais difusa para profundidade */
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card-shadow:hover {
  transform: translateY(-5px); /* Efeito de levantar no hover */
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15),
              0 12px 30px rgba(0, 0, 0, 0.1);
}`,
    weight: 7,
    related: ['html-product-card']
  },
  {
    id: 'css-gradient-background',
    keywords: ['gradiente', 'background', 'fundo colorido'],
    tags: ['design', 'estilo'],
    description: 'Exemplo de como usar um gradiente linear para o fundo.',
    code: `body {
  background: linear-gradient(to right, #6a11cb 0%, #2575fc 100%); /* Exemplo de gradiente */
  color: white;
  min-height: 100vh; /* Garante que o gradiente preencha a tela */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}`,
    weight: 6
  },
  {
    id: 'css-custom-scrollbars',
    keywords: ['scrollbar', 'custom scroll', 'barra de rolagem'],
    tags: ['ui', 'estilo'],
    description: 'Estiliza a barra de rolagem para navegadores baseados em Webkit (Chrome, Safari).',
    code: `/* Para Webkit browsers (Chrome, Safari) */
::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
  background: #555;
}`,
    weight: 4
  }
];
