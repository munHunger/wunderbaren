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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var cookies_service_1 = require("angular2-cookie/services/cookies.service");
var CookieComponent = /** @class */ (function () {
    function CookieComponent(cookieService) {
        this.cookieService = cookieService;
        this.show = true;
        if (cookieService.get("cookie"))
            this.toggle();
    }
    CookieComponent.prototype.toggle = function () {
        this.show = !this.show;
        this.cookieService.put("cookie", "true");
    };
    CookieComponent = __decorate([
        core_1.Component({
            selector: 'cookie',
            templateUrl: './cookie.component.html',
            styleUrls: ['./cookie.component.css']
        }),
        __metadata("design:paramtypes", [cookies_service_1.CookieService])
    ], CookieComponent);
    return CookieComponent;
}());
exports.CookieComponent = CookieComponent;
//# sourceMappingURL=cookie.component.js.map