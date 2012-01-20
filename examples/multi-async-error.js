
/* Multi async error */

var fs = require('fs'),
    Multi = require('../');
    
var mfs = new Multi(fs);

mfs.readFile('./assets/hello.html', 'utf-8');
mfs.readdir('./assets/');
mfs.readFile('./assets/style.css', 'utf-8');
mfs.readFile('./assets/missing-file'); // Error happens here
mfs.lstat('./assets/text.txt');

mfs.exec(function(err, results) {
  console.log([err, results]);
});

