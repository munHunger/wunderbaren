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
var questionnaire_service_1 = require("../../service/questionnaire.service");
var router_1 = require("@angular/router");
var persistant_service_1 = require("../../service/persistant.service");
var answer_model_1 = require("../../model/answer.model");
var QuestionComponent = /** @class */ (function () {
    function QuestionComponent(service, router, activeRoute, persistantService) {
        this.service = service;
        this.router = router;
        this.activeRoute = activeRoute;
        this.persistantService = persistantService;
        this.comment = "";
        this.showWarning = false;
        this.showWarning = false;
    }
    QuestionComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.showWarning = false;
        this.activeRoute.paramMap.subscribe(function (res) {
            var questionnaire = _this.persistantService.questionnaire;
            for (var n = 0; n < questionnaire.categories.length; n++) {
                for (var m = 0; m < questionnaire.categories[n].questions.length; m++) {
                    if (questionnaire.categories[n].questions[m].id === res.get("id")) {
                        _this.fullCategory = questionnaire.categories[n];
                        _this.category = _this.fullCategory.name;
                        _this.total = _this.fullCategory.questions.length;
                        _this.index = m + 1;
                        _this.question = questionnaire.categories[n].questions[m];
                        if (_this.question.answer != null) {
                            _this.comment = _this.question.answer.comment;
                            _this.selected = _this.question.answer.option[0]; //TODO: change to have a list
                        }
                        else {
                            _this.comment = "";
                            _this.selected = null;
                        }
                        return;
                    }
                }
            }
        });
    };
    QuestionComponent.prototype.submit = function () {
        var _this = this;
        if (this.selected) {
            var answer = new answer_model_1.Answer();
            answer.comment = this.comment;
            answer.questionID = this.question.id;
            answer.option = [this.selected];
            this.question.answer = answer;
            this.service.answer(this.question.id, [this.selected], this.comment, this.persistantService.questionnaire.session).subscribe(function (res) {
                _this.navigateNext();
            });
        }
        else
            this.showWarning = true;
    };
    QuestionComponent.prototype.navigatePrevious = function () {
        this.showWarning = false;
        if (this.index > 1)
            this.router.navigate(["question", this.fullCategory.questions[this.index - 2].id]);
        else
            this.router.navigate(["profile", this.persistantService.questionnaireID]);
    };
    QuestionComponent.prototype.navigateNext = function () {
        for (var i = this.index; i < this.fullCategory.questions.length; i++) {
            if (this.fullCategory.questions[i].answer == null) {
                this.router.navigate(["question", this.fullCategory.questions[i].id]);
                return;
            }
        }
        this.router.navigate(["profile", this.persistantService.questionnaireID]);
    };
    QuestionComponent.prototype.select = function (option) {
        this.selected = option;
        this.showWarning = false;
    };
    QuestionComponent = __decorate([
        core_1.Component({
            selector: 'question',
            templateUrl: './question.component.html',
            styleUrls: ['./question.component.css']
        }),
        __metadata("design:paramtypes", [questionnaire_service_1.QuestionnaireService, router_1.Router, router_1.ActivatedRoute, persistant_service_1.PersistantService])
    ], QuestionComponent);
    return QuestionComponent;
}());
exports.QuestionComponent = QuestionComponent;
//# sourceMappingURL=question.component.js.map