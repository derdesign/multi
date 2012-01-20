
/* Multi parallel error */

var util = require('util'),
    context = require('../test/fixtures/context'),
    Multi = require('../');

var order = [],  // Array containing the order of execution
    multi = new Multi(context, {parallel: true});

multi.randSleep(order);
multi.sleep(2);
multi.sleep(10);
multi.error(5);
multi.sum(99,1);
multi.randSleep(order);
multi.sleep(8);

multi.exec(function(err, results) {
  console.log([err, results]);
});
