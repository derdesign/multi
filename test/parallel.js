
var vows = require('vows'),
    assert = require('assert'),
    context = require('./fixtures/context'),
    Multi = require('../'),
    EventEmitter = require('events').EventEmitter;
    
var sortFunc = function(a,b) { return a-b; } 
    
vows.describe('Parallel Execution').addBatch({
  '': {
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
  
}).export(module);