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
var cookies_service_1 = require("angular2-cookie/services/cookies.service");
var persistant_service_1 = require("../../service/persistant.service");
var ProfileComponent = /** @class */ (function () {
    function ProfileComponent(service, activeRoute, router, cookieService, persistantService) {
        this.service = service;
        this.activeRoute = activeRoute;
        this.router = router;
        this.cookieService = cookieService;
        this.persistantService = persistantService;
        this.radius = 100;
        this.xOffset = 100;
        this.yOffset = 100;
    }
    ProfileComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.activeRoute.paramMap.subscribe(function (res) {
            _this.persistantService.questionnaireID = res.get("id");
            if (!_this.persistantService.jwt) {
                _this.router.navigate(["/login"]);
                return;
            }
            _this.service.getQuestionnaire(res.get("id")).subscribe(function (res) {
                _this.questionnaire = res;
                _this.persistantService.questionnaire = _this.questionnaire;
            });
        });
    };
    ProfileComponent.prototype.getTextAnchor = function (index) {
        var a = 360 / this.questionnaire.categories.length * index;
        if (a >= 180)
            return "end";
        return "start";
    };
    ProfileComponent.prototype.getColor = function (index) {
        var colors = ["#548392", "#6C9AA9", "#82B3C3", "#87C0D3", "#8CCFE5", "#A1DBEF", "#BFE5F3", "#D4EAF2", "#386A7C"];
        return colors[index % colors.length];
    };
    ProfileComponent.prototype.getTextTransform = function (index) {
        var a = 360 / this.questionnaire.categories.length * index;
        var halfSlice = 360 / this.questionnaire.categories.length / 2;
        var innerRotate = -(a + halfSlice);
        var aRad = a * Math.PI / 180;
        var xOffset = a >= 180 ? -30 : 30;
        var yOffset = 7;
        xOffset = 20 * Math.cos((a + halfSlice - 90) * Math.PI / 180);
        yOffset = 7 + 20 * Math.sin((a + halfSlice - 90) * Math.PI / 180);
        var x = xOffset * Math.cos(-aRad) - yOffset * Math.sin(-aRad);
        var y = yOffset * Math.cos(-aRad) + xOffset * Math.sin(-aRad);
        return 'translate(' + x + ', ' + y + ') rotate(' + halfSlice + ', 100, 100) translate(100,0) rotate(' + innerRotate + ')';
    };
    ProfileComponent.prototype.getSliceTransform = function (index) {
        var x = this.radius + this.xOffset;
        var y = this.radius + this.yOffset;
        return 'translate(' + x + ', ' + y + ') rotate(' + (360 / this.questionnaire.categories.length * index) + ') translate(' + -this.radius + ', ' + -this.radius + ')';
    };
    ProfileComponent.prototype.getArc = function () {
        var a = (360 / this.questionnaire.categories.length) * Math.PI / 180;
        var z = Math.sqrt(Math.pow(this.radius, 2) * 2 - 2 * Math.pow(this.radius, 2) * Math.cos(a));
        var x = Math.sin(a) * this.radius;
        var y = Math.sqrt(Math.pow(z, 2) - Math.pow(x, 2));
        x += this.radius;
        return 'M100,100 L100,0 A100,100 1 0,1 ' + x + ', ' + y + ' z';
    };
    ProfileComponent.prototype.submit = function () {
        this.showWarning = false;
        for (var n = 0; n < this.questionnaire.categories.length; n++)
            for (var m = 0; m < this.questionnaire.categories[n].questions.length; m++)
                this.showWarning = this.showWarning || this.questionnaire.categories[n].questions[m].answer == null;
        if (!this.showWarning)
            console.log("submit");
    };
    ProfileComponent = __decorate([
        core_1.Component({
            selector: 'profile',
            templateUrl: './profile.component.html',
            styleUrls: ['./profile.component.css']
        }),
        __metadata("design:paramtypes", [questionnaire_service_1.QuestionnaireService, router_1.ActivatedRoute, router_1.Router, cookies_service_1.CookieService, persistant_service_1.PersistantService])
    ], ProfileComponent);
    return ProfileComponent;
}());
exports.ProfileComponent = ProfileComponent;
//# sourceMappingURL=profile.component.js.map