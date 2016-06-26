'use strict';

require('mocha');
require('should');
var util = require('util');
var assert = require('assert');
var Boilerplate = require('..');
var boilerplate;

describe('scaffolds', function() {
  beforeEach(function() {
    boilerplate = new Boilerplate();
  });

  describe('.expand', function() {
    it('should expose an "options" property', function() {
      boilerplate.expand({});
      assert(boilerplate.options);
    });

    it('should expose an expand method', function() {
      assert.strictEqual(typeof boilerplate.expand, 'function');
    });

    it('should detect scaffolds', function() {
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

    it('should emit `scaffold`', function() {
      var count = 0;
      boilerplate.on('scaffold', function(scaffold) {
        count++;
      });

      boilerplate.expand({
        foo: {a: {src: '*'}},
        bar: {a: {src: '*'}}
      });
      assert(boilerplate.scaffolds.foo);
      assert(boilerplate.scaffolds.bar);
      assert.equal(count, 2);
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
      assert.strictEqual(boilerplate.scaffolds.foo.targets.a.files[0].src[0], 'a.txt');
      assert.strictEqual(boilerplate.scaffolds.bar.targets.a.files[0].src[0], 'one.md');
    });

    it('should retain arbitrary properties on scaffolds', function() {
      boilerplate.expand({
        foo: {a: {src: '*.md', data: {title: 'My Blog'}}},
        bar: {a: {src: '*.js'}},
      });
      assert(boilerplate.scaffolds.foo.targets.a.files[0].data);
      assert(boilerplate.scaffolds.foo.targets.a.files[0].data.title);
      assert.strictEqual(boilerplate.scaffolds.foo.targets.a.files[0].data.title, 'My Blog');
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
      assert.strictEqual(boilerplate.scaffolds.foo.targets.a.files[0].data.title, 'My Blog');

      assert(boilerplate.scaffolds.bar.targets.a.options.data);
      assert.strictEqual(boilerplate.scaffolds.bar.targets.a.options.data.title, 'My Site');
      assert(boilerplate.scaffolds.bar.targets.a.files[0].data);
      assert(boilerplate.scaffolds.bar.targets.a.files[0].data.title);
      assert.strictEqual(boilerplate.scaffolds.bar.targets.a.files[0].data.title, 'My Site');
    });
  });
  
  describe('.expand', function() {
    it('should expose an "options" property', function() {
      boilerplate.expand({});
      assert(boilerplate.options);
    });

    it('should expose an expand method', function() {
      assert.strictEqual(typeof boilerplate.expand, 'function');
    });

    it('should detect scaffolds', function() {
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

    it('should emit `scaffold`', function() {
      var count = 0;
      boilerplate.on('scaffold', function(scaffold) {
        count++;
      });

      boilerplate.expand({
        foo: {a: {src: '*'}},
        bar: {a: {src: '*'}}
      });
      assert(boilerplate.scaffolds.foo);
      assert(boilerplate.scaffolds.bar);
      assert.equal(count, 2);
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
      assert.strictEqual(boilerplate.scaffolds.foo.targets.a.files[0].src[0], 'a.txt');
      assert.strictEqual(boilerplate.scaffolds.bar.targets.a.files[0].src[0], 'one.md');
    });

    it('should retain arbitrary properties on scaffolds', function() {
      boilerplate.expand({
        foo: {a: {src: '*.md', data: {title: 'My Blog'}}},
        bar: {a: {src: '*.js'}},
      });
      assert(boilerplate.scaffolds.foo.targets.a.files[0].data);
      assert(boilerplate.scaffolds.foo.targets.a.files[0].data.title);
      assert.strictEqual(boilerplate.scaffolds.foo.targets.a.files[0].data.title, 'My Blog');
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
      assert.strictEqual(boilerplate.scaffolds.foo.targets.a.files[0].data.title, 'My Blog');

      assert(boilerplate.scaffolds.bar.targets.a.options.data);
      assert.strictEqual(boilerplate.scaffolds.bar.targets.a.options.data.title, 'My Site');
      assert(boilerplate.scaffolds.bar.targets.a.files[0].data);
      assert(boilerplate.scaffolds.bar.targets.a.files[0].data.title);
      assert.strictEqual(boilerplate.scaffolds.bar.targets.a.files[0].data.title, 'My Site');
    });
  });
});

