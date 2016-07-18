# HTML5 Boilerplate

This recipe shows how to create a boilerplate configuration from Google's popular [h5bp][], that will make the boilerplate easier to extend, customize and share.

**Three steps**

1. [download](#download)
1. [configure](#configure)
1. [Expand](#expand)

Let's walk through each step.

## Download

Download Google's popular [h5bp](https://github.com/h5bp/html5-boilerplate) project with the following command:

```sh
$ git clone https://github.com/h5bp/html5-boilerplate.git vendor
```

## Configure

Next, create a declarative configuration that defines glob patterns for all of the files in the boilerplate, as well as destination directories for all of the "targets".

_(This is already done for you in [boilerplate.js](./boilerplate.js). Please feel free to customize it!)_

```js
var Boilerplate = require('boilerplate');
var h5bp = new Boilerplate({
  dist: {
    options: {
      cwd: 'vendor/dist'
    },
    root: {src: ['{.*,*.*}'],   dest: 'src/'},
    css:  {src: ['css/*.css'],  dest: 'src/'},
    doc:  {src: ['doc/*.md'],   dest: 'src/'},
    js:   {src: ['js/**/*.js'], dest: 'src/'}
  }
});
```

**Notes**

- `options.cwd`: the `vendor` folder is where we downloaded h5bp
-

## Expand

By "expand", we mean that glob patterns in the boilerplate will be resolved to actual file paths. To do this, run:

```sh
$ node boilerplate.js
```

## Inspecting the boilerplate

The boilerplate configuration object is organized into "scaffolds", you can inspect these by doing the following:

```js
// inspect the boilerplate
console.log(boilerplate);

// inspect specific scaffolds
console.log(boilerplate.css);
console.log(boilerplate.html);

// inspect files arrays on specific scaffolds
console.log(boilerplate.css.files);
console.log(boilerplate.html.files);
```

[h5bp]: https://github.com/h5bp/html5-boilerplate
