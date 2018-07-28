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
var user_service_1 = require("../../service/user.service");
var persistant_service_1 = require("../../service/persistant.service");
var router_1 = require("@angular/router");
var HeaderComponent = /** @class */ (function () {
    function HeaderComponent(userService, persistantService, router) {
        this.userService = userService;
        this.persistantService = persistantService;
        this.router = router;
    }
    HeaderComponent.prototype.logout = function () {
        this.userService.logout();
        this.router.navigate(["login"]);
    };
    HeaderComponent.prototype.showLogout = function () {
        return this.persistantService.jwt != undefined;
    };
    HeaderComponent.prototype.showCreate = function () {
        return this.persistantService.jwt == undefined && location.pathname !== "/register" && location.pathname !== "/login";
    };
    HeaderComponent.prototype.isAdmin = function () {
        return this.userService.isAdmin();
    };
    HeaderComponent.prototype.goToRegister = function () {
        this.router.navigate(["register"]);
    };
    HeaderComponent.prototype.goToSessionList = function () {
        this.router.navigate(["sessionList"]);
    };
    HeaderComponent = __decorate([
        core_1.Component({
            selector: 'header',
            templateUrl: './header.component.html',
            styleUrls: ['./header.component.css']
        }),
        __metadata("design:paramtypes", [user_service_1.UserService, persistant_service_1.PersistantService, router_1.Router])
    ], HeaderComponent);
    return HeaderComponent;
}());
exports.HeaderComponent = HeaderComponent;
//# sourceMappingURL=header.component.js.map