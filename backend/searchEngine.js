// backend/searchEngine.js
const Fuse = require('fuse.js');

let searchIndex = []; // O índice que será preenchido
let fuse; // Instância do Fuse.js

function initializeSearchIndex(codeLibraries) {
  searchIndex = [];
  Object.keys(codeLibraries).forEach(lang => {
    if (Array.isArray(codeLibraries[lang])) { // Garante que é um array de snippets
      codeLibraries[lang].forEach(snippet => {
        searchIndex.push({
          ...snippet,
          language: lang, // Adiciona a linguagem para categorização
          // Combina palavras-chave e descrição para o texto pesquisável
          searchableText: `${lang} ${snippet.keywords.join(' ')} ${snippet.description}`.toLowerCase()
        });
      });
    }
  });

  const fuseOptions = {
    keys: [
      { name: 'searchableText', weight: 0.8 }, // Principal campo de busca
      { name: 'language', weight: 0.5 },    // Importância da linguagem
      { name: 'description', weight: 0.3 }   // Descrição também ajuda
    ],
    threshold: 0.3, // Quão "difusa" a correspondência deve ser (0 = exato, 1 = qualquer coisa)
    ignoreLocation: true,
    includeScore: true, // Inclui a pontuação de relevância
    includeMatches: true, // Inclui onde a correspondência ocorreu
    shouldSort: true // Ordenar resultados por relevância
  };

  fuse = new Fuse(searchIndex, fuseOptions);
  console.log(`Motor de busca inicializado com ${searchIndex.length} snippets.`);
}

function search(query, limit = 5) {
  if (!fuse) {
    console.error("Motor de busca não inicializado!");
    return [];
  }
  const results = fuse.search(query);
  // Opcional: Adicionar um peso extra baseado no 'weight' do snippet
  const weightedResults = results.map(result => ({
    ...result.item,
    score: result.score * (1 - (result.item.weight || 0) / 100) // Quanto menor o score, melhor. Inverte o weight.
                                                             // Ou simplesmente adicione um valor ao score: result.score + (1 - (result.item.weight || 0) / 10)
  })).sort((a, b) => a.score - b.score); // Reordenar pelo novo score ponderado

  return weightedResults.slice(0, limit); // Retorna os N melhores resultados
}

module.exports = {
  initializeSearchIndex,
  search
};
