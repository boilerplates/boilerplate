# boilerplate [![NPM version](https://badge.fury.io/js/boilerplate.svg)](http://badge.fury.io/js/boilerplate)

> Tools and conventions for authoring and publishing boilerplates that can be generated by any build system or generator.

Welcome to boilerplate! Here you'll find both the tools and conventions for creating project boilerplates.

**What is a boilerplate?**

> A boilerplate is a project with generic, reusable code, files or content that is intended to be used as a starting point for creating new projects.

**What does this project provide?**

* [opinionated conventions](./docs/terminology.md) for defining and organizing project boilerplates
* [API](#api) for actually creating boilerplates
* [documentation](./getting-started.md) and [guide](./guide.md) to help you get started with [authoring](./docs/authoring.md) your own boilerplates
* [website](http://boilerplates.io) for discovering boilerplates created by the community

**What does this NOT provide?**

Workflows and tools for actually generating new projects from a boilerplate. This is a job much better suited to build systems like [assemble](http://assemble.io), [gulp](http://gulpjs.com), [grunt](http://gruntjs.com/), and [yeoman](http://yeoman.io).

If you publish a

## Install

Install with [npm](https://www.npmjs.com/)

```sh
$ npm i boilerplate --save
```

## Usage

```js
var boilerplate = require('boilerplate');
```

## API

### [Boilerplate](index.js#L29)

Create an instance of Boilerplate with the given `options`

**Params**

* `options` **{Object}**

**Example**

```js
var boilerplate = new Boilerplate({
  templates: {
    files: [{src: 'templates/*.hbs', dest: 'src/'}]
  }
});
```

### [.scaffold](index.js#L81)

Register a boilerplate "target" with the given `name`. A target is a semantically-grouped configuration of files and directories.

**Params**

* `name` **{String}**: The name of the config target.
* `config` **{Object}**
* `returns` **{Object}**

**Example**

```js
boilerplate.register('webapp', ...);
```

## Related projects

* [assemble](https://www.npmjs.com/package/assemble): Static site generator for Grunt.js, Yeoman and Node.js. Used by Zurb Foundation, Zurb Ink, H5BP/Effeckt,… [more](https://www.npmjs.com/package/assemble) | [homepage](http://assemble.io)
* [boilerplate](https://www.npmjs.com/package/boilerplate): Easily create, share and use boilerplates for node.js and web projects. | [homepage](https://github.com/jonschlinkert/boilerplate)
* [scaffold](https://www.npmjs.com/package/scaffold): Conventions and API for creating scaffolds that can by used by any build system or… [more](https://www.npmjs.com/package/scaffold) | [homepage](https://github.com/jonschlinkert/scaffold)
* [template](https://www.npmjs.com/package/template): Render templates using any engine. Supports, layouts, pages, partials and custom template types. Use template… [more](https://www.npmjs.com/package/template) | [homepage](https://github.com/jonschlinkert/template)

## Test coverage

As of September 04, 2015:

```
Statements   : 100% (40/40)
Branches     : 100% (24/24)
Functions    : 100% (4/4)
Lines        : 100% (39/39)
```

## Running tests

Install dev dependencies:

```sh
$ npm i -d && npm test
```

## Contributing

Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](https://github.com/jonschlinkert/boilerplate/issues/new).

## Author

**Jon Schlinkert**

+ [github/jonschlinkert](https://github.com/jonschlinkert)
+ [twitter/jonschlinkert](http://twitter.com/jonschlinkert)

## License

Copyright © 2015 Jon Schlinkert
Released under the MIT license.

***

_This file was generated by [verb-cli](https://github.com/assemble/verb-cli) on September 04, 2015._
