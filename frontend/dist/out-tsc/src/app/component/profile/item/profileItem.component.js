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
var category_model_1 = require("../../../model/category.model");
var router_1 = require("@angular/router");
var ProfileItemComponent = /** @class */ (function () {
    function ProfileItemComponent(router) {
        this.router = router;
    }
    ProfileItemComponent.prototype.getTotal = function () {
        if (!this.category)
            return -1;
        return this.category.questions.length;
    };
    ProfileItemComponent.prototype.getCompleted = function () {
        var completed = 0;
        for (var i = 0; i < this.category.questions.length; i++)
            if (this.category.questions[i].answer)
                completed++;
        return completed;
    };
    ProfileItemComponent.prototype.getTitle = function () {
        if (!this.category)
            return "NaN";
        return this.category.name;
    };
    ProfileItemComponent.prototype.redirectNext = function () {
        for (var i = 0; i < this.category.questions.length; i++) {
            if (this.category.questions[i].answer == null) {
                this.router.navigate(["question", this.category.questions[i].id]);
                break;
            }
        }
    };
    __decorate([
        core_1.Input("category"),
        __metadata("design:type", category_model_1.Category)
    ], ProfileItemComponent.prototype, "category", void 0);
    ProfileItemComponent = __decorate([
        core_1.Component({
            selector: 'profileItem',
            templateUrl: './profileItem.component.html',
            styleUrls: ['./profileItem.component.css']
        }),
        __metadata("design:paramtypes", [router_1.Router])
    ], ProfileItemComponent);
    return ProfileItemComponent;
}());
exports.ProfileItemComponent = ProfileItemComponent;
//# sourceMappingURL=profileItem.component.js.map