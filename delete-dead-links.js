const fs = require('fs');
const { execFile } = require('child_process');

let FILES;

fs.readdir('./db', (err, files) => {
  if (err) console.log(err);

  FILES = files.filter(n => n.includes('.md'));
});

const child = execFile('./check_dead.sh', [], (error, stdout, stderr) => {
  if (error) {
    throw error;
  }
  console.log(stderr);
  
  FILES.forEach(file => {
    fs.readFile(`./${file}`, 'utf8', function (err,data) {
      if (err) {
        return console.log(err);
      }

      const result = data.split('\n').filter(l => {
        return stdout.includes(l) === false
      }).join('\n');

      fs.writeFile(`./${file}`, result, 'utf8', function (err) {
        if (err) return console.log(err);
      });
    });
  });
});
