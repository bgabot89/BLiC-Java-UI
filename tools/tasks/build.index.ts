import { join } from 'path';
import { APP_SRC, APP_DEST, DEV_DEPENDENCIES, APP_PRO } from '../config';
import { transformPath, templateLocals } from '../utils';

export = function buildIndex(gulp, plugins, option) {
  return function (done) {
    switch (option) {
      case 'dev'    : buildDevIndex(gulp, plugins, 'dev', done); break;
      case 'prod'   : buildProdIndex(gulp, plugins, 'prod', done); break;
      case 'publish': buildPublishIndex(gulp, plugins, 'publish', done); break;
      default: done();
    }
  };

  function _buildCommonIndex(gulp, plugins, option, destination) {
    return gulp.src(join(APP_SRC, 'index.html'))
      .pipe(inject('shims', option))
      .pipe(inject('libs', option))
      .pipe(inject())
      .pipe(plugins.template(templateLocals()))
      .pipe(gulp.dest(destination));
  }


  function buildDevIndex(gulp, plugins, option, done) {
    _buildCommonIndex(gulp, plugins, option, APP_DEST);
    return done();
  }

  function buildProdIndex(gulp, plugins, option, done) {
    _buildCommonIndex(gulp, plugins, option, APP_DEST);
    return done();
  }

  function buildPublishIndex(gulp, plugins, option, done) {
    _buildCommonIndex(gulp, plugins, option, APP_PRO);
    return done();
  }

  function inject(name?: string, option?: string) {
    return plugins.inject(gulp.src(getInjectablesDependenciesRef(name), { read: false }), {
      name,
      transform: transformPath(plugins, option)
    });
  }

  function getInjectablesDependenciesRef(name?: string) {
    return DEV_DEPENDENCIES
      .filter(dep => dep['inject'] && dep['inject'] === (name || true))
      .map(mapPath);
  }

  function mapPath(dep) {
    let envPath = dep.src;
    if (envPath.startsWith(APP_SRC)) {
      envPath = join(APP_DEST, dep.src.replace(APP_SRC, ''));
    }
    return envPath;
  }
};
