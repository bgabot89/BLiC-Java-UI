const rimraf = require('rimraf');
import * as util from 'gulp-util';
import * as chalk from 'chalk';
import * as del from 'del';

export = function remove(gulp, plugins) {
  return function(done) {
    del('public/app/components').then(paths => {
      util.log('Deleted', chalk.yellow(paths && paths.join(', ') || '-'));
      done();
    });
    // rimraf()
  };
};


function _removeProd(done) {
  console.log('---------- Called removed Prod-----------')
  rimraf('./dist/prod/app/components', done);
}

function _removePublish(done) {
  console.log('---------- Called removed publsh -----------')
  rimraf('./public/app/components', done);
}