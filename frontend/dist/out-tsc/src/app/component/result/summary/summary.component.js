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
var persistant_service_1 = require("../../../service/persistant.service");
var questionnaire_service_1 = require("../../../service/questionnaire.service");
var ResultSummaryComponent = /** @class */ (function () {
    function ResultSummaryComponent(persistantService, service) {
        this.persistantService = persistantService;
        this.service = service;
        this.selected = 0;
        this.comments = [];
        this.showRecommendations = true;
        this.showComments = false;
    }
    ResultSummaryComponent.prototype.select = function (index) {
        this.selected = index;
        if (this.persistantService.compiledQuestionnaire && this.persistantService.categoryComments) {
            var list = this.persistantService.categoryComments;
            for (var i = 0; i < list.length; i++)
                if (list[i].category === this.persistantService.compiledQuestionnaire.categories[this.selected].name) {
                    this.comments = list[i].questionComments;
                    this.categoryComment = list[i].comment.trustComment;
                    this.categoryRecommendation = list[i].comment.trustRecommendation;
                }
        }
    };
    ResultSummaryComponent.prototype.getComments = function () {
        if (this.comments) {
            return this.comments.filter(function (comment) { return comment.trustComment; }).map(function (comment) { return comment.trustComment; });
        }
    };
    ResultSummaryComponent.prototype.getRecommendations = function () {
        if (this.comments)
            return this.comments.filter(function (comment) { return comment.trustRecommendation; }).map(function (comment) { return comment.trustRecommendation; });
    };
    ResultSummaryComponent.prototype.ngOnInit = function () {
        this.select(0);
    };
    ResultSummaryComponent.prototype.getQuestionnaire = function () {
        return this.persistantService.compiledQuestionnaire;
    };
    ResultSummaryComponent.prototype.getCategories = function () {
        var result = [];
        if (!this.persistantService.compiledQuestionnaire)
            return [];
        for (var i = 0; i < this.persistantService.compiledQuestionnaire.categories.length; i++)
            result.push(this.persistantService.compiledQuestionnaire.categories[i].name);
        return result;
    };
    ResultSummaryComponent.prototype.getSelectedName = function () {
        if (this.persistantService.compiledQuestionnaire != undefined)
            return this.persistantService.compiledQuestionnaire.categories[this.selected].name;
    };
    ResultSummaryComponent = __decorate([
        core_1.Component({
            selector: 'result-summary',
            templateUrl: './summary.component.html',
            styleUrls: ['./summary.component.css']
        }),
        __metadata("design:paramtypes", [persistant_service_1.PersistantService, questionnaire_service_1.QuestionnaireService])
    ], ResultSummaryComponent);
    return ResultSummaryComponent;
}());
exports.ResultSummaryComponent = ResultSummaryComponent;
//# sourceMappingURL=summary.component.js.map