var path = require('path');
var Boilerplate = require('../');
var boilerplate = new Boilerplate({
  options: {
    cwd: 'sandbox/boilerplate-webapp/root',
    expand: false,
  },
  a: 'b',
  c: {d: 'e'},
  scripts: {
    files: [{src: 'scripts/*.js', dest: 'src/'}]
  },
  styles: {
    files: [{src: 'styles/*.css', dest: 'src/'}]
  },
  templates: {
    files: [{src: 'templates/*.hbs', dest: 'src/'}]
  }
});

console.log(boilerplate)
