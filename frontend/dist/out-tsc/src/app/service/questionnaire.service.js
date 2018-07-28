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
var persistant_service_1 = require("./persistant.service");
var answer_model_1 = require("../model/answer.model");
var QuestionnaireService = /** @class */ (function (_super) {
    __extends(QuestionnaireService, _super);
    function QuestionnaireService(http, persistantService) {
        var _this = _super.call(this) || this;
        _this.http = http;
        _this.persistantService = persistantService;
        return _this;
    }
    QuestionnaireService.prototype.getList = function () {
        var headers = new http_1.HttpHeaders({
            'access_token': this.persistantService.jwt,
            'accept': 'application/json'
        });
        return this.http.get(this.baseURL + "/questionnaire", { headers: headers });
    };
    QuestionnaireService.prototype.addCommentOnQuestion = function (questionID, comment, session) {
        var headers = new http_1.HttpHeaders({
            'access_token': this.persistantService.jwt
        });
        this.http.post(this.baseURL + "/comment/question/" + questionID + "?session=" + session, { trustComment: comment }, { headers: headers }).subscribe();
    };
    QuestionnaireService.prototype.addRecommendationOnQuestion = function (questionID, recommendation, session) {
        var headers = new http_1.HttpHeaders({
            'access_token': this.persistantService.jwt
        });
        this.http.post(this.baseURL + "/comment/question/" + questionID + "?session=" + session, { trustRecommendation: recommendation }, { headers: headers }).subscribe();
    };
    QuestionnaireService.prototype.addCommentOnCategory = function (category, comment, session) {
        var headers = new http_1.HttpHeaders({
            'access_token': this.persistantService.jwt
        });
        this.http.post(this.baseURL + "/comment/category/" + category + "?session=" + session, { trustComment: comment }, { headers: headers }).subscribe();
    };
    QuestionnaireService.prototype.addRecommendationOnCategory = function (category, recommendation, session) {
        var headers = new http_1.HttpHeaders({
            'access_token': this.persistantService.jwt
        });
        this.http.post(this.baseURL + "/comment/category/" + category + "?session=" + session, { trustRecommendation: recommendation }, { headers: headers }).subscribe();
    };
    QuestionnaireService.prototype.getFullComments = function (questionnaireID, session) {
        var headers = new http_1.HttpHeaders({
            'access_token': this.persistantService.jwt
        });
        return this.http.get(this.baseURL + "/comment/questionnaire/" + questionnaireID + "?session=" + session, { headers: headers });
    };
    QuestionnaireService.prototype.getQuestionComments = function (questionID, session) {
        var headers = new http_1.HttpHeaders({
            'access_token': this.persistantService.jwt
        });
        return this.http.get(this.baseURL + "/comment/question/" + questionID + "?session=" + session, { headers: headers });
    };
    QuestionnaireService.prototype.createSession = function (role, name, callback, context) {
        var _this = this;
        this.getList().subscribe(function (res) {
            var id = res[0].id;
            var headers = new http_1.HttpHeaders({
                'access_token': _this.persistantService.jwt
            });
            var Body = /** @class */ (function () {
                function Body() {
                    this.name = name;
                    this.position = role;
                    this.questionnaireID = id;
                }
                return Body;
            }());
            console.log(new Body());
            _this.http.post(_this.baseURL + "/questionnaire/session", new Body(), { headers: headers }).subscribe(function (r) {
                callback.call(context);
            });
        });
    };
    QuestionnaireService.prototype.getQuestionnaire = function (id) {
        var headers = new http_1.HttpHeaders({
            'access_token': this.persistantService.jwt
        });
        return this.http.get(this.baseURL + "/questionnaire/" + id, { headers: headers });
    };
    QuestionnaireService.prototype.getCompiledQuestionnaire = function (id) {
        var headers = new http_1.HttpHeaders({
            'access_token': this.persistantService.jwt
        });
        return this.http.get(this.baseURL + "/questionnaire/" + id + "/compiled", { headers: headers });
    };
    QuestionnaireService.prototype.answer = function (id, options, comment, session) {
        var headers = new http_1.HttpHeaders({
            'access_token': this.persistantService.jwt
        });
        var body = new answer_model_1.Answer();
        body.questionID = id;
        body.option = options;
        body.comment = comment;
        body.session = session;
        return this.http.post(this.baseURL + "/answer", body, { headers: headers });
    };
    QuestionnaireService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.HttpClient, persistant_service_1.PersistantService])
    ], QuestionnaireService);
    return QuestionnaireService;
}(base_service_1.BaseService));
exports.QuestionnaireService = QuestionnaireService;
//# sourceMappingURL=questionnaire.service.js.map