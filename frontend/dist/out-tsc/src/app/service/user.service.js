"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var http_1 = require("@angular/common/http");
var core_1 = require("@angular/core");
var base_service_1 = require("./base.service");
var cookies_service_1 = require("angular2-cookie/services/cookies.service");
var persistant_service_1 = require("./persistant.service");
var UserService = /** @class */ (function (_super) {
    __extends(UserService, _super);
    function UserService(http, cookieService, persistantService) {
        var _this = _super.call(this) || this;
        _this.http = http;
        _this.cookieService = cookieService;
        _this.persistantService = persistantService;
        return _this;
    }
    UserService.prototype.logout = function () {
        this.persistantService.jwt = undefined;
        this.cookieService.remove("jwt");
    };
    UserService.prototype.login = function (email, password, stayLoggedIn, callback, context) {
        var _this = this;
        var headers = new http_1.HttpHeaders({
            'Content-Type': 'application/x-www-form-urlencoded'
        });
        var body = "username=" + encodeURI(email) + "&password=" + encodeURI(password);
        this.http.post(this.baseURL + "/login", body, { headers: headers, observe: 'response' }).subscribe(function (resp) {
            _this.persistantService.jwt = resp.headers.get("jwt");
            if (stayLoggedIn)
                _this.cookieService.put("jwt", resp.headers.get("jwt"));
            callback.call(context);
        });
    };
    UserService.prototype.getRole = function () {
        return JSON.parse(atob(this.persistantService.jwt.substr(this.persistantService.jwt.indexOf(".") + 1, this.persistantService.jwt.lastIndexOf(".") - this.persistantService.jwt.indexOf(".") - 1))).role;
    };
    UserService.prototype.isAdmin = function () {
        return this.getRole() !== "USER";
    };
    UserService.prototype.createUser = function (email, password, callback, context) {
        var createRequest = /** @class */ (function () {
            function createRequest() {
                this.email = email;
                this.password = password;
            }
            return createRequest;
        }());
        var body = new createRequest();
        this.http.post(this.baseURL + "/user", body).subscribe(function (data) {
            callback.call(context);
        });
    };
    UserService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.HttpClient, cookies_service_1.CookieService, persistant_service_1.PersistantService])
    ], UserService);
    return UserService;
}(base_service_1.BaseService));
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map