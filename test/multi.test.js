
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
    'Results should be an array': function(topic) {
      assert.isArray(topic.results);
    },
    'Results are pushed in order of completion': function(topic) {
      var expectedOrder = [].concat(topic.order).sort(sortFunc);
      assert.deepEqual(expectedOrder, topic.results);
    },
    'Results length should match method calls': function(topic) {
      assert.equal(topic.results.length, 3);
    },
    'No errors should be returned': function(topic) {
      assert.isNull(topic.err);
    }
  }
  
  // Parallel execution
  // * Callbacks run simultaneously
  // * Results should be an array
  // * Results are pushed in order of completion
  // * No errors should be reported (null)
  // * Results length should match method calls
  
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