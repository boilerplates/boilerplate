'use strict';

var Boilerplate = require('../..');
var h5bp = new Boilerplate({
  options: {
    cwd: 'src/dist'
  },
  root: {src: ['{.*,*.*}'],   dest: 'src/'},
  css:  {src: ['css/*.css'],  dest: 'src/'},
  doc:  {src: ['doc/*.md'],   dest: 'src/'},
  js:   {src: ['js/**/*.js'], dest: 'src/'}
});

console.log(h5bp.targets.root.files);
