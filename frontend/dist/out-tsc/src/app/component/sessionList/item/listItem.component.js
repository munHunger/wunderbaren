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
var SessionListItemComponent = /** @class */ (function () {
    function SessionListItemComponent() {
        this.copied = false;
        this.onCopy = new core_1.EventEmitter();
        this.onClick = new core_1.EventEmitter();
    }
    SessionListItemComponent.prototype.next = function () {
        this.onClick.emit();
    };
    SessionListItemComponent.prototype.copy = function () {
        this.copied = true;
        this.onCopy.emit();
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], SessionListItemComponent.prototype, "name", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], SessionListItemComponent.prototype, "role", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], SessionListItemComponent.prototype, "onCopy", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], SessionListItemComponent.prototype, "onClick", void 0);
    SessionListItemComponent = __decorate([
        core_1.Component({
            selector: 'session-list-item',
            templateUrl: './listItem.component.html',
            styleUrls: ['./listItem.component.css']
        })
    ], SessionListItemComponent);
    return SessionListItemComponent;
}());
exports.SessionListItemComponent = SessionListItemComponent;
//# sourceMappingURL=listItem.component.js.map