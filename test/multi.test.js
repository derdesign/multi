
var vows = require('vows'),
    assert = require('assert'),
    EventEmitter = require('events').EventEmitter;
    
vows.describe('Multi Test Suite').addBatch({
  'Should run in parallel': {
    topic: function() {
      var promise = new EventEmitter(),
          parallelTest = require('./fixtures/parallel.js');
      parallelTest(promise);
      return promise;
    },
    'Is true': function(topic) {
      assert.isTrue(topic);
    }
  }
}).export(module);