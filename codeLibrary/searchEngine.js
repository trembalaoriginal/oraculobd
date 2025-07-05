// backend/searchEngine.js
const Fuse = require('fuse.js');

let searchIndex = [];
let fuse;

function initializeSearchIndex(codeLibraries) {
  searchIndex = [];
  const allSnippets = [];

  Object.keys(codeLibraries).forEach(lang => {
    if (Array.isArray(codeLibraries[lang])) {
      codeLibraries[lang].forEach(snippet => {
        allSnippets.push({
          ...snippet,
          language: lang,
          // Inclui 'tags' no texto pesquisável para busca semântica
          searchableText: `${lang} ${snippet.keywords.join(' ')} ${snippet.tags ? snippet.tags.join(' ') : ''} ${snippet.description}`.toLowerCase()
        });
      });
    }
  });

  // Prepara o Fuse.js para uma busca mais inteligente
  const fuseOptions = {
    keys: [
      { name: 'searchableText', weight: 0.8 },
      { name: 'language', weight: 0.5 },
      { name: 'description', weight: 0.3 },
      { name: 'keywords', weight: 0.7 }, // Palavras-chave têm peso alto
      { name: 'tags', weight: 0.6 }       // Tags também são importantes
    ],
    threshold: 0.3, // Ajuste para mais ou menos correspondências difusas
    ignoreLocation: true,
    includeScore: true,
    includeMatches: true,
    shouldSort: true
  };

  fuse = new Fuse(allSnippets, fuseOptions);
  console.log(`Motor de busca inicializado com ${allSnippets.length} snippets.`);
}

/**
 * Pesquisa snippets de código e gera sugestões.
 * @param {string} query O texto de busca do usuário.
 * @param {number} limit O número máximo de resultados a retornar.
 * @returns {Array} Uma lista de resultados de busca, incluindo o snippet e metadados.
 */
function search(query, limit = 5) {
  if (!fuse) {
    console.error("Motor de busca não inicializado!");
    return [];
  }

  const results = fuse.search(query);

  // Aplica um peso final baseado na 'weight' do snippet e no score do Fuse.js
  const weightedResults = results.map(result => ({
    ...result.item,
    // O score do Fuse é melhor quando menor. Invertemos o 'weight' do snippet
    // para que snippets com 'weight' maior (mais relevantes) tenham um score final menor.
    score: result.score * (1 - (result.item.weight || 0) / 20) // Normaliza weight para 0-1
  })).sort((a, b) => a.score - b.score); // Reordena pelo score final

  // Filtra resultados com score muito alto (pouca relevância)
  const filteredResults = weightedResults.filter(r => r.score < 0.7); // Ajuste este threshold conforme necessário

  return filteredResults.slice(0, limit);
}

/**
 * Gera sugestões de comandos relacionados com base nos resultados de busca.
 * @param {Array} searchResults Os resultados da busca Fuse.js.
 * @param {number} numSuggestions O número de sugestões a gerar.
 * @returns {Array<string>} Uma lista de comandos sugeridos.
 */
function generateSuggestions(searchResults, numSuggestions = 3) {
  const uniqueSuggestions = new Set();
  searchResults.forEach(result => {
    // Prioriza 'related' snippets, se existirem
    if (result.related && Array.isArray(result.related)) {
      result.related.forEach(relId => {
        const relatedSnippet = searchIndex.find(s => s.id === relId);
        if (relatedSnippet) {
          uniqueSuggestions.add(`${relatedSnippet.language} ${relatedSnippet.keywords[0]}`); // Usa a primeira keyword
        }
      });
    }
    // Adiciona outras keywords da mesma linguagem
    result.keywords.slice(0, 2).forEach(kw => { // Pega as 2 primeiras keywords
      uniqueSuggestions.add(`${result.language} ${kw}`);
    });
  });

  // Garante que não sugere o que já foi pesquisado (aproximadamente)
  // E limita o número de sugestões
  return Array.from(uniqueSuggestions).slice(0, numSuggestions);
}

module.exports = {
  initializeSearchIndex,
  search,
  generateSuggestions
};
