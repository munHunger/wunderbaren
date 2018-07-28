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
var questionnaire_model_1 = require("../../model/questionnaire.model");
var PieComponent = /** @class */ (function () {
    function PieComponent() {
        this.radius = 100;
        this.xOffset = 100;
        this.yOffset = 20;
    }
    PieComponent.prototype.getTextAnchor = function (index) {
        var a = 360 / this.questionnaire.categories.length * index;
        if (a >= 180)
            return "end";
        return "start";
    };
    PieComponent.prototype.getColor = function (index) {
        var colors = ["#548392", "#6C9AA9", "#82B3C3", "#87C0D3", "#8CCFE5", "#A1DBEF", "#BFE5F3", "#D4EAF2", "#386A7C"];
        return colors[index % colors.length];
    };
    PieComponent.prototype.getTextTransform = function (index) {
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
    PieComponent.prototype.getSliceTransform = function (index) {
        var x = this.radius + this.xOffset;
        var y = this.radius + this.yOffset;
        return 'translate(' + x + ', ' + y + ') rotate(' + (360 / this.questionnaire.categories.length * index) + ') translate(' + -this.radius + ', ' + -this.radius + ')';
    };
    PieComponent.prototype.getArc = function () {
        var a = (360 / this.questionnaire.categories.length) * Math.PI / 180;
        var z = Math.sqrt(Math.pow(this.radius, 2) * 2 - 2 * Math.pow(this.radius, 2) * Math.cos(a));
        var x = Math.sin(a) * this.radius;
        var y = Math.sqrt(Math.pow(z, 2) - Math.pow(x, 2));
        x += this.radius;
        return 'M100,100 L100,0 A100,100 1 0,1 ' + x + ', ' + y + ' z';
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", questionnaire_model_1.Questionnaire)
    ], PieComponent.prototype, "questionnaire", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], PieComponent.prototype, "radius", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], PieComponent.prototype, "xOffset", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], PieComponent.prototype, "yOffset", void 0);
    PieComponent = __decorate([
        core_1.Component({
            selector: 'pie',
            templateUrl: './pie.component.html',
            styleUrls: ['./pie.component.css']
        })
    ], PieComponent);
    return PieComponent;
}());
exports.PieComponent = PieComponent;
//# sourceMappingURL=pie.component.js.map