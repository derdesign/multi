
/* Multi Context */

module.exports = {
    
  // Runs a random callback
  rand: function(callback) {
    var t = Math.ceil(Math.random()*2000);
    runOrder.push(t);
    setTimeout(function() {
      finishOrder.push(t);
      callback(null, 'Finished: ' + t);
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
  
module.exports = parallelTest;