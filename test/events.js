
var vows = require('vows'),
    assert = require('assert'),
    util = require('util'),
    context = require('./fixtures/context'),
    Multi = require('../'),
    EventEmitter = require('events').EventEmitter;
    
var multi = new Multi({}),
    emitter = new EventEmitter(),
    pre_exec = false,
    post_exec = false;

multi.on('pre_exec', function() {
  pre_exec = true;
});

multi.on('post_exec', function() {
  post_exec = true;
});

vows.describe('Multi Events').addBatch({
  
  'Integrity check': {
    
    'Has EventEmitter methods': function() {
      for (var method in emitter) {
        if (emitter[method] instanceof Function) {
          assert.isFunction(multi[method]);
        }
      }
    }
    
  }
  
}).addBatch({
  
  'Event tests': {
    
    topic: function() {
      var promise = new EventEmitter();
      
      multi.exec(function(err, results) {
        promise.emit('success');
      });
      
      return promise;
    },
    
    'Emits the "pre_exec" event': function() {
      assert.isTrue(pre_exec);
    },
    
    'Emits the "post_exec" event': function() {
      assert.isTrue(post_exec);
    }
    
  }
  
}).export(module);

