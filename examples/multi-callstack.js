
/* Multi Call Stack */

var Multi = require('../');

var context = {
  sum: function(a,b,cb) {
    cb(null, a+b);
  },
  hello: function(name, cb) {
    cb(null, 'Hello ' + name + '!');
  }
}

var multi = new Multi(context, {flush: false});

multi.sum(1,2);
multi.sum(3,4);
multi.hello('Ernie');

// Run `exec` for the first time
multi.exec(function(err, results) {
  console.log(err || results);
});

// Any upcoming `exec` calls will still
// make use of the original call stack
multi.exec(function(err, results) {
  console.log(err || results);
});