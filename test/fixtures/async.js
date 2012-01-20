
function asyncTest(promise) {
  
  promise.emit('success', true);
  
}

module.exports = asyncTest;