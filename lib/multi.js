
/**
  Multi
  
  Run asynchronous methods sequentially or in parallel.

  Allows methods from context to be queued and executed in asynchronously
  in order, returning the results & errors of all operations.
  
  Provides: [err, results]
  
  @param {object} context
  @param {object} config
  @private
 */

var _ = require('underscore'),
    slice = Array.prototype.slice,
    EventEmitter = require('events').EventEmitter;

function Multi(context, config) {
  
  /** {
    interrupt: false,
    parallel: false
  } */
  
  var self = this,
      restricted = ['exec', 'multi', 'constructor'],
      properties = _.uniq(Object.getOwnPropertyNames(context).concat(_.methods(context)));
  
  var callback;
  
  var counter, errored, errors, stack, results; // Initial state  
  
  setInitialState();

  // Config defaults & overrides
  config = config || {};
  config = _.extend({
    interrupt: false, // Interrupt on errors
    parallel: false,   // Run scripts in parallel
    flush: true, // Flush the call stack on exec
  }, config);
  
  // Expose config
  Object.defineProperty(this, '__config', {
    value: config,
    writable: true,
    enumerable: false,
    configurable: true
  });
  
  // Executes the queue, provides [err, results]
  this.exec = function(cb) {

    // Pre exec event
    this.emit('pre_exec');

    callback = cb;

    if (stack.length > 0) {

      if (config.parallel) {
        // Parallel execution
        this.promise = new EventEmitter();

        this.promise.on('finished', function() {
          self.emit('post_exec'); // Post exec event
          var preparedArgs = setInitialState(true); // Reset state > return
          callback.apply(self, preparedArgs); // [err, results]
        });

        for (var ob,i=0; i < stack.length; i++) {
          ob = stack[i];
          context[ob.caller].apply(context, ob.args);
        }

      } else {

        var first = stack[0];
        context[first.caller].apply(context, first.args);

      }
      
    } else {
      
      // Return success & empty results
      self.emit('post_exec');
      callback.call(context, new Error("The call stack is empty"), []);
      
    }

  }
  
  // Handles the internal async execution loop in order
  function resultsCallback() {
    var args = slice.call(arguments, 0),
        err = args.shift();
        
    if (err) {
      if (config.interrupt === true) {
        errors.push(err);
        results.push(null);
        callback.call(self, errors, results);
        return;
      } else {
         errored = true; 
         args = null;
      }
    } else if (args.length === 0) args = 'OK';
    else if (args.length == 1) args = args[0];
    
    errors.push(err);
    results.push(args);
    
    if (config.parallel) {
      // Parallel execution
      if (++counter == stack.length) {
        self.promise.emit('finished');
      }
    } else {
      // Sequential execution
      if (++counter == stack.length) {
        self.emit('post_exec'); // Post exec event
        var preparedArgs = setInitialState(true); // Reset state > return
        callback.apply(self, preparedArgs); // [err, results]
      } else {
        var next = stack[counter];
        context[next.caller].apply(context, next.args);
      }
    }
  }
  
  // Queues the callback
  function queue(args) {
    args.push(resultsCallback);
    stack.push({caller: this.caller, args: args});
  }
  
  // Generates the queuing function
  function dummy(caller) {
    return function() {
      queue.call({caller: caller}, slice.call(arguments, 0));
      return self;
    }
  }
  
  // Sets the initial state of multi
  function setInitialState(ret) {
    var e, r;
    
    // Before resetting, keep a copy of args
    if (ret) {
      e = (errored ? errors : null);
      r = results;
    }
    
    // Reset runtime vars to their default state
    counter = 0;
    errored = false;
    errors = [];
    results = [];
    
    // Flush stack on first run or when config.flush is true
    if (stack == null || config.flush) stack = [];
    
    // Return prepared arguments
    if (ret) return [e, r];
  }
  
  // Create the queuing functions for the storage methods of the multi
  for (var key,i=0; i < properties.length; i++) {
    key = properties[i];
    if (context[key] instanceof Function) {
      if (restricted.indexOf(key) >= 0) continue;
      this[key] = dummy(key);
    }
  }
  
  // Get Prototype methods
  
  // Prevent conflicts with context's `exec` method if it exists.
  // Move original `exec` method from context into `__exec`.
  
  if (context.exec instanceof Function) {
    this.__exec = dummy('exec');
  }
  
  // Add event Emitter (overrides context's EventEmitter)
  _.extend(this, new EventEmitter());
  
  setNonEnumerable.call(this, Object.keys(EventEmitter.prototype));
  
}

function setNonEnumerable(props) {
  var p, self = this;
  for (var i=0; i < props.length; i++) {
    p = props[i];
    Object.defineProperty(this, p, {
      value: self[p],
      writable: true,
      enumerable: false,
      configurable: true
    });
  }
}

module.exports = Multi;
