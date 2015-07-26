/*!
 * boilerplate <https://github.com/jonschlinkert/boilerplate>
 *
 * Copyright (c) 2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

var util = require('util');
var extend = require('extend-shallow');
var inflect = require('inflection');
var utils = require('./lib/utils');

/**
 * Classes
 */

var Template = require('template');
var Scaffold = require('scaffold');

/**
 * Create an instance of Boilerplate with the
 * given `options`
 *
 * @param {Object} `options`
 * @api public
 */

function Boilerplate(options) {
  Template.call(this, options);
  this.defaultConfig();
}

/**
 * Extend Template's methods onto Boilerplate
 */

Template.extend(Boilerplate);

/**
 * Boilerplate prototype methods
 */

utils.delegate(Boilerplate.prototype, {
  constructor: Boilerplate,

  defaultConfig: function (opts) {
    this.create('files');
  },

  collection: function () {
    this.create.apply(this, arguments);
    return this;
  },

  scaffold: function (name, options, fn) {
    if (arguments.length === 1 && this[name].fn) {
      return this[name].fn(this[name]);
    }
    if (typeof options === 'function') {
      fn = options;
      options = {};
    }
    options = extend({}, this.options, options);
    this[name] = new Scaffold(options);
    if (fn) this[name].fn = fn;
    return this;
  },

  register: function(name, boilerplate) {
    this.boilerplates[name] = boilerplate;
    return this;
  },

  /**
   * Define a non-enumerable property on the instance.
   *
   * @param  {String} key The property name.
   * @param  {any} value Property value.
   * @return {Object} Returns the instance of `Boilerplate`, for chaining.
   * @api public
   */

  define: function (key, value) {
    utils.defineProp(this, key, value);
    return this;
  }
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
