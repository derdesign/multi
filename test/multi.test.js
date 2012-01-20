
var vows = require('vows'),
    assert = require('assert'),
    EventEmitter = require('events').EventEmitter;
    
vows.describe('Multi Test Suite').addBatch({
  'When running in parallel': {
    topic: function() {
      var promise = new EventEmitter(),
          parallelTest = require('./fixtures/parallel');
      parallelTest(promise);
      return promise;
    },
    'All callbacks run at the same time': function(topic) {
      assert.isTrue(topic);
    }
  }
}).export(module);