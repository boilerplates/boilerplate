// var path = require('path');
// var glob = require('globby');
// var reflink = require('markdown-reference');
// var toClipboard = require('to-clipboard');

// function toReflinks(patterns, options) {
//   var files = glob.sync(patterns, options);
//   var links = '';

//   files.forEach(function (fp) {
//     var name = path.basename(fp, path.extname(fp));
//     links += reflink(name, fp) + '\n';
//   });
//   return links;
// }

// toClipboard(toReflinks('**/*.md', {cwd: 'docs/'}));
