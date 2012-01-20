
var vows = require('vows'),
    assert = require('assert'),
    context = require('./fixtures/context'),
    Multi = require('../../'),
    EventEmitter = require('events').EventEmitter;
    
vows.describe('Multi Test Suite').addBatch({
  'Parallel execution': {
    topic: function() {
      var promise = new EventEmitter()
      parallelTest(promise);
      return promise;
    },
    'All callbacks run at the same time': function(topic) {
      assert.isTrue(topic);
    }
  }
  
  // Parallel execution
  // - Callbacks are run simultaneously
  // - Results are pushed in order of completion
  // - No errors should be reported (null)
  // - Results should be an array
  // - Results length should match method calls
  
  // Parallel execution with errors
  // - Callbacks are run simultaneously
  // - An array of errors should be reported
  // - ...
  
  // Parallel execution with interrupt
  // - Results should be incomplete
  
  // Asynchronous execution
  // - Callbacks should run asynchronously in sequence
  // - Results are pushed in the order of completion
  // - No errors should be reported (null)
  // - Results length should match method calls
  
  // Asynchronous execution with errors
  // - An array of errors should be reported
  // - Results array should contain incomplete values
  // ...
  
  // Asynchronous execution with interrupt
  // - Results should be incomplete

  
}).export(module);