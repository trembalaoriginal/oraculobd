// backend/searchEngine.js
const Fuse = require('fuse.js');

let searchIndex = [];
let fuse;

/**
 * Inicializa o índice de busca com todos os snippets de código das bibliotecas.
 * Deve ser chamado UMA VEZ na inicialização do servidor.
 * @param {Object} codeLibraries Um objeto contendo todas as bibliotecas de código (ex: {html: [...], css: [...]}).
 */
function initializeSearchIndex(codeLibraries) {
  searchIndex = []; // Limpa o índice existente, se houver
  const allSnippets = [];

  Object.keys(codeLibraries).forEach(lang => {
    // Garante que a propriedade é um array e não está vazia
    if (Array.isArray(codeLibraries[lang]) && codeLibraries[lang].length > 0) {
      codeLibraries[lang].forEach(snippet => {
        allSnippets.push({
          ...snippet,
          language: lang, // Adiciona a linguagem para categorização
          // Combina palavras-chave, tags e descrição para o texto pesquisável
          searchableText: `${lang} ${snippet.keywords.join(' ')} ${snippet.tags ? snippet.tags.join(' ') : ''} ${snippet.description}`.toLowerCase()
        });
      });
    }
  });

  // Prepara o Fuse.js para uma busca mais inteligente e difusa
  const fuseOptions = {
    keys: [
      { name: 'searchableText', weight: 0.8 }, // Principal campo de busca
      { name: 'language', weight: 0.5 },    // Importância da linguagem
      { name: 'description', weight: 0.3 },   // Descrição também ajuda
      { name: 'keywords', weight: 0.7 },     // Palavras-chave têm peso alto
      { name: 'tags', weight: 0.6 }          // Tags também são importantes
    ],
    threshold: 0.3, // Quão "difusa" a correspondência deve ser (0 = exato, 1 = qualquer coisa)
    ignoreLocation: true, // Ignora a posição da correspondência
    includeScore: true, // Inclui a pontuação de relevância (menor é melhor)
    includeMatches: true, // Inclui onde a correspondência ocorreu
    shouldSort: true // Ordenar resultados por relevância
  };

  fuse = new Fuse(allSnippets, fuseOptions);
  console.log(`Motor de busca inicializado com ${allSnippets.length} snippets.`);
}

/**
 * Pesquisa snippets de código com base em uma query.
 * @param {string} query O texto de busca do usuário.
 * @param {number} limit O número máximo de resultados a retornar.
 * @returns {Array} Uma lista de resultados de busca, incluindo o snippet e metadados.
 */
function search(query, limit = 5) {
  if (!fuse) {
    console.error("Motor de busca não inicializado! Chame initializeSearchIndex primeiro.");
    return [];
  }
  const results = fuse.search(query);

  // Aplica um peso final baseado na 'weight' do snippet e no score do Fuse.js
  const weightedResults = results.map(result => ({
    ...result.item,
    // O score do Fuse é melhor quando menor. Invertemos o 'weight' do snippet
    // para que snippets com 'weight' maior (mais relevantes) tenham um score final menor.
    // O 'weight' do snippet é de 1 a 10, normalizamos para 0-1 e subtraímos de 1.
    // Ex: weight 10 -> (1 - 10/20) = 0.5; weight 1 -> (1 - 1/20) = 0.95
    score: result.score * (1 - (result.item.weight || 0) / 20)
  })).sort((a, b) => a.score - b.score); // Reordenar pelo novo score ponderado (menor é melhor)

  // Filtra resultados com score muito alto (pouca relevância percebida)
  const filteredResults = weightedResults.filter(r => r.score < 0.7); // Ajuste este threshold conforme necessário

  return filteredResults.slice(0, limit); // Retorna os N melhores resultados
}

/**
 * Gera sugestões de comandos relacionados com base nos resultados de busca.
 * @param {Array} searchResults Os resultados da busca Fuse.js.
 * @param {number} numSuggestions O número de sugestões a gerar.
 * @returns {Array<string>} Uma lista de comandos sugeridos.
 */
function generateSuggestions(searchResults, numSuggestions = 3) {
  const uniqueSuggestions = new Set();
  const processedSnippetIds = new Set(); // Para evitar sugestões duplicadas do mesmo snippet

  searchResults.forEach(result => {
    if (processedSnippetIds.has(result.id)) {
      return; // Já processamos este snippet
    }
    processedSnippetIds.add(result.id);

    // 1. Prioriza 'related' snippets, se existirem
    if (result.related && Array.isArray(result.related)) {
      result.related.forEach(relId => {
        const relatedSnippet = searchIndex.find(s => s.id === relId);
        if (relatedSnippet && !processedSnippetIds.has(relatedSnippet.id)) {
          // Usa a primeira keyword ou a descrição se não houver keywords
          const suggestionText = relatedSnippet.keywords.length > 0
            ? `${relatedSnippet.language} ${relatedSnippet.keywords[0]}`
            : `${relatedSnippet.language} ${relatedSnippet.description.split(' ')[0]}`; // Primeira palavra da descrição
          uniqueSuggestions.add(suggestionText);
          processedSnippetIds.add(relatedSnippet.id); // Marca como processado para evitar duplicação
        }
      });
    }

    // 2. Adiciona outras keywords da mesma linguagem (se ainda não tivermos sugestões suficientes)
    if (uniqueSuggestions.size < numSuggestions) {
      result.keywords.slice(0, 2).forEach(kw => { // Pega as 2 primeiras keywords
        const suggestionText = `${result.language} ${kw}`;
        uniqueSuggestions.add(suggestionText);
      });
    }

    // 3. Adiciona sugestões baseadas em tags (se ainda não tivermos sugestões suficientes)
    if (uniqueSuggestions.size < numSuggestions && result.tags && Array.isArray(result.tags)) {
        result.tags.forEach(tag => {
            // Busca outros snippets com a mesma tag
            const tagRelatedSnippets = searchIndex.filter(s => s.tags && s.tags.includes(tag) && s.id !== result.id);
            tagRelatedSnippets.slice(0, 1).forEach(srs => { // Pega apenas 1 por tag para não sobrecarregar
                const suggestionText = srs.keywords.length > 0
                    ? `${srs.language} ${srs.keywords[0]}`
                    : `${srs.language} ${srs.description.split(' ')[0]}`;
                uniqueSuggestions.add(suggestionText);
            });
        });
    }
  });

  // Garante que não sugere o que já foi pesquisado (aproximadamente)
  // E limita o número de sugestões
  return Array.from(uniqueSuggestions).slice(0, numSuggestions);
}

// Exporta as funções para que outros módulos (como server.js) possam usá-las
module.exports = {
  initializeSearchIndex,
  search,
  generateSuggestions
};
