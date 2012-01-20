
/* Multi Context */

module.exports = {
    
  // Runs a random callback
  rand: function(arr, callback) {
    var t = Math.ceil(Math.random()*1000);
    if (arr) arr.push(t);
    setTimeout(function() {
      callback(null, t);
    }, t);
  },
  
  // Callback returning error
  error: function(callback) {
    callback(new Error('The Error'), null);
  },
  
  // Callback returning a result
  sum: function(a, b, callback) {
    callback(null, a+b);
  }

}