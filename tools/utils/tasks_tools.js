"use strict";
var gulp = require('gulp');
var util = require('gulp-util');
var chalk = require('chalk');
var gulpLoadPlugins = require('gulp-load-plugins');
var _runSequence = require('run-sequence');
var fs_1 = require('fs');
var path_1 = require('path');
var config_1 = require('../config');
var TASKS_PATH = path_1.join(config_1.TOOLS_DIR, 'tasks');
function task(taskName, option) {
    util.log('loading task', chalk.yellow(taskName, option || ''));
    return require(path_1.join('..', 'tasks', taskName))(gulp, gulpLoadPlugins(), option);
}
exports.task = task;
function runSequence() {
    var sequence = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        sequence[_i - 0] = arguments[_i];
    }
    var tasks = [];
    var _sequence = sequence.slice(0);
    sequence.pop();
    _scanDir(TASKS_PATH, function (taskName) { return tasks.push(taskName); });
    sequence.forEach(function (task) {
        if (tasks.indexOf(task) > -1) {
            _registerTask(task);
        }
    });
    return _runSequence.apply(void 0, _sequence);
}
exports.runSequence = runSequence;
function _registerTask(taskName, fileName, option) {
    if (option === void 0) { option = ''; }
    gulp.task(taskName, task(fileName || taskName, option));
}
function _scanDir(root, cb) {
    if (!fs_1.existsSync(root))
        return;
    walk(root);
    function walk(path) {
        var files = fs_1.readdirSync(path);
        for (var i = 0, j = files.length; i < j; i += 1) {
            var file = files[i];
            var curPath = path_1.join(path, file);
            if (fs_1.lstatSync(curPath).isFile() && /\.ts$/.test(file)) {
                var taskName = file.replace(/(\.ts)/, '');
                cb(taskName);
            }
        }
    }
}
//# sourceMappingURL=tasks_tools.js.map