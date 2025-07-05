// backend/codeLibrary/html.js
module.exports = [
  {
    id: 'html-basic-structure',
    keywords: ['estrutura', 'boilerplate', 'basico', 'html5'],
    tags: ['web', 'fundamentos'],
    description: 'A estrutura básica de um documento HTML5.',
    code: `<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Documento Básico</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <header>
        <h1>Título do Site</h1>
    </header>
    <main>
        <p>Conteúdo principal da página.</p>
    </main>
    <footer>
        <p>&copy; 2025 Seu Nome</p>
    </footer>
    <script src="script.js"></script>
</body>
</html>`,
    weight: 10,
    related: ['css-reset', 'javascript-dom-manipulation']
  },
  {
    id: 'html-login-form',
    keywords: ['login', 'autenticacao', 'formulario', 'form', 'acesso'],
    tags: ['frontend', 'formulario', 'seguranca'],
    description: 'Um formulário HTML completo para login com campos de email e senha.',
    code: `<form action="/login" method="post" style="border:1px solid #ddd; padding:30px; border-radius:10px; max-width:450px; margin:40px auto; background-color:#fefefe; box-shadow:0 4px 12px rgba(0,0,0,0.1);">
  <h2 style="text-align:center; color:#333; margin-bottom:25px; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">Acessar Conta</h2>
  <div style="margin-bottom:20px;">
    <label for="email-login" style="display:block; margin-bottom:8px; font-weight:bold; color:#555;">Email:</label>
    <input type="email" id="email-login" name="email" required placeholder="seu.email@exemplo.com"
           style="width:calc(100% - 22px); padding:12px; border:1px solid #ccc; border-radius:6px; box-sizing:border-box; font-size:1em;">
  </div>
  <div style="margin-bottom:20px;">
    <label for="password-login" style="display:block; margin-bottom:8px; font-weight:bold; color:#555;">Senha:</label>
    <input type="password" id="password-login" name="password" required placeholder="********"
           style="width:calc(100% - 22px); padding:12px; border:1px solid #ccc; border-radius:6px; box-sizing:border-box; font-size:1em;">
  </div>
  <button type="submit"
          style="width:100%; background-color:#007bff; color:white; padding:15px 0; border:none; border-radius:6px; cursor:pointer; font-size:1.1em; font-weight:bold; transition:background-color 0.3s ease;">Entrar</button>
  <p style="font-size:0.9em; margin-top:20px; text-align:center;"><a href="#" style="color:#007bff; text-decoration:none;">Esqueceu a senha?</a></p>
  <p style="font-size:0.9em; text-align:center; margin-top:10px;">Não tem conta? <a href="#" style="color:#007bff; text-decoration:none;">Cadastre-se</a></p>
</form>`,
    weight: 9,
    related: ['css-form-styles', 'javascript-form-validation']
  },
  {
    id: 'html-product-card',
    keywords: ['card', 'produto', 'item', 'ecommerce', 'cartão'],
    tags: ['frontend', 'ecommerce', 'componente'],
    description: 'Um card de produto HTML com imagem, título, descrição, preço e botão.',
    code: `<div style="border: 1px solid #e0e0e0; border-radius: 10px; overflow: hidden; max-width: 300px; margin: 20px; box-shadow: 0 4px 15px rgba(0,0,0,0.1); background-color: white; text-align: center;">
  <img src="https://via.placeholder.com/300x200?text=Produto" alt="Nome do Produto" style="width: 100%; height: auto; display: block;">
  <div style="padding: 20px;">
    <h3 style="margin-top: 0; margin-bottom: 10px; color: #333;">Nome do Produto Incrível</h3>
    <p style="font-size: 0.9em; color: #666; margin-bottom: 15px;">Breve descrição do produto, destacando suas principais características.</p>
    <p style="font-size: 1.2em; color: #007bff; font-weight: bold; margin-bottom: 15px;">R$ 199,99</p>
    <button style="background-color: #28a745; color: white; padding: 12px 25px; border: none; border-radius: 5px; cursor: pointer; font-size: 1em; transition: background-color 0.3s ease;">Adicionar ao Carrinho</button>
  </div>
</div>`,
    weight: 8,
    related: ['css-product-card', 'javascript-add-to-cart']
  },
  {
    id: 'html-responsive-table',
    keywords: ['tabela', 'responsiva', 'dados', 'lista'],
    tags: ['frontend', 'responsividade', 'dados'],
    description: 'Uma tabela HTML que se adapta a diferentes tamanhos de tela.',
    code: `<style>
  table { width: 100%; border-collapse: collapse; margin: 20px 0; font-family: Arial, sans-serif; }
  th, td { border: 1px solid #ddd; padding: 12px; text-align: left; }
  th { background-color: #f2f2f2; color: #333; font-weight: bold; }
  tbody tr:nth-child(even) { background-color: #f9f9f9; }
  tbody tr:hover { background-color: #f1f1f1; }

  /* Media Queries para Responsividade */
  @media screen and (max-width: 768px) {
    table, thead, tbody, th, td, tr {
      display: block;
    }
    thead tr {
      position: absolute;
      top: -9999px;
      left: -9999px;
    }
    tr {
      border: 1px solid #ccc;
      margin-bottom: 15px;
      border-radius: 8px;
      overflow: hidden;
    }
    td {
      border: none;
      border-bottom: 1px solid #eee;
      position: relative;
      padding-left: 50%;
      text-align: right;
    }
    td:before {
      content: attr(data-label);
      position: absolute;
      left: 10px;
      width: 45%;
      padding-right: 10px;
      white-space: nowrap;
      text-align: left;
      font-weight: bold;
      color: #555;
    }
    td:last-child {
      border-bottom: 0;
    }
  }
</style>
<table>
  <thead>
    <tr>
      <th>ID do Pedido</th>
      <th>Cliente</th>
      <th>Produto</th>
      <th>Status</th>
      <th>Total</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-label="ID do Pedido">#1001</td>
      <td data-label="Cliente">João Silva</td>
      <td data-label="Produto">Teclado Mecânico</td>
      <td data-label="Status">Processando</td>
      <td data-label="Total">R$ 350,00</td>
    </tr>
    <tr>
      <td data-label="ID do Pedido">#1002</td>
      <td data-label="Cliente">Maria Souza</td>
      <td data-label="Produto">Monitor Curvo</td>
      <td data-label="Status">Enviado</td>
      <td data-label="Total">R$ 1200,00</td>
    </tr>
    <tr>
      <td data-label="ID do Pedido">#1003</td>
      <td data-label="Cliente">Pedro Santos</td>
      <td data-label="Produto">Câmera Web</td>
      <td data-label="Status">Entregue</td>
      <td data-label="Total">R$ 200,00</td>
    </tr>
  </tbody>
</table>`,
    weight: 9,
    related: ['css-responsive-layout']
  },
  {
    id: 'html-contact-form',
    keywords: ['formulario', 'contato', 'form', 'email', 'mensagem'],
    tags: ['frontend', 'formulario'],
    description: 'Um formulário de contato HTML com campos de nome, email e mensagem.',
    code: `<form action="/submit-contact" method="post" style="max-width: 600px; margin: 30px auto; padding: 40px; border: 1px solid #e0e0e0; border-radius: 12px; background-color: #ffffff; box-shadow: 0 6px 20px rgba(0,0,0,0.15);">
  <h2 style="text-align: center; color: #333; margin-bottom: 30px; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">Envie sua Mensagem</h2>
  <div style="margin-bottom: 25px;">
    <label for="contact-name" style="display: block; margin-bottom: 8px; font-weight: bold; color: #555;">Seu Nome:</label>
    <input type="text" id="contact-name" name="nome" required placeholder="Seu nome completo"
           style="width:calc(100% - 24px); padding:14px; border:1px solid #ccc; border-radius:7px; box-sizing:border-box; font-size:1.05em; transition: border-color 0.3s;">
  </div>
  <div style="margin-bottom: 25px;">
    <label for="contact-email" style="display: block; margin-bottom: 8px; font-weight: bold; color: #555;">Seu Email:</label>
    <input type="email" id="contact-email" name="email" required placeholder="seu.email@exemplo.com"
           style="width:calc(100% - 24px); padding:14px; border:1px solid #ccc; border-radius:7px; box-sizing:border-box; font-size:1.05em; transition: border-color 0.3s;">
  </div>
  <div style="margin-bottom: 30px;">
    <label for="contact-message" style="display: block; margin-bottom: 8px; font-weight: bold; color: #555;">Mensagem:</label>
    <textarea id="contact-message" name="mensagem" rows="6" required placeholder="Escreva sua mensagem aqui..."
              style="width:calc(100% - 24px); padding:14px; border:1px solid #ccc; border-radius:7px; resize:vertical; box-sizing:border-box; font-size:1.05em; transition: border-color 0.3s;"></textarea>
  </div>
  <button type="submit"
          style="width:100%; background-color: #28a745; color: white; padding:18px 0; border:none; border-radius:8px; cursor:pointer; font-size:1.2em; font-weight:bold; transition:background-color 0.3s ease, transform 0.2s ease;">Enviar Mensagem</button>
</form>`,
    weight: 8,
    related: ['javascript-form-validation', 'css-form-styles']
  },
  {
    id: 'html-navigation-bar',
    keywords: ['navegacao', 'menu', 'navbar', 'links'],
    tags: ['frontend', 'componente', 'layout'],
    description: 'Uma barra de navegação HTML básica com links.',
    code: `<nav style="background-color: #333; padding: 15px 20px; color: white; display: flex; justify-content: space-between; align-items: center;">
  <a href="/" style="color: white; text-decoration: none; font-size: 1.5em; font-weight: bold;">Meu Logo</a>
  <ul style="list-style: none; margin: 0; padding: 0; display: flex;">
    <li style="margin-left: 20px;"><a href="/home" style="color: white; text-decoration: none; font-size: 1.1em; transition: color 0.3s;">Home</a></li>
    <li style="margin-left: 20px;"><a href="/servicos" style="color: white; text-decoration: none; font-size: 1.1em; transition: color 0.3s;">Serviços</a></li>
    <li style="margin-left: 20px;"><a href="/sobre" style="color: white; text-decoration: none; font-size: 1.1em; transition: color 0.3s;">Sobre</a></li>
    <li style="margin-left: 20px;"><a href="/contato" style="color: white; text-decoration: none; font-size: 1.1em; transition: color 0.3s;">Contato</a></li>
  </ul>
</nav>`,
    weight: 7,
    related: ['css-navbar-responsive']
  },
  {
    id: 'html-footer',
    keywords: ['rodape', 'footer', 'direitos autorais'],
    tags: ['frontend', 'layout'],
    description: 'Um rodapé HTML simples com informações de direitos autorais.',
    code: `<footer style="background-color: #222; color: #bbb; padding: 25px; text-align: center; font-size: 0.9em; margin-top: 40px;">
  <p>&copy; 2025 Nome da Sua Empresa. Todos os direitos reservados.</p>
  <div style="margin-top: 10px;">
    <a href="/politica-privacidade" style="color: #bbb; text-decoration: none; margin: 0 10px; transition: color 0.3s;">Política de Privacidade</a> |
    <a href="/termos-servico" style="color: #bbb; text-decoration: none; margin: 0 10px; transition: color 0.3s;">Termos de Serviço</a>
  </div>
</footer>`,
    weight: 6
  },
  {
    id: 'html-video-embed',
    keywords: ['video', 'embed', 'player', 'midia'],
    tags: ['multimidia', 'frontend'],
    description: 'Como incorporar um vídeo HTML5 com controles básicos.',
    code: `<video width="640" height="360" controls muted autoplay loop style="max-width: 100%; height: auto; border-radius: 8px; box-shadow: 0 4px 10px rgba(0,0,0,0.2);">
  <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4">
  <source src="https://www.w3schools.com/html/mov_bbb.ogg" type="video/ogg">
  Seu navegador não suporta a tag de vídeo.
</video>`,
    weight: 5
  },
  {
    id: 'html-audio-embed',
    keywords: ['audio', 'mp3', 'player', 'midia'],
    tags: ['multimidia', 'frontend'],
    description: 'Como incorporar um arquivo de áudio HTML5 com controles.',
    code: `<audio controls style="width: 100%; max-width: 400px; margin: 20px auto; display: block;">
  <source src="https://www.w3schools.com/html/horse.mp3" type="audio/mpeg">
  Seu navegador não suporta o elemento de áudio.
</audio>`,
    weight: 3
  },
  {
    id: 'html-semantic-elements',
    keywords: ['semantico', 'header', 'main', 'footer', 'article', 'section', 'aside', 'nav'],
    tags: ['web', 'seo', 'estrutura'],
    description: 'Exemplo de uso de elementos HTML semânticos para melhor estrutura e SEO.',
    code: `<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Página Semântica</title>
</head>
<body>
    <header role="banner">
        <h1>Meu Blog de Tecnologia</h1>
        <nav role="navigation">
            <ul>
                <li><a href="#artigos">Artigos</a></li>
                <li><a href="#sobre">Sobre</a></li>
                <li><a href="#contato">Contato</a></li>
            </ul>
        </nav>
    </header>

    <main role="main">
        <article id="artigos" aria-labelledby="article-heading">
            <h2 id="article-heading">Título do Artigo Interessante</h2>
            <p>Este é o conteúdo do seu artigo.</p>
            <section aria-labelledby="comments-heading">
                <h3 id="comments-heading">Comentários</h3>
                </section>
        </article>
    </main>

    <aside role="complementary">
        <h3>Tópicos Relacionados</h3>
        <ul>
            <li>Item 1</li>
            <li>Item 2</li>
        </ul>
    </aside>

    <footer role="contentinfo">
        <p>&copy; 2025 Blog Tech. Todos os direitos reservados.</p>
    </footer>
</body>
</html>`,
    weight: 7
  },
  {
    id: 'html-iframe-embed',
    keywords: ['iframe', 'incorporar', 'conteudo externo'],
    tags: ['web', 'embed'],
    description: 'Como incorporar conteúdo externo usando um iframe (ex: Google Maps).',
    code: `<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.0000000000000!2d-38.50000000000000!3d-12.97000000000000!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTPCsDQ5JzAxLjEiUyAzOMKwMzAnNDIuMyJX!5e0!3m2!1sen!2sbr!4v1678912345678!5m2!1sen!2sbr"
        width="600" height="450" style="border:0; max-width: 100%;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>`,
    weight: 4
  }
];
