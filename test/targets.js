'use strict';

require('mocha');
require('should');
var util = require('util');
var assert = require('assert');
var Boilerplate = require('..');
var boilerplate;

describe('targets', function() {
  beforeEach(function() {
    boilerplate = new Boilerplate();
  });

  it('should expose an "options" property', function() {
    boilerplate.expand({});
    assert(boilerplate.options);
  });

  it('should expose an expand method', function() {
    assert.strictEqual(typeof boilerplate.expand, 'function');
  });

  it('should add targets to `targets`', function() {
    boilerplate.expand({
      foo: {src: '*'},
      bar: {src: '*'}
    });
    assert(boilerplate.targets.foo);
    assert(boilerplate.targets.bar);
  });

  it('should expand src patterns in targets', function() {
    boilerplate.expand({
      foo: {src: '*.md'},
      bar: {src: '*.js'}
    });

    assert(Array.isArray(boilerplate.targets.foo.files));
    assert(Array.isArray(boilerplate.targets.foo.files[0].src));
    assert(boilerplate.targets.foo.files[0].src.length);
  });

  it('should emit `target`', function() {
    var count = 0;
    boilerplate.on('target', function(target) {
      count++;
    });

    boilerplate.expand({
      foo: {src: '*.md'},
      bar: {src: '*.js'}
    });

    assert.equal(count, 2);
  });

  it('should merge scaffold options onto target options', function() {
    boilerplate.expand({
      options: {cwd: 'test/fixtures'},
      foo: {src: 'a.*'},
      bar: {src: 'one.*'}
    });
    assert.strictEqual(boilerplate.targets.foo.files[0].src[0], 'a.txt');
    assert.strictEqual(boilerplate.targets.bar.files[0].src[0], 'one.md');
  });

  it('should give precendence to target options over scaffold options', function() {
    boilerplate.expand({
      options: {
        cwd: 'test/fixtures',
        abc: 'xyz'
      },
      foo: {
        options: {abc: '123'},
        src: 'a.*'
      },
      bar: {
        options: {abc: '456'},
        src: 'one.*'
      }
    });
    assert.strictEqual(boilerplate.targets.foo.options.abc, '123');
    assert.strictEqual(boilerplate.targets.bar.options.abc, '456');
    assert.strictEqual(boilerplate.targets.foo.files[0].src[0], 'a.txt');
    assert.strictEqual(boilerplate.targets.bar.files[0].src[0], 'one.md');
  });

  it('should retain arbitrary properties on targets', function() {
    boilerplate.expand({
      foo: {src: '*.md', data: {title: 'My Blog'}},
      bar: {src: '*.js'}
    });
    assert(boilerplate.targets.foo.files[0].data);
    assert(boilerplate.targets.foo.files[0].data.title);
    assert.strictEqual(boilerplate.targets.foo.files[0].data.title, 'My Blog');
  });

  it('should use plugins on targets', function() {
    boilerplate.use(function(boilerplate) {
      return function fn(node) {
        if (boilerplate.options.data && !node.data) {
          node.data = boilerplate.options.data;
        }
        return fn;
      }
    });

    boilerplate.expand({
      options: {data: {title: 'My Site'}},
      foo: {src: '*.md', data: {title: 'My Blog'}},
      bar: {src: '*.js'}
    });

    assert(boilerplate.targets.foo.files[0].data);
    assert(boilerplate.targets.foo.files[0].data.title);
    assert.strictEqual(boilerplate.targets.foo.files[0].data.title, 'My Blog');

    assert(boilerplate.targets.bar.options.data);
    assert.strictEqual(boilerplate.targets.bar.options.data.title, 'My Site');
    assert(boilerplate.targets.bar.files[0].data);
    assert(boilerplate.targets.bar.files[0].data.title);
    assert.strictEqual(boilerplate.targets.bar.files[0].data.title, 'My Site');
  });
});

