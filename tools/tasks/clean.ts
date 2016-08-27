import * as util from 'gulp-util';
import * as chalk from 'chalk';
import * as del from 'del';
import { PROD_DEST, APP_DEST } from '../config';

export = function clean(gulp, plugins, option) {
  return function(done) {
    switch (option) {
      case 'all'  : _cleanAll(done); break;
      case 'public' : _cleanProd(done); break;
      default: _cleanAll(done);
    }
  };
};

// ---------------
// Private Methods
// ---------------
function _cleanAll(done) {
  del([APP_DEST]).then(paths => {
    util.log('Deleted', chalk.yellow(paths && paths.join(', ') || '-'));
    done();
  });
}

function _cleanProd(done) {
  del(PROD_DEST).then(paths => {
    util.log('Deleted', chalk.yellow(paths && paths.join(', ') || '-'));
    done();
  });
}