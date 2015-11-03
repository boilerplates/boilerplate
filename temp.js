'use strict';

var define = require('define-property');
var Files = require('expand-files');
var Base = require('base-methods');
var option = require('base-options');
var plugins = require('base-plugins');
var extend = require('extend-shallow');
var get = require('get-value');
var set = require('set-value');


/**
 * TODO:
 *  - unit tests: a file for each class
 *  - generate methods
 */


/**
 * Create an instance of Boilerplate with the given `options`
 */

function Boilerplate(options) {
  this.options = options || {};
  Base.call(this);
  this.use(option());
  this.use(plugins());
  this.defaultConfig();
}

Base.extend(Boilerplate);

Boilerplate.prototype.defaultConfig = function() {
  this.define('Scaffold', this.options.Scaffold || Scaffold);
  this.define('Target', this.options.Target || Target);
  this.define('isBoilerplate', true);
};

Boilerplate.prototype.addScaffold = function (name, config) {
  config = config || {};

  if (!config.isScaffold) {
    config = extend({}, this.options, config);
  }

  var Scaffold = config.Scaffold || this.get('Scaffold');
  var scaffold = {};

  if (config.isScaffold === true) {
    scaffold = config;

  } else {
    config.Target = config.Target || this.get('Target');
    scaffold = new Scaffold(config);
  }

  this.run(scaffold);

  // emit the scaffold
  this.emit('scaffold', name, scaffold);
  this.set(['scaffolds', name], scaffold);
  return scaffold;
};

Boilerplate.prototype.getScaffold = function(name) {
  return this.get(['scaffolds', name]);
};

Boilerplate.prototype.addTarget = function(scaffold, name, config) {
  if (typeof scaffold === 'string') {
    scaffold = this.getScaffold(scaffold);
  }
  return scaffold.addTarget(name, config);
};

Boilerplate.prototype.getTarget = function(scaffold, name) {
  if (typeof scaffold === 'string') {
    scaffold = this.getScaffold(scaffold);
  }
  return scaffold.getTarget(name);
};


/**
 * Create an instance of Scaffold with the given `options`
 */

function Scaffold(options) {
  this.options = options || {};
  Base.call(this);
  this.use(option());
  this.use(plugins());
  this.defaultConfig();
}

Base.extend(Scaffold);

Scaffold.prototype.defaultConfig = function() {
  this.define('Target', this.options.Target || Target);
  this.define('Files', this.options.Files || Files);
  this.define('isScaffold', true);
};

function isConfig(config) {
  if (config.src || config.dest || config.files) {
    return true;
  }
}

Scaffold.prototype.addTarget = function (name, config) {
  config = config || {};
  var options = {};

  if (!config.isTarget && !isConfig(config)) {
    options = extend({}, this.options, config);
    config = {};
  }

  var Target = options.Target || this.get('Target');
  var target = {};

  if (config.isTarget === true) {
    target = config;

  } else {
    var opts = extend({}, this.options, options);
    define(opts, 'Files', opts.Files || this.get('Files'));
    target = new Target(opts);
  }

  this.run(target);

  if (isConfig(config) && !config.isTarget) {
    target.addFiles(config);
  }

  // emit the target
  this.emit('target', name, target);
  this.set(['targets', name], target);
  return target;
};

Scaffold.prototype.getTarget = function(name) {
  return get(this.targets, name);
};


/**
 * Create an instance of Target with the given `options`
 */

function Target(options) {
  this.options = options || {};
  Base.call(this);
  this.use(option());
  this.use(plugins());
  this.defaultConfig();
}

Base.extend(Target);

Target.prototype.defaultConfig = function() {
  this.define('Files', this.options.Files || Files);
  this.define('isTarget', true);
};

Target.prototype.addFiles = function (config) {
  config = config || {};
  var Files = config.Files || this.get('Files');
  var files = {};

  if (config.isExpandFiles === true) {
    files = config;

  } else {
    var opts = extend({}, this.options, config.options);
    files = new Files(opts);
  }

  this.run(files);

  if (!config.isExpandFiles) {
    files.expand(config);
  }

  // emit the files
  this.emit('files', files);

  var val = this.get('cache');
  if (val.files) {
    val.files = val.files.concat(files.cache.files);
    extend(val.options, files.cache.options);
  } else {
    val = files.cache;
  }

  this.set('cache', val);
  return this;
};


/**
 * BOILERPLATES
 */


var bp = new Boilerplate();
bp.option('cwd', 'tmp')
  .addScaffold('b', {
    foo: {options: {cwd: 'test'}, src: '*.js', dest: 'site'},
    bar: {options: {cwd: 'test'}, src: '*.js', dest: 'site'}
  })
  .use(function fn(files) {
    console.log(files);
    return fn;
  })


/**
 * SCAFFOLDS
 */


scaffold
  .option('cwd', 'tmp')
  .addTarget('b', {options: {cwd: 'test'}, src: '*.js', dest: 'site'})
  .use(function fn(files) {
    console.log(files);
    return fn;
  })
  .addFiles({src: '*.js', dest: 'site'})
// console.log(scaffold.targets.b.cache.files)



/**
 * TARGETS
 */


target
  .addFiles()
  .use(function fn(files) {
    return fn;
  });



generage.file(config, function() {
  // do stuff
});

generage.process(config, function() {
  // do stuff
});

generage.target(config, function() {
  // do stuff
});

generage.scaffold(config, function() {
  // do stuff
});

generage.boilerplate(config, function() {
  // do stuff
});


// bp.target('foo')
//   .option('a', 'b')
//   .expand()
