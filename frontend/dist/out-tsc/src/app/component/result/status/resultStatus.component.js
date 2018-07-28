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
var ResultStatusComponent = /** @class */ (function () {
    function ResultStatusComponent(persistantService) {
        this.persistantService = persistantService;
    }
    ResultStatusComponent.prototype.getCompleted = function (participant) {
        if (participant.completed === 0)
            return "";
        var date = new Date(participant.completed * 1000);
        return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
    };
    ResultStatusComponent.prototype.getTotal = function () {
        if (!this.persistantService.compiledQuestionnaire)
            return 0;
        var total = 0;
        for (var i = 0; i < this.persistantService.compiledQuestionnaire.categories.length; i++)
            total += this.persistantService.compiledQuestionnaire.categories[i].questions.length;
        return total;
    };
    ResultStatusComponent.prototype.getParticipants = function () {
        if (this.persistantService.compiledQuestionnaire)
            return this.persistantService.compiledQuestionnaire.participants;
        return undefined;
    };
    ResultStatusComponent = __decorate([
        core_1.Component({
            selector: 'result-status',
            templateUrl: './resultStatus.component.html',
            styleUrls: ['./resultStatus.component.css']
        }),
        __metadata("design:paramtypes", [persistant_service_1.PersistantService])
    ], ResultStatusComponent);
    return ResultStatusComponent;
}());
exports.ResultStatusComponent = ResultStatusComponent;
//# sourceMappingURL=resultStatus.component.js.map