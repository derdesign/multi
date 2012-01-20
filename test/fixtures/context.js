
/* Multi Context */

module.exports = {
  
  // Runs a callback after a specific delay
  sleep: function(delay, callback) {
    setTimeout(function() {
      callback.call(null, delay);
    }, delay);
  },
  
  // Runs a callback at a random time
  randSleep: function(arr, callback) {
    var t = Math.ceil(Math.random()*10);
    if (arr) arr.push(t);
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
  },
  
}