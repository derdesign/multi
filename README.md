# Multi

Run asynchronous methods sequentially or in parallel

## About

Multi provides a mechanism to run callbacks asynchronously in sequence, or in parallel.

Execution can be interrupted if there is an error. After all callbacks have finished
executing, the library will provide [err, results], containing the errors (null if none)
and the respective results of the callbacks.

## Installation

To install multi:

    npm install multi

To install multi's dependencies:

    npm install
    
or

    make deps
    
To run the test suites:

    make tests
    
## Usage

Multi works with objects that have asynchronous methods. It creates a wrapper with the same methods as the original,
which can be run either in sequence or in parallel.

The following example wraps the `fs` module in a Multi object:

```javascript
  var fs = require('fs'),
      Multi = require('multi');
    
  var mfs = new Multi(fs);

  mfs.readFile('./assets/hello.html', 'utf-8');
  mfs.readdir('./assets/');
  mfs.readFile('./assets/style.css', 'utf-8');
  mfs.lstat('./assets/text.txt');

  mfs.exec(function(err, results) {
    console.log([err, results]);
  });
```

## Examples

There are several examples provided on the various uses of Multi, available in the `examples/` directory.

## License

Copyright &copy; 2012, Ernesto Méndez. (MIT License)

See [LICENSE](https://github.com/derdesign/multi/blob/master/LICENSE) for more info.