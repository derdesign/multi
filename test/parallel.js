
var vows = require('vows'),
    assert = require('assert'),
    context = require('./fixtures/context'),
    Multi = require('../'),
    EventEmitter = require('events').EventEmitter;
    
var sortFunc = function(a,b) { return a-b; }
    
vows.describe('Parallel Execution')/*.addBatch({
  'Running with successful callbacks': {
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
      var o = topic.order,
          r = topic.results;
      var cond1 = (r.indexOf(o[0]) >= 0),
          cond2 = (r.indexOf(o[1]) >= 0),
          cond3 = (r.indexOf(o[2]) >= 0);
      assert.isTrue(cond1 && cond2 && cond3);
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
  
})*/.addBatch({
  'Running with errors': {
    topic: function() {
      var promise = new EventEmitter(),
          multi = new Multi(context, {parallel: true});
      multi.rand(null);
      multi.error();
      multi.rand(null);
      multi.exec(function(err, results) {
        promise.emit('success', {err: err, results: results});
      });
      return promise;
    },
    'An array of errors should be reported': function(topic) {
      assert.isArray(topic.err);
    },
    'The reported error matches the actual error': function(topic) {
      var err = topic.err[0];
      assert.isTrue(err instanceof Error && err.toString() == 'Error: The Error');
    }
  }
})/*.addBatch({
  'Running with interrupt on error': {
    topic: function() {
      
    },
    'Results should be incomplete': function(topic) {
      
    }
  }
})*/.export(module);