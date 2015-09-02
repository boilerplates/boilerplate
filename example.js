var boilerplate = require('./')();


boilerplate.register('root', {
  options: {
    process: false,
    cwd: 'sandbox/boilerplate-webapp/root'
  },
  files: [{
    src: ['*.*']
  }]
});

boilerplate.register('copy', {
  options: {
    process: true,
    cwd: 'sandbox/boilerplate-webapp/copy'
  },
  files: [{
    src: ['*.*']
  }]
});

boilerplate.register('dotfiles', {
  options: {
    process: true,
    cwd: 'sandbox/boilerplate-webapp/dotfiles'
  },
  files: [{
    src: ['*.*']
  }]
});


console.log(boilerplate.config)
