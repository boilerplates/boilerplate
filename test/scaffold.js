'use strict';

require('mocha');
var assert = require('assert');
var should = require('should');
var Scaffold = require('..');
var scaffold;

describe('scaffold', function () {
  describe('constructor:', function () {
    it('should return an instance of Scaffold:', function () {
      scaffold = new Scaffold({src: 'foo'});
      assert(scaffold instanceof Scaffold);
    });

    it('should instantiate without new:', function () {
      scaffold = Scaffold({src: 'foo'});
      assert(scaffold instanceof Scaffold);
    });

    it('should set options:', function () {
      var scaffold = new Scaffold({cwd: 'test/templates'});
      assert(scaffold.options.cwd === 'test/templates');
    });
  });

  describe('static methods:', function () {
    it('should expose `extend`:', function () {
      assert(typeof Scaffold.extend === 'function');
    });

    it('should extend an object with Scaffold methods', function () {
      function foo() {}
      Scaffold.extend(foo);
      assert(typeof foo.extend === 'function');
    });
  });

  describe('prototype methods:', function () {
    it('should expose `visit`:', function () {
      assert(typeof scaffold.visit === 'function');
    });
    it('should expose `get`:', function () {
      assert(typeof scaffold.get === 'function');
    });
    it('should expose `set`:', function () {
      assert(typeof scaffold.set === 'function');
    });
    it('should expose `use`:', function () {
      assert(typeof scaffold.use === 'function');
    });
  });

  describe('targets:', function () {
    it('should throw an error when config is not an object:', function () {
      (function () {
        scaffold.addTarget('foo', null);
      }).should.throw('expected config to be an object.');
      (function () {
        scaffold.addTarget('foo', 'foo');
      }).should.throw('expected config to be an object.');
      (function () {
        scaffold.addTarget('foo', function() {});
      }).should.throw('expected config to be an object.');
    });

    it('should create a scaffold target:', function () {
      var scaffold = new Scaffold();
      scaffold.addTarget('templates', {
        files: [{src: 'test/templates/*.txt', dest: 'src/'}]
      });
      assert(scaffold.targets.templates.files[0].src.length > 0);
    });

    it('should create a target from an instance of Scaffold:', function () {
      var scaffold = new Scaffold({
        files: [{src: 'test/templates/*.txt', dest: 'src/'}]
      });
      var scaffold = new Scaffold();
      scaffold.addTarget('a', scaffold);
      console.log(scaffold)
      assert(scaffold.targets.a.files[0].src.length > 0);
    });

    it('should throw an error when name is missing:', function () {
      (function () {
        scaffold.addTarget();
      }).should.throw('expected name to be a string.');
    });

    it('should throw an error when config is not an object:', function () {
      (function () {
        scaffold.addTarget('foo');
      }).should.throw('expected config to be an object.');
    });
  });
});
