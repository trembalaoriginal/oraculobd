// backend/codeLibrary/markdown.js
module.exports = [
  {
    id: 'md-headings',
    keywords: ['titulos', 'cabecalhos', 'headings'],
    tags: ['markdown', 'fundamentos'],
    description: 'Formatação de títulos em Markdown.',
    code: `# Título Nível 1
## Título Nível 2
### Título Nível 3
#### Título Nível 4
##### Título Nível 5
###### Título Nível 6

Isso também é um Título Nível 1
===========================

Isso também é um Título Nível 2
---------------------------`,
    weight: 9,
    related: ['md-text-formatting']
  },
  {
    id: 'md-text-formatting',
    keywords: ['negrito', 'italico', 'riscado', 'sublinhado', 'texto formatado'],
    tags: ['markdown', 'fundamentos'],
    description: 'Como formatar texto em negrito, itálico, riscado e sublinhado no Markdown.',
    code: `**Este texto está em negrito.** (preferencial)
__Este texto também está em negrito.__

*Este texto está em itálico.* (preferencial)
_Este texto também está em itálico._

***Este texto está em negrito e itálico.***
___Este texto também está em negrito e itálico.___

~~Este texto está riscado (strikethrough).~~

<ins>Este texto está sublinhado.</ins> (HTML inline)`
    ,
    weight: 10,
    related: ['md-lists']
  },
  {
    id: 'md-lists',
    keywords: ['lista', 'lista ordenada', 'lista nao ordenada', 'topicos'],
    tags: ['markdown', 'fundamentos'],
    description: 'Exemplos de listas ordenadas e não ordenadas em Markdown.',
    code: `### Lista Não Ordenada
- Item 1
  - Subitem 1.1
  - Subitem 1.2
    * Sub-subitem 1.2.1
- Item 2
  * Outro subitem

### Lista Ordenada
1. Primeiro item
2. Segundo item
   1. Subitem ordenado 2.1
   2. Subitem ordenado 2.2
3. Terceiro item

### Lista de Tarefas (Task List)
- [x] Tarefa Concluída
- [ ] Tarefa Pendente
- [ ] Outra Tarefa [com link](https://example.com)`,
    weight: 9,
    related: []
  },
  {
    id: 'md-code-blocks',
    keywords: ['codigo', 'bloco de codigo', 'highlight', 'sintaxe'],
    tags: ['markdown', 'desenvolvimento'],
    description: 'Como incluir blocos de código com ou sem destaque de sintaxe.',
    code: `\`código em linha\`

\`\`\`javascript
// Exemplo de código JavaScript
function greet(name) {
  console.log(\`Hello, \${name}!\`);
}
greet('World');
\`\`\`

\`\`\`python
# Exemplo de código Python
def factorial(n):
    if n == 0:
        return 1
    else:
        return n * factorial(n - 1)
print(factorial(5))
\`\`\`

\`\`\`
Este é um bloco de código sem destaque de sintaxe.
    Ele respeita a indentação.
\`\`\``,
    weight: 10,
    related: []
  },
  {
    id: 'md-links-images',
    keywords: ['link', 'imagem', 'hiperlink', 'figura'],
    tags: ['markdown', 'fundamentos'],
    description: 'Sintaxe para adicionar links e imagens em Markdown.',
    code: `[Texto do Link](https://www.example.com "Título opcional do link")

[Link com referência][1]

[1]: https://www.example.com/referencia "Link de Referência"

![Texto Alternativo da Imagem](https://via.placeholder.com/150 "Título Opcional da Imagem")

![Imagem com referência][2]

[2]: https://via.placeholder.com/200 "Imagem de Referência"`,
    weight: 9,
    related: ['html-link', 'html-image-example']
  },
  {
    id: 'md-tables',
    keywords: ['tabela', 'table markdown', 'colunas'],
    tags: ['markdown', 'dados'],
    description: 'Como criar tabelas em Markdown com alinhamento de colunas.',
    code: `| Cabeçalho Esquerda | Cabeçalho Centralizado | Cabeçalho Direita |
|:-------------------|:----------------------:|------------------:|
| Célula 1 Esquerda  | Célula 2 Centro        | Célula 3 Direita  |
| Célula A           | Célula B               | Célula C          |
| Célula X           | Célula Y               | Célula Z          |`,
    weight: 8,
    related: ['html-responsive-table']
  },
  {
    id: 'md-blockquote',
    keywords: ['citacao', 'blockquote', 'citar'],
    tags: ['markdown', 'texto'],
    description: 'Como usar citações de bloco em Markdown.',
    code: `> Esta é uma citação de bloco.
> Ela pode abranger múltiplas linhas.
>
> > Citações aninhadas também são possíveis.
> > - Item de lista dentro da citação
> > - Outro item

Isso é um parágrafo após a citação.`,
    weight: 6
  },
  {
    id: 'md-horizontal-rule',
    keywords: ['linha', 'divisor', 'hr', 'separador'],
    tags: ['markdown', 'estilo'],
    description: 'Como criar uma linha horizontal em Markdown para separar conteúdo.',
    code: `---
***
___

Acima estão três formas diferentes de criar uma linha horizontal.`,
    weight: 5
  }
];
