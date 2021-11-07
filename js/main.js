import files from '../db/dictionary.js';

const search_struct = {};

const promises = files.map(file => fetch(file));

await Promise.all(promises)
  .then(responses => Promise.all(responses.map(res => res.text())))
  .then(texts => texts.forEach(t => {
    const reg = /(?:##) (.+)/g;
    const title = reg.exec(t)[1];
    const arr = t.split(/\r?\n/);
    delete arr[0]; //remove title
    search_struct[title] = arr.filter(Boolean);
  }));

const search_dict = Object.keys(search_struct);

const debounce = cb => {
  clearTimeout(window.CURRENT_SEARCH_REQUEST);
  window.CURRENT_SEARCH_REQUEST = setTimeout(() => {
    cb();
  }, 250);
};

const search = () => console.log('running');

document.querySelector('input').addEventListener('input', e => {
  debounce(search(e.target.value));
});
