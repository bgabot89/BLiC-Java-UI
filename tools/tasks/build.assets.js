"use strict";
var path_1 = require('path');
var config_1 = require('../config');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var rename = require('gulp-rename');
var minifyCSS = require('gulp-minify-css');
var concat = require('gulp-concat');
function _buildCommonAssets(gulp, destination) {
    gulp.src([
        path_1.join(config_1.APP_SRC, '**'),
        '!' + path_1.join(config_1.APP_SRC, '**', '*.ts'),
        '!' + path_1.join(config_1.APP_SRC, '*.css'),
        '!' + path_1.join(config_1.APP_SRC, 'system.config.prod.js'),
        '!' + path_1.join(config_1.APP_SRC, 'system.config.dev.js'),
    ])
        .pipe(gulp.dest(destination));
    return gulp.src(path_1.join(config_1.APP_SRC, '**/*.css'))
        .pipe(minifyCSS())
        .pipe(sourcemaps.init())
        .pipe(autoprefixer())
        .pipe(concat('styles.min.css'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(destination));
}
function _buildDev(gulp, done) {
    _buildCommonAssets(gulp, config_1.APP_DEST);
    gulp.src(path_1.join(config_1.APP_SRC, 'system.config.dev.js'))
        .pipe(rename('system.config.js'))
        .pipe(gulp.dest(config_1.APP_DEST));
    return done();
}
function _buildProd(gulp, done) {
    _buildCommonAssets(gulp, config_1.APP_DEST);
    gulp.src(path_1.join(config_1.APP_SRC, 'system.config.prod.js'))
        .pipe(rename('system.config.js'))
        .pipe(gulp.dest(config_1.APP_DEST));
    return done();
}
function _buildPublish(gulp, done) {
    _buildCommonAssets(gulp, config_1.APP_PRO);
    gulp.src(path_1.join(config_1.APP_SRC, 'system.config.prod.js'))
        .pipe(rename('system.config.js'))
        .pipe(gulp.dest(config_1.APP_PRO));
    return done();
}
module.exports = function buildAssets(gulp, plugins, option) {
    return function (done) {
        switch (option) {
            case 'dev':
                _buildDev(gulp, done);
                break;
            case 'prod':
                _buildProd(gulp, done);
                break;
            case 'publish':
                _buildPublish(gulp, done);
                break;
            default: done();
        }
    };
};
//# sourceMappingURL=build.assets.js.map