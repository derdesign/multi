
/* Multi Context */

module.exports = {
    
  // Runs a random callback
  rand: function(arr, callback) {
    var t = Math.ceil(Math.random()*1000);
    arr.push(t);
    setTimeout(function() {
      callback(null, t);
    }, t);
  },
  
  // Callback returning error
  error: function(callback) {
    callback(new Error('The Error'), null);
  },
  
  // Callback returning a result
  result: function(a, b, callback) {
    callback(null, a+b);
  }

}