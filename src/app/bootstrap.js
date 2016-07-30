"use strict";
var platform_browser_dynamic_1 = require('@angular/platform-browser-dynamic');
var http_1 = require('@angular/http');
var forms_1 = require('@angular/forms');
var core_1 = require('@angular/core');
var app_component_1 = require('./app.component');
core_1.enableProdMode();
platform_browser_dynamic_1.bootstrap(app_component_1.AppComponent, [
    forms_1.disableDeprecatedForms(),
    forms_1.provideForms(),
    http_1.HTTP_PROVIDERS
]).catch(function (err) { return console.error(err); });
//# sourceMappingURL=bootstrap.js.map