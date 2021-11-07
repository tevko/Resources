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
  }, 800);
};

const search = (val) => () => {
  let resultsPage = '';
  search_dict.forEach(key => {
    if (key.indexOf(val) !== -1) {
      // search is for broad term, include whole page
      resultsPage += search_struct[key].join('\n')
    } else {
      const arr = search_struct[key];
      const found = arr.find(e => e.indexOf(val) !== -1);
      if (found) resultsPage += `${found} \n`;
    }
  });
  console.log(resultsPage)
};

document.querySelector('input').addEventListener('input', e => {
  debounce(search(e.target.value));
});
