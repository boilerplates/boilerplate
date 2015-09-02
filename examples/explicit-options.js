var Boilerplate = require('../');
var boilerplate = new Boilerplate({expand: false});

/**
 * Options are explicitly defined on each target
 */

boilerplate.register('root', {
  options: {cwd: 'sandbox/boilerplate-webapp/root'},
  src: ['*.*']
});

boilerplate.register('copy', {
  options: {cwd: 'sandbox/boilerplate-webapp/copy'},
  src: ['*.*']
});

boilerplate.register('dotfiles', {
  options: {cwd: 'sandbox/boilerplate-webapp/dotfiles'},
  src: ['*'],
  dest: 'foo/bar'
});

console.log(boilerplate.targets.dotfiles.files)
