
/* Multi async interrupt on error */

var fs = require('fs'),
    Multi = require('../');
    
var mfs = new Multi(fs, {interrupt: true});

mfs.readFile('./assets/hello.html', 'utf-8');
mfs.readFile('./assets/missing-file');  // Error happens here, interrupts here
mfs.readdir('./assets/');
mfs.readFile('./assets/style.css', 'utf-8');
mfs.lstat('./assets/text.txt');

mfs.exec(function(err, results) {
  console.log([err, results]);
});

