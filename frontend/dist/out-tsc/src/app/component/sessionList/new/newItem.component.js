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
var questionnaire_service_1 = require("../../../service/questionnaire.service");
var NewSessionListItemComponent = /** @class */ (function () {
    function NewSessionListItemComponent(service) {
        this.service = service;
        this.onCreate = new core_1.EventEmitter();
        this.showValue = false;
        this.showChange = new core_1.EventEmitter();
    }
    Object.defineProperty(NewSessionListItemComponent.prototype, "show", {
        get: function () {
            return this.showValue;
        },
        set: function (value) {
            this.showValue = value;
            this.showChange.emit(this.showValue);
        },
        enumerable: true,
        configurable: true
    });
    NewSessionListItemComponent.prototype.submit = function () {
        var _this = this;
        this.service.createSession(this.role, this.formName, function () {
            _this.onCreate.emit();
            _this.close();
        }, this);
    };
    NewSessionListItemComponent.prototype.close = function () {
        this.show = false;
    };
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], NewSessionListItemComponent.prototype, "onCreate", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], NewSessionListItemComponent.prototype, "showChange", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], NewSessionListItemComponent.prototype, "show", null);
    NewSessionListItemComponent = __decorate([
        core_1.Component({
            selector: 'new-list-item',
            templateUrl: './newItem.component.html',
            styleUrls: ['./newItem.component.css']
        }),
        __metadata("design:paramtypes", [questionnaire_service_1.QuestionnaireService])
    ], NewSessionListItemComponent);
    return NewSessionListItemComponent;
}());
exports.NewSessionListItemComponent = NewSessionListItemComponent;
//# sourceMappingURL=newItem.component.js.map