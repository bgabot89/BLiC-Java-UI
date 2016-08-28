import * as runSequence from 'run-sequence';
import { join } from 'path';
import { APP_SRC } from '../config';
import { notifyLiveReload } from '../utils';

export = function watchServe(gulp, plugins) {
  return function() {
    plugins.watch([
      join(APP_SRC, '**/*.ts'),
      join(APP_SRC, '*.html'),
      join(APP_SRC, '*.css')],
      e => {
        runSequence('build.dev', () => notifyLiveReload(e))
      }
    );
  };
};
