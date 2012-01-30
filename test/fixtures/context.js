
/* Multi Context */

var util = require('util'),
    slice = Array.prototype.slice;

console.exit = function() {
  var args = slice.call(arguments, 0);
  console.dir.apply(null, args);
  process.exit();
}

module.exports = {
  
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