import * as util from 'gulp-util';
import * as chalk from 'chalk';
import * as del from 'del';

export = function remove(gulp, plugins) {
  return function(done) {
    del(['public/app/components', 'public/app/services', 'public/app/*.js', 'public/app/*.map', 'public/app/*.ts']).then(paths => {
      util.log('Deleted', chalk.yellow(paths && paths.join(', ') || '-'));
      done();
    });
  };
};
