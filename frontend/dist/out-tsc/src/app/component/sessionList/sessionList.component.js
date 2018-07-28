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
var router_1 = require("@angular/router");
var persistant_service_1 = require("../../service/persistant.service");
var questionnaire_service_1 = require("../../service/questionnaire.service");
var SessionListComponent = /** @class */ (function () {
    function SessionListComponent(service, router, persistantService) {
        this.service = service;
        this.router = router;
        this.persistantService = persistantService;
        this.list = [];
        this.update();
    }
    SessionListComponent.prototype.update = function () {
        var _this = this;
        this.service.getList().subscribe(function (res) {
            _this.list = res;
        });
    };
    SessionListComponent.prototype.getList = function () {
        var result = [];
        for (var i = 0; i < this.list.length; i++)
            if (this.list[i].session)
                result.push(this.list[i]);
        return result;
    };
    SessionListComponent.prototype.redirect = function (item) {
        this.router.navigate(["result", item.session]);
    };
    SessionListComponent.prototype.copy = function (item) {
        var selBox = document.createElement('textarea');
        selBox.style.position = 'fixed';
        selBox.style.left = '0';
        selBox.style.top = '0';
        selBox.style.opacity = '0';
        selBox.value = window.location.host + "/profile/" + item.session;
        document.body.appendChild(selBox);
        selBox.focus();
        selBox.select();
        document.execCommand('copy');
        document.body.removeChild(selBox);
    };
    SessionListComponent.prototype.openNewWindow = function () {
        this.showNew = true;
    };
    SessionListComponent = __decorate([
        core_1.Component({
            selector: 'session-list',
            templateUrl: './sessionList.component.html',
            styleUrls: ['./sessionList.component.css']
        }),
        __metadata("design:paramtypes", [questionnaire_service_1.QuestionnaireService, router_1.Router, persistant_service_1.PersistantService])
    ], SessionListComponent);
    return SessionListComponent;
}());
exports.SessionListComponent = SessionListComponent;
//# sourceMappingURL=sessionList.component.js.map