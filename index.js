'use strict';

var utils = require('expand-utils');
var define = require('define-property');
var Target = require('expand-target');
var Scaffold = require('scaffold');
var use = require('use');

/**
 * Expand a declarative configuration with scaffolds and targets.
 * Create a new Boilerplate with the given `options`
 *
 * ```js
 * var boilerplate = new Boilerplate();
 *
 * // example usage
 * boilerplate.expand({
 *   jshint: {
 *     src: ['*.js', 'lib/*.js']
 *   }
 * });
 * ```
 * @param {Object} `options`
 * @api public
 */

function Boilerplate(options) {
  if (!(this instanceof Boilerplate)) {
    return new Boilerplate(options);
  }

  utils.is(this, 'boilerplate');
  use(this);

  define(this, 'count', 0);
  this.options = options || {};
  this.scaffolds = {};
  this.targets = {};

  if (utils.isConfig(options)) {
    this.options = {};
    this.expand(options);
    return this;
  }
}

/**
 * Static method, returns `true` if the given value is an
 * instance of `Boilerplate` or appears to be a valid `boilerplate`
 * configuration object.
 *
 * ```js
 * Boilerplate.isBoilerplate({});
 * //=> false
 *
 * var h5bp = new Boilerplate({
 *   options: {cwd: 'vendor/h5bp/dist'},
 *   root: {src: ['{.*,*.*}'], dest: 'src/'},
 *   // ...
 * });
 * Boilerplate.isBoilerplate(h5bp);
 * //=> true
 * ```
 * @static
 * @param {Object} `config` The value to check
 * @return {Boolean}
 * @api public
 */

Boilerplate.isBoilerplate = function(config) {
  if (!utils.isObject(config)) {
    return false;
  }
  if (config.isBoilerplate) {
    return true;
  }
  for (var key in config) {
    if (Scaffold.isScaffold(config[key])) {
      return true;
    }
  }
  return false;
};

/**
 * Expand and normalize a declarative configuration into scaffolds, targets,
 * and `options`.
 *
 * ```js
 * boilerplate.expand({
 *   options: {},
 *   marketing: {
 *     site: {
 *       mapDest: true,
 *       src: 'templates/*.hbs',
 *       dest: 'site/'
 *     },
 *     docs: {
 *       src: 'content/*.md',
 *       dest: 'site/'
 *     }
 *   },
 *   developer: {
 *     site: {
 *       mapDest: true,
 *       src: 'templates/*.hbs',
 *       dest: 'site/'
 *     },
 *     docs: {
 *       src: 'content/*.md',
 *       dest: 'site/docs/'
 *     }
 *   }
 * });
 * ```
 * @param {Object} `boilerplate` Boilerplate object with scaffolds and/or targets.
 * @return {Object}
 * @api public
 */

Boilerplate.prototype.expand = function(boilerplate) {
  // support anonymous targets
  if (utils.isTarget(boilerplate)) {
    this.addTarget('target' + (this.count++), boilerplate);
    return this;
  }

  for (var key in boilerplate) {
    if (boilerplate.hasOwnProperty(key)) {
      var val = boilerplate[key];

      if (Scaffold.isScaffold(val)) {
        this.addScaffold(key, val);

      } else if (utils.isTarget(val)) {
        this.addTarget(key, val);

      } else {
        this[key] = val;
      }
    }
  }
};

/**
 * Add a scaffold to the boilerplate, while also normalizing targets with
 * src-dest mappings and expanding glob patterns in each target.
 *
 * ```js
 * boilerplate.addScaffold('assemble', {
 *   site: {src: '*.hbs', dest: 'templates/'},
 *   docs: {src: '*.md', dest: 'content/'}
 * });
 * ```
 * @param {String} `name` the scaffold's name
 * @param {Object} `boilerplate` Scaffold object where each key is a target or `options`.
 * @return {Object}
 * @api public
 */

Boilerplate.prototype.addScaffold = function(name, boilerplate) {
  if (typeof name !== 'string') {
    throw new TypeError('expected a string');
  }

  var scaffold = new Scaffold(this.options);
  define(scaffold, 'name', name);

  utils.run(this, 'boilerplate', scaffold);
  scaffold.addTargets(boilerplate);

  this.scaffolds[name] = scaffold;
  return scaffold;
};

/**
 * Add a target to the boilerplate, while also normalizing src-dest mappings and
 * expanding glob patterns in the target.
 *
 * ```js
 * boilerplate.addTarget({src: '*.hbs', dest: 'templates/'});
 * ```
 * @param {String} `name` The target's name
 * @param {Object} `target` Target object with a `files` property, or `src` and optionally a `dest` property.
 * @return {Object}
 * @api public
 */

Boilerplate.prototype.addTarget = function(name, boilerplate) {
  if (typeof name !== 'string') {
    throw new TypeError('expected a string');
  }
  if (!utils.isObject(boilerplate)) {
    throw new TypeError('expected an object');
  }

  var target = new Target(this.options);
  define(target, 'name', name);

  utils.run(this, 'target', target);
  target.addFiles(boilerplate);

  this.targets[name] = target;
  return target;
};

/**
 * Expose `Boilerplate`
 */

module.exports = Boilerplate;
