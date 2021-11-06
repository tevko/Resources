import files from '../db/dictionary.js';

let loading = true;
const search_struct = {};

const promises = files.map(file => fetch(file));

await Promise.all(promises)
  .then(responses => Promise.all(responses.map(res => res.text())))
  .then(texts => texts.forEach(t => {
    const reg = /(?:##) (.+)/g;
    const title = reg.exec(t)[1];
    search_struct[title] = t.split(/\r?\n/);
  }));

loading = false;

console.log(search_struct, loading);
