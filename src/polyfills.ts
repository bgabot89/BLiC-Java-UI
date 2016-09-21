// Internet Explorer 9 support
import 'ie-shim';

// Added parts of es6 which are necessary for your project or your browser support requirements.
import 'core-js/es6/array';
import 'core-js/es6/map';
import 'core-js/es6/set';
import 'core-js/es6/string';
import 'core-js/es6/symbol';
import 'core-js/es7/reflect';
import 'core-js/fn/array/includes';
import 'core-js/fn/object/assign';

// Zone.js
import 'zone.js/dist/zone';

// Typescript emit helpers polyfill
import 'ts-helpers';

if (process.env.NODE_ENV === 'development') {
  Error.stackTraceLimit = Infinity;
  require('zone.js/dist/long-stack-trace-zone');
}
