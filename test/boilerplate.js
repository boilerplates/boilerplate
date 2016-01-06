'use strict';

require('mocha');
var assert = require('assert');
var should = require('should');
var Scaffold = require('scaffold');
var Boilerplate = require('../');
var boilerplate;

describe('boilerplate', function() {
  describe('constructor', function() {
    it('should return an instance of Boilerplate', function() {
      boilerplate = new Boilerplate({src: 'foo'});
      assert(boilerplate instanceof Boilerplate);
    });

    it('should instantiate without new', function() {
      boilerplate = Boilerplate({src: 'foo'});
      assert(boilerplate instanceof Boilerplate);
    });

    it('should set options', function() {
      boilerplate = new Boilerplate({cwd: 'test/templates'});
      assert(boilerplate.options.cwd === 'test/templates');
    });
  });

  describe('static methods', function() {
    it('should expose `isBoilerplate`', function() {
      assert(typeof Boilerplate.isBoilerplate === 'function');
    });

    it('should return true if a value is an instance of boilerplate', function() {
      boilerplate = new Boilerplate();
      assert(Boilerplate.isBoilerplate(boilerplate));
    });

    it('should return false if a value is not an instance of boilerplate', function() {
      assert(!Boilerplate.isBoilerplate({}));
    });
  });

  describe('targets', function() {
    it('should throw an error when config is not an object', function() {
      (function() {
        boilerplate.addTarget('foo', null);
      }).should.throw('expected an object');
      (function() {
        boilerplate.addTarget('foo', 'foo');
      }).should.throw('expected an object');
      (function() {
        boilerplate.addTarget('foo', function() {});
      }).should.throw('expected an object');
    });

    it('should create a boilerplate target', function() {
      var boilerplate = new Boilerplate();
      boilerplate.addTarget('templates', {
        files: [{src: 'test/templates/*.txt', dest: 'src/'}]
      });
      assert(boilerplate.targets.templates.files[0].src.length > 0);
    });

    it('should create a target from an instance of Scaffold', function() {
      var scaffold = new Scaffold({
        files: [{src: 'test/templates/*.txt', dest: 'src/'}]
      });
      var boilerplate = new Boilerplate();
      boilerplate.addTarget('templates', scaffold);
      assert(boilerplate.targets.templates.files[0].src.length > 0);
    });

    it('should throw an error when name is missing', function() {
      (function() {
        boilerplate.addTarget();
      }).should.throw('expected a string');
    });

    it('should throw an error when config is not an object', function() {
      (function() {
        boilerplate.addTarget('foo');
      }).should.throw('expected an object');
    });
  });
});
