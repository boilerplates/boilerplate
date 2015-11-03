/*!
 * boilerplate <https://github.com/jonschlinkert/boilerplate>
 *
 * Copyright (c) 2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

var Base = require('base-methods');
var Files = require('expand-files');
var Target = require('expand-target');
var merge = require('mixin-deep');

/**
 * Create an instance of Boilerplate with the
 * given `options`
 *
 * ```js
 * var boilerplate = new Boilerplate({
 *   templates: {
 *     files: [{src: 'templates/*.hbs', dest: 'src/'}]
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
  Base.call(this);
  this.use(require('base-plugins'));
  this.use(require('base-options'));
  this.options = options || {};
  this.isBoilerplate = true;
  this.targets = {};
}

/**
 * Inherit `Base`
 */

Base.extend(Boilerplate);

/**
 * Register a boilerplate `target` with the given `name` and
 * configuration options. A target is just a way to organize
 * the files or content of a boilerplate into smaller groups.
 *
 * ```js
 * boilerplate.target('webapp', ...);
 * ```
 *
 * @param  {String} `name` The name of the target.
 * @param  {Object} `config` The configuration to use.
 * @return {Object}
 * @api public
 */

Boilerplate.prototype.addTarget = function(name, config) {
  if (typeof name !== 'string') {
    throw new TypeError('expected name to be a string.');
  }
  if (config == null || typeof config !== 'object') {
    throw new TypeError('expected config to be an object.');
  }

  Object.defineProperty(this.targets, name, {
    enumerable: true,
    get: function () {
      if (config.isTarget || config.isScaffold) {
        return config;
      }
      var target = new Target(this.options);
      target.expand(config);
      return target.cache;
    }
  });
  return this;
};

Boilerplate.prototype.getTarget = function(name) {
  return this.targets[name];
};

/**
 * Expose `Boilerplate`
 */

module.exports = Boilerplate;
