"use strict";
var config_1 = require('../config');
var browserSync = require('browser-sync');
var runServer = function () {
    var routes = (_a = {},
        _a["/" + config_1.APP_DEST] = config_1.APP_DEST,
        _a['/node_modules'] = 'node_modules',
        _a
    );
    browserSync({
        middleware: [require('connect-history-api-fallback')()],
        port: config_1.PORT,
        startPath: '/',
        server: {
            baseDir: config_1.APP_DEST,
            routes: routes
        }
    });
    var _a;
};
var listen = function () { return runServer(); };
exports.listen = listen;
var changed = function (files) {
    if (!(files instanceof Array)) {
        files = [files];
    }
    browserSync.reload(files);
};
exports.changed = changed;
//# sourceMappingURL=code_change_tools.js.map