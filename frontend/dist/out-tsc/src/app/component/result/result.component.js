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
var ResultComponent = /** @class */ (function () {
    function ResultComponent(service, router, activeRoute, persistantService) {
        this.service = service;
        this.router = router;
        this.activeRoute = activeRoute;
        this.persistantService = persistantService;
    }
    ResultComponent.prototype.isActive = function (path) {
        return this.router.url.indexOf(path) > 0;
    };
    ResultComponent.prototype.getTitle = function () {
        if (this.session)
            return this.session.name;
    };
    ResultComponent.prototype.getSubtitle = function () {
        if (this.session)
            return this.session.role;
    };
    ResultComponent.prototype.status = function () {
        this.router.navigate(["status"], { relativeTo: this.activeRoute });
    };
    ResultComponent.prototype.statistics = function () {
        this.router.navigate(["statistics"], { relativeTo: this.activeRoute });
    };
    ResultComponent.prototype.summary = function () {
        this.router.navigate(["summary"], { relativeTo: this.activeRoute });
    };
    ResultComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.activeRoute.paramMap.subscribe(function (res) {
            _this.persistantService.questionnaireID = res.get("id");
            _this.service.getList().subscribe(function (res) {
                var list = res;
                for (var i = 0; i < list.length; i++) {
                    if (list[i].session == _this.persistantService.questionnaireID) {
                        _this.session = list[i];
                        break;
                    }
                }
            });
            _this.service.getCompiledQuestionnaire(res.get("id")).subscribe(function (res) {
                _this.questionnaire = res;
                _this.persistantService.compiledQuestionnaire = _this.questionnaire;
                _this.service.getFullComments(_this.persistantService.compiledQuestionnaire.id, _this.persistantService.compiledQuestionnaire.session).subscribe(function (res) {
                    _this.persistantService.categoryComments = res;
                });
            });
        });
    };
    ResultComponent = __decorate([
        core_1.Component({
            selector: 'result',
            templateUrl: './result.component.html',
            styleUrls: ['./result.component.css']
        }),
        __metadata("design:paramtypes", [questionnaire_service_1.QuestionnaireService, router_1.Router, router_1.ActivatedRoute, persistant_service_1.PersistantService])
    ], ResultComponent);
    return ResultComponent;
}());
exports.ResultComponent = ResultComponent;
//# sourceMappingURL=result.component.js.map