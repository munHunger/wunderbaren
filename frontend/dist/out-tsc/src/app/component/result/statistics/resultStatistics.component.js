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
var ResultStatisticsComponent = /** @class */ (function () {
    function ResultStatisticsComponent(persistantService, service) {
        this.persistantService = persistantService;
        this.service = service;
        this.showComment = false;
        this.showRecommendation = false;
        this.selected = 0;
        this.charts = [];
        this.colorScheme = {
            domain: ['#548392', '#6C9AA9', '#82B3C3', '#87C0D3', '#8CCFE5', '#A1DBEF', '#BFE5F3', '#D4EAF2', '#386A7C']
        };
    }
    ResultStatisticsComponent.prototype.getName = function () {
        if (!this.persistantService.compiledQuestionnaire)
            return "";
        return this.persistantService.compiledQuestionnaire.categories[this.selected].name;
    };
    ResultStatisticsComponent.prototype.getComment = function () {
        if (!this.persistantService.categoryComments)
            return "";
        var name = this.getName();
        for (var i = 0; i < this.persistantService.categoryComments.length; i++) {
            if (this.persistantService.categoryComments[i].category === name)
                return this.persistantService.categoryComments[i].comment.trustComment;
        }
    };
    ResultStatisticsComponent.prototype.getRecommendation = function () {
        if (!this.persistantService.categoryComments)
            return "";
        var name = this.getName();
        for (var i = 0; i < this.persistantService.categoryComments.length; i++) {
            if (this.persistantService.categoryComments[i].category === name)
                return this.persistantService.categoryComments[i].comment.trustRecommendation;
        }
    };
    ResultStatisticsComponent.prototype.getCharts = function (category) {
        var result = [];
        for (var i = 0; i < category.questions.length; i++)
            result.push({
                name: category.questions[i].question,
                id: category.questions[i].id,
                data: category.questions[i].options
            });
        return result;
    };
    ResultStatisticsComponent.prototype.next = function () {
        this.step(1);
    };
    ResultStatisticsComponent.prototype.previous = function () {
        this.step(-1);
    };
    ResultStatisticsComponent.prototype.step = function (value) {
        var flatMap = [];
        var index = 0;
        var count = 0;
        for (var n = 0; n < this.persistantService.compiledQuestionnaire.categories.length; n++) {
            for (var m = 0; m < this.persistantService.compiledQuestionnaire.categories[n].questions.length; m++) {
                flatMap.push(this.persistantService.compiledQuestionnaire.categories[n].questions[m]);
                if (flatMap[flatMap.length - 1].id === this.detail.chart.id) {
                    index = count;
                }
                count++;
            }
        }
        //Javascript % is "remainder" and not modulo, therefore this hack is needed
        this.goToQuestion(flatMap[(((index + value) % flatMap.length) + flatMap.length) % flatMap.length].id);
    };
    ResultStatisticsComponent.prototype.submitComment = function (comment) {
        if (this.detail) {
            this.service.addCommentOnQuestion(this.detail.chart.id, comment, this.persistantService.compiledQuestionnaire.session);
            this.detail.comment.trustComment = comment;
        }
        else {
            this.service.addCommentOnCategory(this.getName(), comment, this.persistantService.compiledQuestionnaire.session);
            var name_1 = this.getName();
            for (var i = 0; i < this.persistantService.categoryComments.length; i++) {
                if (this.persistantService.categoryComments[i].category === name_1) {
                    this.persistantService.categoryComments[i].comment.trustComment = comment;
                    break;
                }
            }
        }
        this.showComment = false;
    };
    ResultStatisticsComponent.prototype.submitRecommendation = function (recommendation) {
        if (this.detail) {
            this.service.addRecommendationOnQuestion(this.detail.chart.id, recommendation, this.persistantService.compiledQuestionnaire.session);
            this.detail.comment.trustRecommendation = recommendation;
        }
        else {
            this.service.addRecommendationOnCategory(this.getName(), recommendation, this.persistantService.compiledQuestionnaire.session);
            var name_2 = this.getName();
            for (var i = 0; i < this.persistantService.categoryComments.length; i++) {
                if (this.persistantService.categoryComments[i].category === name_2) {
                    this.persistantService.categoryComments[i].comment.trustRecommendation = recommendation;
                    break;
                }
            }
        }
        this.showRecommendation = false;
    };
    ResultStatisticsComponent.prototype.reset = function () {
        this.detail = undefined;
    };
    ResultStatisticsComponent.prototype.goToQuestion = function (id) {
        var _this = this;
        var question;
        for (var n = 0; n < this.persistantService.compiledQuestionnaire.categories.length; n++) {
            for (var i = 0; i < this.persistantService.compiledQuestionnaire.categories[n].questions.length; i++) {
                if (this.persistantService.compiledQuestionnaire.categories[n].questions[i].id === id) {
                    question = this.persistantService.compiledQuestionnaire.categories[n].questions[i];
                    this.select(n);
                    this.service.getQuestionComments(question.id, this.persistantService.compiledQuestionnaire.session).subscribe(function (res) {
                        _this.detail = {
                            chart: {
                                name: question.question,
                                id: question.id,
                                data: question.options
                            },
                            comment: res
                        };
                    });
                    break;
                }
            }
        }
    };
    ResultStatisticsComponent.prototype.select = function (index) {
        this.selected = index;
        if (!this.persistantService.compiledQuestionnaire)
            return;
        this.charts = this.getCharts(this.persistantService.compiledQuestionnaire.categories[index]);
    };
    ResultStatisticsComponent.prototype.ngOnInit = function () {
        this.select(0);
    };
    ResultStatisticsComponent.prototype.getCategories = function () {
        var result = [];
        if (!this.persistantService.compiledQuestionnaire)
            return [];
        for (var i = 0; i < this.persistantService.compiledQuestionnaire.categories.length; i++)
            result.push(this.persistantService.compiledQuestionnaire.categories[i].name);
        return result;
    };
    ResultStatisticsComponent = __decorate([
        core_1.Component({
            selector: 'result-statistics',
            templateUrl: './resultStatistics.component.html',
            styleUrls: ['./resultStatistics.component.css']
        }),
        __metadata("design:paramtypes", [persistant_service_1.PersistantService, questionnaire_service_1.QuestionnaireService])
    ], ResultStatisticsComponent);
    return ResultStatisticsComponent;
}());
exports.ResultStatisticsComponent = ResultStatisticsComponent;
//# sourceMappingURL=resultStatistics.component.js.map