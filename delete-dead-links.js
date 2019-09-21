const shell = require('shelljs');
shell.exec('./check_dead.sh', function(code, stdout, stderr) {
  console.log('Exit code:', code);
  console.log('Program output:', stdout);
  console.log('Program stderr:', stderr);
});
