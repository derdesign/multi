
var vows = require('vows'),
    assert = require('assert'),
    util = require('util'),
    context = require('./fixtures/context'),
    Multi = require('../'),
    EventEmitter = require('events').EventEmitter;
    
vows.describe('Asynchronous execution').addBatch({
  
  'Running with successful callbacks': {
    
    topic: function() {
      var promise = new EventEmitter(),
          order = [],
          multi = new Multi(context, {parallel: false, interrupt: false});
      multi.randSleep(order);
      multi.randSleep(order);
      multi.randSleep(order);
      multi.sum(2,3);
      multi.exec(function(err, results) {
        promise.emit('success', {err: err, results: results, order: order});
      });
      return promise;
    },
    
    'Results should be an array': function(topic) {
      assert.isArray(topic.results);
    },
    
    'No errors should be returned': function(topic) {
      assert.isNull(topic.err);
    },
    
    'Callbacks run sequentially': function(topic) {
      var expected = topic.results.slice(0,3);
      assert.deepEqual(topic.order, expected);
    },
    
    'Results are pushed in order of completion': function(topic) {
      var expected = [].concat(topic.order);
      expected.push(5);
      assert.deepEqual(expected, topic.results);
    },
    
    'Results length should match method calls': function(topic) {
      assert.equal(topic.results.length, 4);
    }
    
  }
}).export(module);

// Running with errors
// - An array of errors should be reported
// - The reported error matches the actual error
// - The Errors array length should match method calls

// Running with interrupt on error
// - Errors & Results should be arrays
// - Errors length should get as far as errored callback
// - Results length should not match method calls
// - Last element in Errors array should be an error