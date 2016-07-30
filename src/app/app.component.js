"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var AppComponent = (function () {
    function AppComponent() {
    }
    AppComponent = __decorate([
        core_1.Component({
            selector: 'app',
            encapsulation: core_1.ViewEncapsulation.None,
            template: "\n  <h1>Broken links checker</h1>\n  <form class=\"search\">\n    <div class=\"input-container\">\n      <input type=\"url\"\n           class=\"search-input\"\n           placeholder=\"Enter a url here and press enter\"\n      >\n      <button type=\"submit\" class=\"submit-button\">\n        <i class=\"fa fa-search\" aria-hidden=\"true\"></i>     \n      </button>   \n      <div class=\"input-border\"></div>    \n    </div>    \n  </form>\n  <div class=\"footer\">\n    <i class=\"fa fa-code\" aria-hidden=\"true\"></i>\n    by <a href=\"https://github.com/jaykan\" target=\"blank\">Jay Kan</a> with \n    <i class=\"fa fa-heart\" aria-hidden=\"true\"></i>\n    <div>\n      Fork on\n      <a href=\"https://github.com/codeforsanjose/BLiC-Java-UI\" target=\"blank\">\n        <i class=\"fa fa-github\" aria-hidden=\"true\"></i>\n      </a>\n    </div>    \n  </div>\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map