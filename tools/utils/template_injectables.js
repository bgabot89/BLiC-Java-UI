"use strict";
var slash = require('slash');
var path_1 = require('path');
var FIRST_PATH_SEGMENT = /^\/?[^\/]*/;
function transformPath(plugins, env) {
    return function (filePath) {
        filePath = env === 'publish' ? filePath.replace(FIRST_PATH_SEGMENT, '/lib') : filePath;
        arguments[0] = path_1.join('.', filePath);
        return slash(plugins.inject.transform.apply(plugins.inject.transform, arguments));
    };
}
exports.transformPath = transformPath;
//# sourceMappingURL=template_injectables.js.map