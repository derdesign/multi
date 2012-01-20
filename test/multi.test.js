
var vows = require('vows'),
    assert = require('assert'),
    context = require('./fixtures/context'),
    Multi = require('../'),
    EventEmitter = require('events').EventEmitter;
    
var sortFunc = function(a,b) { return a-b; } 
    
vows.describe('Multi Test Suite').addBatch({
  'Parallel execution': {
    topic: function() {
      var promise = new EventEmitter(),
          order = [],
          multi = new Multi(context, {parallel: true});
      multi.rand(order);
      multi.rand(order);
      multi.rand(order);
      multi.exec(function(err, results) {
        promise.emit('success', {err: err, results: results, order: order})
      });
      return promise;
    },
    'Callbacks run simultaneously': function(topic) {
      assert.notDeepEqual(topic.order, topic.results);
    },
    'Results are pushed in order of completion': function(topic) {
      var expectedOrder = [].concat(topic.order).sort(sortFunc);
      assert.deepEqual(expectedOrder, topic.results);
    }
  }
  
  // Parallel execution
  // * Callbacks run simultaneously
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