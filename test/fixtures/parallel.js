
function parallelTest(promise) {
  
  promise.emit('success', true);
  
}

module.exports = parallelTest;