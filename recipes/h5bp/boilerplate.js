'use strict';

var util = require('util');
var Boilerplate = require('../..');
var h5bp = new Boilerplate({
  options: {
    cwd: 'vendor/dist'
  },
  root: {src: ['{.*,*.*}'],   dest: 'src/'},
  css:  {src: ['css/*.css'],  dest: 'src/'},
  doc:  {src: ['doc/*.md'],   dest: 'src/'},
  js:   {src: ['js/**/*.js'], dest: 'src/'}
});
console.log(util.inspect(h5bp.scaffolds, null, 10));

// var h5bp = new Boilerplate({
//   dist: {
//     options: {
//       cwd: 'vendor/dist'
//     },
//     root: {src: ['{.*,*.*}'],   dest: 'src/'},
//     css:  {src: ['css/*.css'],  dest: 'src/'},
//     doc:  {src: ['doc/*.md'],   dest: 'src/'},
//     js:   {src: ['js/**/*.js'], dest: 'src/'}
//   }
// });

// console.log(util.inspect(h5bp.scaffolds.dist.targets, null, 10));
