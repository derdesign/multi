
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

    'No errors should be reported': function(topic) {
      assert.isNull(topic.err);
    },
  
    'Results should be an array': function(topic) {
      assert.isArray(topic.results);
    },
    
    'Results.length should match method calls': function(topic) {
      assert.equal(topic.results.length, 4);
    },
    
    'Callbacks run sequentially': function(topic) {
      var expected = topic.results.slice(0,3);
      assert.deepEqual(topic.order, expected);
    },
    
    'Results are pushed in order of completion': function(topic) {
      var expected = [].concat(topic.order);
      expected.push(5);
      assert.deepEqual(expected, topic.results);
    }

    
  }
}).addBatch({
  
  'Running with errors': {
    
    topic: function() {
      var promise = new EventEmitter(),
          order = [],
          multi = new Multi(context, {parallel: false, interrupt: false});
      multi.sleep(1);
      multi.sleep(2);
      multi.error(3);
      multi.randSleep(order);
      multi.randSleep(order);
      multi.exec(function(err, results) {
        promise.emit('success', {err: err, results: results, order: order});
      });
      return promise;
    },
    
    'Errors should be an array': function(topic) {
      assert.isArray(topic.err);
    },
    
    'Results should be an array': function(topic) {
      assert.isArray(topic.results);
    },
    
    'Errors.length should match method calls': function(topic) {
      assert.equal(topic.err.length, 5);
    },
    
    'Results.length should match method calls': function(topic) {
      assert.equal(topic.results.length, 5);
    },
    
    'Successful callbacks should report null as error': function(topic) {
      assert.isNull(topic.err[0]);
    },
    
    'The reported error matches the actual error': function(topic) {
      var err = topic.err[2];
      assert.isTrue(err instanceof Error && err.toString() == 'Error: The Error');
    },
    
    'Results are correctly reported': function(topic) {
      // Errored callbacks report null
      var expected = [1, 2, null].concat(topic.order);
      assert.deepEqual(expected, topic.results);
    }
    
  }
  
}).export(module);

// Running with interrupt on error
// - Errors & Results should be arrays
// - Errors length should get as far as errored callback
// - Results length should not match method calls
// - Last element in Errors array should be an error
