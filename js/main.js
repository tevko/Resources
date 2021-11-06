import files from '../db/dictionary.js';

const loading = true;
let search_struct;

const promises = files.map(file => fetch(file));

await Promise.all(promises)
  .then(responses => Promise.all(responses.map(res => res.text())))
  .then(texts => search_struct = texts.join('/n'));

loading = false;

console.log(search_struct, loading);
