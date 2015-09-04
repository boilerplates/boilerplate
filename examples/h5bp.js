var path = require('path');
var Boilerplate = require('../');
var inspect = require('stringify-object');


function stringify(config) {
  return inspect(config, {
    singleQuotes: true,
    indent: '  '
  });
}

var h5bp = new Boilerplate({
  options: {
    cwd: 'vendor/h5bp/dist'
  },
  root: {src: ['{.*,*.*}'], dest: 'src/'},
  css: {src: ['css/*.css'], dest: 'src/'},
  doc: {src: ['doc/*.md'], dest: 'src/'},
  js: {src: ['js/**/*.js'], dest: 'src/'}
});

console.log(stringify(h5bp))
