
/* Multi parallel */

var util = require('util');
    Multi = require('../');

var context = {
  
  // Runs a callback after a specific delay
  sleep: function(delay, callback) {
    setTimeout(function() {
      callback(null, delay);
    }, delay);
  },
  
  // Runs a callback at a random time
  randSleep: function(arr, callback) {
    var t = Math.ceil(Math.random()*10);
    if (util.isArray(arr)) arr.push(t);
    setTimeout(function() {
      callback(null, t);
    }, t);
  },
  
  // Callback returning error
  error: function(timeout, callback) {
    setTimeout(function() {
      callback(new Error('The Error'), null);
    }, timeout);
  },
  
  // Callback returning a result
  sum: function(a, b, callback) {
    callback(null, a+b);
  }
  
}

var order = [],  // Array containing the order of execution
    multi = new Multi(context, {parallel: true});

multi.randSleep(order);
multi.sleep(2);
multi.sleep(10);
multi.sum(99,1);
multi.randSleep(order);
multi.sleep(8);

multi.exec(function(err, results) {
  console.log([err, results]);
});
