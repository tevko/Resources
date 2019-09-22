// const shell = require('shelljs');
// shell.exec('./check_dead.sh', function(code, stdout, stderr) {
//   console.log('Exit code:', code);
//   console.log('Program output:', stdout);
//   console.log('Program stderr:', stderr);
// });
const fs = require('fs');
const { execFile } = require('child_process');

let FILES;

fs.readdir('./', (err, files) => {
  if (err) console.log(err);

  FILES = files.filter(n => n.includes('.md'));
});

const child = execFile('./check_dead.sh', [], (error, stdout, stderr) => {
  if (error) {
    throw error;
  }
  console.log(stderr);
  
  stdout.split('\n').filter(Boolean).forEach(line => {
    FILES.forEach(file => {
      fs.readFile(`./${file}`, 'utf8', function (err,data) {
        if (err) {
          return console.log(err);
        }

        const result = data.split('\n').filter(l => l.includes(line) === false).join('\n,');
      
        fs.writeFile(`./${file}`, result, 'utf8', function (err) {
          if (err) return console.log(err);
        });
      });
    });
  });
});
