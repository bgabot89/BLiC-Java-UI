import * as gulp from 'gulp';
import { runSequence, task } from './tools/utils';

// -----------
// Config tasks
gulp.task('clean', done => task('clean', 'all')(done));
gulp.task('clean.public', done => task('clean', 'public')(done));

gulp.task('build.assets.dev', done => task('build.assets', 'dev')(done));
gulp.task('build.assets.prod', done => task('build.assets', 'prod')(done));
gulp.task('build.assets.publish', done => task('build.assets', 'publish')(done));

gulp.task('build.index.dev', done => task('build.index', 'dev')(done));
gulp.task('build.index.prod', done => task('build.index', 'prod')(done));
gulp.task('build.index.publish', done => task('build.index', 'publish')(done));

gulp.task('build.js.prod', done => task('build.js', 'prod')(done));
gulp.task('build.js.publish', done => task('build.js', 'publish')(done));


// -----------
// Build dev
gulp.task('build.dev', done => {
  runSequence('clean',
              'build.assets.dev',
              'build.js.dev',
              'build.index.dev',
              done
  );
});
// -----------
// Build prod
gulp.task('build.prod', done => {
  runSequence('clean',
              'build.assets.prod',
              'build.js.prod',
              'build.index.prod',
              done);
});

// -----------
// Server dev
gulp.task('serve.dev', done => {
  runSequence('build.dev',
              'server.start',
              'watch.serve',
              done
  );
});
// -----------
// Server prod
gulp.task('serve.prod', done => {
  runSequence('build.prod',
              'server.start',
              done);
});

// -----------
// build publish
gulp.task('publish.prod', done => {
  runSequence('clean.public',
              'build.assets.publish',
              'build.vendor.lib',
              'build.js.publish',
              'build.index.publish',
              'remove.publish',
              done
  );
});