var path = require('path');
var Boilerplate = require('../');
var boilerplate = new Boilerplate({
  cwd: 'sandbox/boilerplate-webapp/root',
  expand: false,
});

boilerplate.register('root', {
  src: ['*']
});

boilerplate.register('binary', {
  src: ['*']
});

boilerplate.register('dotfiles', {
  src: ['*']
});

console.log(boilerplate.targets.root.files)
console.log(boilerplate.targets.binary.files)
console.log(boilerplate.targets.dotfiles.files)
