/*!
 * boilerplate <https://github.com/jonschlinkert/boilerplate>
 *
 * Copyright (c) 2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

var Base = require('base-methods');
var delegate = require('delegate-properties');
var toPath = require('to-object-path');
var Target = require('expand-target');
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

function Boilerplate(options) {
  if (!(this instanceof Boilerplate)) {
    return new Boilerplate(options);
  }
  Base.call(this);
  this.options = options || {};
  this.targets = {};
}
Base.extend(Boilerplate);

/**
 * Boilerplate's prototype methods
 */

delegate(Boilerplate.prototype, {
  constructor: Boilerplate,

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

  register: function(name, config) {
    this.targets[name] = new Target(name, this.defaults(config));
    return this;
  },

  /**
   * Set or get an option to be used as a default value
   * when registering boilerplate targets. Pass a key-value
   * pair or an object to set a value, or the key of
   * the value to get.
   *
   * ```js
   * boilerplate.option('cwd', 'templates/');
   * ``
   * @param {String|Object|Array} `key`
   * @param {any} `value`
   * @return {Object} Returns the instance of Boilerplate for chaining
   */

  option: function(key, value) {
    if (typeof key === 'string') {
      key = toPath('options', key);
      if (arguments.length === 1) {
        return this.get(key, value);
      }
    } else {
      this.visit('option', key);
      return this;
    }
    this.set(key, value);
    return this;
  },

  /**
   * Set default values on targets.
   */

  defaults: function(config) {
    config.options = merge({expand: true}, this.options, config.options);
    return config;
  }
});

/**
 * Expose `Boilerplate`
 */

module.exports = Boilerplate;
