/*!
 * boilerplate <https://github.com/jonschlinkert/boilerplate>
 *
 * Copyright (c) 2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

var util = require('util');
var Base = require('base-methods');
var Files = require('expand-files');
var Target = require('expand-target');
var inflect = require('inflection');
var utils = require('./lib/utils');

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
  this.config = {};
}

Base.extend(Boilerplate);

/**
 * Boilerplate's prototype methods
 */

utils.delegate(Boilerplate.prototype, {
  constructor: Boilerplate,

  /**
   * Register a boilerplate with the given `name`.
   *
   * ```js
   * boilerplate.register('webapp', ...);
   * ```
   *
   * @param  {String} `name`
   * @param  {Object} `config`
   * @return {Object}
   * @api public
   */

  register: function(name, config) {
    this.config[name] = new Target(name, config);
    return this;
  },

  /**
   * Register a boilerplate with the given `name`.
   *
   * ```js
   * boilerplate.register('webapp', ...);
   * ```
   *
   * @param  {String} `name`
   * @param  {Object} `config`
   * @return {Object}
   * @api public
   */

  // register: function(name, config) {
  //   this.boilerplates[name] = config;
  //   return this;
  // }
});

/**
 * Static method for allowing other classes to inherit from
 * the `Boilerplate` class, and receive all of Boilerplate's prototype
 * methods.
 *
 * ```js
 * function MyBoilerplateApp(options) {...}
 * Boilerplate.extend(MyBoilerplateApp);
 * ```
 *
 * @param  {Object} `Ctor` Constructor function to extend with `Boilerplate`
 * @return {undefined}
 * @api public
 */

Boilerplate.extend = function(Ctor) {
  util.inherits(Ctor, Boilerplate);
};

/**
 * Expose `Boilerplate`
 */

module.exports = Boilerplate;
