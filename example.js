'use strict';

var fs = require('fs');
var glob = require('glob');
var path = require('path');
var extend = require('extend-shallow');
var Boilerplate = require('./');
var boilerplate = new Boilerplate();


boilerplate.scaffold('webapp', {cwd: 'fixtures/boilerplate-webapp'});
boilerplate.webapp.create('dotfiles');
boilerplate.webapp.dotfiles('dotfiles/*');

boilerplate.webapp.create('root');
boilerplate.webapp.root('root/*');

boilerplate.webapp.create('copy');
boilerplate.webapp.copy('copy/*');

// var opts = {cwd: 'fixtures/boilerplate-webapp'};
// boilerplate.scaffold('webapp', opts, function (scaffold) {
//   scaffold.create('dotfiles');
//   scaffold.dotfiles('dotfiles/*');

//   scaffold.create('root');
//   scaffold.root('root/*');

//   scaffold.create('copy');
//   scaffold.copy('copy/*');
// });

// boilerplate.scaffold('webapp');
console.log(boilerplate);

