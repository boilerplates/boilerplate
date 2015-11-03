'use strict';

require('mocha');
var assert = require('assert');
var should = require('should');
var Target = require('../');
var target;

describe('target', function () {
  describe('constructor:', function () {
    it('should return an instance of Target:', function () {
      target = new Target({src: 'foo'});
      assert(target instanceof Target);
    });

    it('should instantiate without new:', function () {
      target = Target({src: 'foo'});
      assert(target instanceof Target);
    });

    it('should set options:', function () {
      var target = new Target({cwd: 'test/templates'});
      assert(target.options.cwd === 'test/templates');
    });
  });

  describe('static methods:', function () {
    it('should expose `extend`:', function () {
      assert(typeof Target.extend === 'function');
    });

    it('should extend an object with Target methods', function () {
      function foo() {}
      Target.extend(foo);
      assert(typeof foo.extend === 'function');
    });
  });

  describe('prototype methods:', function () {
    it('should expose `visit`:', function () {
      assert(typeof target.visit === 'function');
    });
    it('should expose `get`:', function () {
      assert(typeof target.get === 'function');
    });
    it('should expose `set`:', function () {
      assert(typeof target.set === 'function');
    });
    it('should expose `use`:', function () {
      assert(typeof target.use === 'function');
    });
  });

  describe('targets:', function () {
    it('should throw an error when config is not an object:', function () {
      (function () {
        target.addTarget('foo', null);
      }).should.throw('expected config to be an object.');
      (function () {
        target.addTarget('foo', 'foo');
      }).should.throw('expected config to be an object.');
      (function () {
        target.addTarget('foo', function() {});
      }).should.throw('expected config to be an object.');
    });

    it('should create a target target:', function () {
      var target = new Target();
      target.addTarget('templates', {
        files: [{src: 'test/templates/*.txt', dest: 'src/'}]
      });
      assert(target.targets.templates.files[0].src.length > 0);
    });

    it('should create a target from an instance of Scaffold:', function () {
      var scaffold = new Scaffold({
        files: [{src: 'test/templates/*.txt', dest: 'src/'}]
      });
      var target = new Target();
      target.addTarget('templates', scaffold);
      console.log(target)
      assert(target.targets.templates.files[0].src.length > 0);
    });

    it('should throw an error when name is missing:', function () {
      (function () {
        target.addTarget();
      }).should.throw('expected name to be a string.');
    });

    it('should throw an error when config is not an object:', function () {
      (function () {
        target.addTarget('foo');
      }).should.throw('expected config to be an object.');
    });
  });
});
