
function parallelTest(promise) {
  
  var Multi = require('../../'),
      runOrder = [], 
      finishOrder = [];
  
  var randFunc = function(callback) {
    var t = Math.ceil(Math.random()*2000);
    runOrder.push(t);
    setTimeout(function() {
      finishOrder.push(t);
    }, t);
  }
  
  var context = {
    method1: randFunc,
    method2: randFunc,
    method3: randFunc,
    method4: randFunc
  }
  
  var multi = new Multi(context, {parallel: true});
  
  multi.method1();
  multi.method2();
  multi.method3();
  multi.method4();
  
  // multi.exec(function(err, results) {
  //   promise.emit('success', true);
  // });
  
  setTimeout(function() {
    promise.emit('success', true);
  }, 3000);
  
}

module.exports = parallelTest;