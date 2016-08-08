import { join}  from 'path';
import { APP_SRC, APP_DEST } from '../config';
import { templateLocals, tsProjectFn } from '../utils';
const SystemBuilder = require('systemjs-builder');
const builder = new SystemBuilder();

export = function buildJS(gulp, plugins, option) {
  return function(done) {
    switch (option) {
      case 'prod': buildJSProd('prod', done); break;
      case 'publish': buildJSPublish('publish', done); break;
      default: buildJSDev(gulp, plugins, done);
    }
  };

  function _buildCommonJS(gulp, plugins) {
    let tsProject = tsProjectFn(plugins);
    let src = [
      'typings/index.d.ts',
      'tools/manual_typings/**/*.d.ts',
      join(APP_SRC, '**/*.ts'),
      '!' + join(APP_SRC, '**/*.spec.ts'),
      '!' + join(APP_SRC, '**/*.e2e.ts')
    ];
    let result = gulp
      .src(src)
      .pipe(plugins.plumber())
      .pipe(plugins.sourcemaps.init())
      .pipe(plugins.typescript(tsProject));

    return Promise.resolve(result.js
      .pipe(plugins.sourcemaps.write())
      .pipe(plugins.template(templateLocals()))
      .pipe(gulp.dest(APP_DEST)));
  }

  function buildJSDev(gulp, plugins, done) {
    return _buildCommonJS(gulp, plugins)
      .then(function(){
        done();
      });
  }

  function buildJSProd(option, done) {
    return _bundleJS(option)
      .then(function() {
        done();
      });
  }

  function buildJSPublish(option, done) {
    return _bundleJS(option)
      .then(function() {
        done();
      });
  }

  function _bundleJS(option) {
    return builder.loadConfig('./src/system.config.prod.js')
      .then(function() {
        let outputFile;
        let app;
        if (option === 'prod') {
          outputFile = './dist/prod/bundle.min.js';
        } else if (option === 'publish') {
          outputFile = './public/bundle.min.js';
        }
        return builder.buildStatic('app', outputFile, {
          minify: true,
          mangle: true,
          rollup: true,
          sourceMaps: true,
          encodeNames: false
        });
      });
  }
};