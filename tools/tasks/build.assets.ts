import { join } from 'path';
import { APP_SRC, APP_DEST, APP_PRO } from '../config';
import * as autoprefixer from 'gulp-autoprefixer';
import * as sourcemaps from 'gulp-sourcemaps';
const rename = require('gulp-rename');
const minifyCSS = require('gulp-minify-css');
const concat = require('gulp-concat');

export = function buildAssets(gulp, plugins, option) {
  return function(done) {
    switch (option) {
      case 'dev'    : _buildDev(gulp, done); break;
      case 'prod'   : _buildProd(gulp, done); break;
      case 'publish': _buildPublish(gulp, done); break;
      default: done();
    }
  };
};

function _buildCommonAssets(gulp, destination:string) {
  let src = [
    join(APP_SRC, '**'),
    '!' + join(APP_SRC, '**', '*.ts'),
    '!' + join(APP_SRC, '*.css'),
    '!' + join(APP_SRC, 'system.config.prod.js'),
    '!' + join(APP_SRC, 'system.config.dev.js')
  ];

  gulp.src(src).pipe(gulp.dest(destination));

  return gulp.src(join(APP_SRC, '**/*.css'))
    .pipe(minifyCSS())
    .pipe(sourcemaps.init())
    .pipe(autoprefixer())
    .pipe(concat('styles.min.css'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(destination));

}

function _buildDev(gulp, done) {
  _buildCommonAssets(gulp, APP_DEST);

  gulp.src(join(APP_SRC, 'system.config.dev.js'))
    .pipe(rename('system.config.js'))
    .pipe(gulp.dest(APP_DEST));

  return done();
}

function _buildProd(gulp, done) {
  _buildCommonAssets(gulp, APP_DEST);
  return done();
}

function _buildPublish(gulp, done) {
  _buildCommonAssets(gulp, APP_PRO);
  return done();
}