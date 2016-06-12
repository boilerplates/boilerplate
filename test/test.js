'use strict';

require('mocha');
require('should');
var util = require('util');
var assert = require('assert');
var Boilerplate = require('..');
var boilerplate;

describe('boilerplates', function() {
  beforeEach(function() {
    boilerplate = new Boilerplate();
  });

  describe('scaffolds', function() {
    it('should expose an "options" property', function() {
      boilerplate.expand({});
      assert(boilerplate.options);
    });

    it('should expose an expand method', function() {
      assert.equal(typeof boilerplate.expand, 'function');
    });

    it('should recognize scaffolds', function() {
      boilerplate.expand({foo: {a: {src: '*'}}});
      assert(boilerplate.scaffolds);
    });

    it('should add scaffolds to the `scaffolds` property', function() {
      boilerplate.expand({
        foo: {a: {src: '*'}},
        bar: {a: {src: '*'}}
      });
      assert(boilerplate.scaffolds.foo);
      assert(boilerplate.scaffolds.bar);
    });

    it('should expand src patterns in targets', function() {
      boilerplate.expand({
        foo: {a: {src: '*.md'}},
        bar: {a: {src: '*.js'}},
      });
      assert(Array.isArray(boilerplate.scaffolds.foo.targets.a.files));
      assert(Array.isArray(boilerplate.scaffolds.foo.targets.a.files[0].src));
      assert(boilerplate.scaffolds.foo.targets.a.files[0].src.length);
    });

    it('should use scaffold options on targets', function() {
      boilerplate.expand({
        options: {cwd: 'test/fixtures'},
        foo: {a: {src: 'a.*'}},
        bar: {a: {src: 'one.*'}},
      });
      assert(boilerplate.scaffolds.foo.targets.a.files[0].src[0] === 'a.txt');
      assert(boilerplate.scaffolds.bar.targets.a.files[0].src[0] === 'one.md');
    });

    it('should retain arbitrary properties on scaffolds', function() {
      boilerplate.expand({
        foo: {a: {src: '*.md', data: {title: 'My Blog'}}},
        bar: {a: {src: '*.js'}},
      });
      assert(boilerplate.scaffolds.foo.targets.a.files[0].data);
      assert(boilerplate.scaffolds.foo.targets.a.files[0].data.title);
      assert(boilerplate.scaffolds.foo.targets.a.files[0].data.title === 'My Blog');
    });

    it('should use plugins on scaffolds', function() {
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
        foo: {a: {src: '*.md', data: {title: 'My Blog'}}},
        bar: {a: {src: '*.js'}},
      });

      assert(boilerplate.scaffolds.foo.targets.a.files[0].data);
      assert(boilerplate.scaffolds.foo.targets.a.files[0].data.title);
      assert(boilerplate.scaffolds.foo.targets.a.files[0].data.title === 'My Blog');

      assert(boilerplate.scaffolds.bar.targets.a.options.data);
      assert(boilerplate.scaffolds.bar.targets.a.options.data.title === 'My Site');
      assert(boilerplate.scaffolds.bar.targets.a.files[0].data);
      assert(boilerplate.scaffolds.bar.targets.a.files[0].data.title);
      assert(boilerplate.scaffolds.bar.targets.a.files[0].data.title === 'My Site');
    });
  });

  describe('targets', function() {
    it('should expose an "options" property', function() {
      boilerplate.expand({});
      assert(boilerplate.options);
    });

    it('should expose an expand method', function() {
      assert.equal(typeof boilerplate.expand, 'function');
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

    it('should use scaffold options on targets', function() {
      boilerplate.expand({
        options: {cwd: 'test/fixtures'},
        foo: {src: 'a.*'},
        bar: {src: 'one.*'}
      });
      assert(boilerplate.targets.foo.files[0].src[0] === 'a.txt');
      assert(boilerplate.targets.bar.files[0].src[0] === 'one.md');
    });

    it('should retain arbitrary properties on targets', function() {
      boilerplate.expand({
        foo: {src: '*.md', data: {title: 'My Blog'}},
        bar: {src: '*.js'}
      });
      assert(boilerplate.targets.foo.files[0].data);
      assert(boilerplate.targets.foo.files[0].data.title);
      assert(boilerplate.targets.foo.files[0].data.title === 'My Blog');
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
      assert(boilerplate.targets.foo.files[0].data.title === 'My Blog');

      assert(boilerplate.targets.bar.options.data);
      assert(boilerplate.targets.bar.options.data.title === 'My Site');
      assert(boilerplate.targets.bar.files[0].data);
      assert(boilerplate.targets.bar.files[0].data.title);
      assert(boilerplate.targets.bar.files[0].data.title === 'My Site');
    });
  });
});

