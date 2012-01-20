
var vows = require('vows'),
    assert = require('assert'),
    util = require('util'),
    context = require('./fixtures/context'),
    Multi = require('../'),
    EventEmitter = require('events').EventEmitter;
    
vows.describe('Asynchronous execution')

// Running with successful callbacks
// - Callbacks run simultaneously
// - Results should be an array
// - Results are pushed in order of completion
// - Results length should match method calls
// - No errors should be returned

// Running with errors
// - An array of errors should be reported
// - The reported error matches the actual error
// - The Errors array length should match method calls

// Running with interrupt on error
// - Errors & Results should be arrays
// - Errors length should get as far as errored callback
// - Results length should not match method calls
// - Last element in Errors array should be an error