"use strict";
var codeChangeTool = require('./code_change_tools');
function serveSPA() {
    codeChangeTool.listen();
}
exports.serveSPA = serveSPA;
function notifyLiveReload(e) {
    var fileName = e.path;
    codeChangeTool.changed(fileName);
}
exports.notifyLiveReload = notifyLiveReload;
//# sourceMappingURL=server.js.map