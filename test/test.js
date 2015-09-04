'use strict';

/* deps: mocha */
var assert = require('assert');
var should = require('should');
var Scaffold = require('scaffold');
var Boilerplate = require('../');
var boilerplate;

describe('boilerplate', function () {
  describe('constructor:', function () {
    it('should throw an error when config is not an object:', function () {
      (function () {
        new Boilerplate();
      }).should.throw('expected config to be an object.');
    });

    it('should return an instance of Boilerplate:', function () {
      boilerplate = new Boilerplate({src: 'foo'});
      assert(boilerplate instanceof Boilerplate);
    });

    it('should return an instance of Boilerplate without new:', function () {
      boilerplate = Boilerplate({src: 'foo'});
      assert(boilerplate instanceof Boilerplate);
    });
  });

  describe('static methods:', function () {
    it('should expose `extend`:', function () {
      assert(typeof Boilerplate.extend === 'function');
    });
    it('should extend an object:', function () {
      function foo() {}
      Boilerplate.extend(foo);
      assert(typeof foo.extend === 'function');
    });
  });

  describe('prototype methods:', function () {
    it('should expose `visit`:', function () {
      assert(typeof boilerplate.visit === 'function');
    });
    it('should expose `get`:', function () {
      assert(typeof boilerplate.get === 'function');
    });
    it('should expose `set`:', function () {
      assert(typeof boilerplate.set === 'function');
    });
    it('should expose `target`:', function () {
      assert(typeof boilerplate.target === 'function');
    });
  });

  describe('instance:', function () {
    it('should create a boilerplate:', function () {
      var boilerplate = new Boilerplate({
        templates: {
          files: [{src: 'test/templates/*.txt', dest: 'src/'}]
        }
      });
      assert(boilerplate.targets.templates.files[0].src.length > 0);
    });

    it('should create a boilerplate target from an instance of Scaffold:', function () {
      var boilerplate = new Boilerplate({
        templates: new Scaffold({
          files: [{src: 'test/templates/*.txt', dest: 'src/'}]
        })
      });
      assert(boilerplate.targets.templates.files[0].src.length > 0);
    });

    it('should add options to instance options:', function () {
      var boilerplate = new Boilerplate({
        options: {cwd: 'test/templates'},
        templates: {
          files: [{src: '*.txt', dest: 'src/'}]
        }
      });
      assert(boilerplate.options.cwd === 'test/templates');
    });

    it('should add arbitrary config values to `config`:', function () {
      var boilerplate = new Boilerplate({
        options: {cwd: 'test/templates'},
        a: 'b',
        c: {d: 'e'},
        f: ['g'],
        templates: {
          files: [{src: '*.txt', dest: 'src/'}]
        }
      });
      assert(boilerplate.config.a === 'b');
      assert(boilerplate.config.c.d === 'e');
      assert(boilerplate.config.f[0] === 'g');
    });

    it('should throw an error when config is not an object:', function () {
      (function () {
        boilerplate.target('foo', null);
      }).should.throw('expected config to be an object.');
      (function () {
        boilerplate.target('foo', 'foo');
      }).should.throw('expected config to be an object.');
      (function () {
        boilerplate.target('foo', function() {});
      }).should.throw('expected config to be an object.');
    });
  });

  describe('targets:', function () {
    it('should throw an error when name is missing:', function () {
      (function () {
        boilerplate.target();
      }).should.throw('expected name to be a string.');
    });

    it('should throw an error when config is not an object:', function () {
      (function () {
        boilerplate.target('foo');
      }).should.throw('expected config to be an object.');
    });
  });
});
