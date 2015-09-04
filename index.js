/*!
 * boilerplate <https://github.com/jonschlinkert/boilerplate>
 *
 * Copyright (c) 2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

var Base = require('base-methods');
var delegate = require('delegate-properties');
var Scaffold = require('scaffold');
var merge = require('mixin-deep');

/**
 * Create an instance of Boilerplate with the
 * given `options`
 *
 * ```js
 * var boilerplate = new Boilerplate();
 * ```
 * @param {Object} `options`
 * @api public
 */

function Boilerplate(config) {
  if (!config || typeof config !== 'object') {
    throw new TypeError('expected config to be an object.');
  }

  if (!(this instanceof Boilerplate)) {
    return new Boilerplate(config);
  }

  Base.call(this);
  // sift out options and non-target config values
  this.options = config.options || {};
  delete config.options;
  this.config = {};
  this.targets = {};

  for (var key in config) {
    var val = config[key];
    if (isTarget(val)) {
      this.scaffold(key, this.init(val, this.options));
    } else {
      this.config[key] = val;
    }
  }
}

Base.extend(Boilerplate);

/**
 * Boilerplate's prototype methods
 */

delegate(Boilerplate.prototype, {
  constructor: Boilerplate,

  init: function(config, options) {
    config.options = merge({}, options, config.options);
    return config;
  },

  /**
   * Register a boilerplate "target" with the given `name`. A
   * target is a semantically-grouped configuration of
   * files and directories.
   *
   * ```js
   * boilerplate.register('webapp', ...);
   * ```
   *
   * @param  {String} `name` The name of the config target.
   * @param  {Object} `config`
   * @return {Object}
   * @api public
   */

  scaffold: function(name, config) {
    if (typeof name !== 'string') {
      throw new TypeError('expected name to be a string.');
    }
    if (!config || typeof config !== 'object') {
      throw new TypeError('expected config to be an object.');
    }
    this.targets[name] = !(config instanceof Scaffold)
      ? new Scaffold(config)
      : config;
    return this;
  }
});

/**
 * Return `true` if an object has any of the given keys.
 *
 * @param {Object} `obj`
 * @param {Array} `keys`
 * @return {Boolean}
 */

function isTarget(val) {
  if (Array.isArray(val)) {
    return false;
  }
  if (typeof val !== 'object') {
    return false;
  }
  var keys = ['src', 'dest', 'files'];
  for (var key in val) {
    if (keys.indexOf(key) > -1) return true;
  }
  return false;
}

/**
 * Expose `Boilerplate`
 */

module.exports = Boilerplate;
