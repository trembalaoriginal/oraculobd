// backend/codeLibrary/index.js
const html = require('./html');
const css = require('./css');
const javascript = require('./javascript');
const react = require('./react');
const python = require('./python');
const sql = require('./sql');
const docker = require('./docker');
const git = require('./git');
const bash = require('./bash');
const markdown = require('./markdown');
const json = require('./json');
const webassembly = require('./webassembly');

module.exports = {
  html,
  css,
  javascript,
  js: javascript,
  react,
  python,
  sql,
  docker,
  git,
  bash,
  shell: bash,
  md: markdown,
  markdown,
  json,
  webassembly,
  wasm: webassembly
};
