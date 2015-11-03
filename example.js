// var path = require('path');
// var get = require('get-value');
// var set = require('set-value');
// // var Boilerplate = require('../');
// var inspect = require('stringify-object');
// var Target = require('expand-target');
// var Config = require('expand-config');


// function stringify(config) {
//   return inspect(config, {
//     singleQuotes: true,
//     indent: '  '
//   });
// }

// // var boilerplate = new Boilerplate();


// function Boilerplate(options) {
//   // Base.call(this);
//   this.options = options || {};
//   this.configs = {};
// }

// Boilerplate.prototype.get = function(key) {
//   return get(this.configs, key);
// };

// Boilerplate.prototype.option = function(key, value) {
//   set(this.options, key, value);
//   return this;
// };

// Boilerplate.prototype.target = function(name, config) {
//   this.targets[name] = new Target(config);
//   return this;
// };

// Boilerplate.prototype.scaffold = function(name, config) {
//   this.scaffolds[name] = new Scaffold(config);
//   return this;
// };

// Boilerplate.prototype.create = function(name, config) {
//   this.config[name] = new Config(config);
//   return this;
// };

// Boilerplate.prototype.expand = function(config, context) {
//   return expand(config, context);
// };

// var boilerplate = new Boilerplate();

// boilerplate.config('foo', {
//   templates: {
//     partials: {
//       src: ['docs/**/*.*']
//     }
//   }
// });

// // boilerplate.get('foo.templates')

// console.log(boilerplate.configs.foo.templates)
// console.log(boilerplate.get('foo.templates'))

// // var h5bp = new Boilerplate({
// //   options: {
// //     cwd: 'vendor/h5bp/dist'
// //   },
// //   templates: {
// //     partials: {
// //       options: {
// //         renameKey: function () {

// //         }
// //       },
// //       cwd: '',
// //       src: ['*.hbs']
// //     },
// //     partials: [],
// //   },
// //   root: {src: ['{.*,*.*}'], dest: 'src/'},
// //   css: {src: ['css/*.css'], dest: 'src/'},
// //   doc: {src: ['doc/*.md'], dest: 'src/'},
// //   js: {src: ['js/**/*.js'], dest: 'src/'}
// // });

// // console.log(stringify(h5bp))
