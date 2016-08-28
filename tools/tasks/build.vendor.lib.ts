export = function buildVendorLibs(gulp) {
  return function() {
    gulp.src(['node_modules/core-js/**']).pipe(gulp.dest('public/lib/core-js'));
    gulp.src(['node_modules/systemjs/**']).pipe(gulp.dest('public/lib/systemjs'));
    gulp.src(['node_modules/rxjs/**']).pipe(gulp.dest('public/lib/rxjs'));
    gulp.src(['node_modules/zone.js/**']).pipe(gulp.dest('public/lib/zone.js'));
    return gulp.src(['node_modules/reflect-metadata/**'])
      .pipe(gulp.dest('public/lib/reflect-metadata'));
  };
};