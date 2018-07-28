"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var platform_browser_1 = require("@angular/platform-browser");
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/common/http");
var cookies_service_1 = require("angular2-cookie/services/cookies.service");
var ngx_charts_1 = require("@swimlane/ngx-charts");
var animations_1 = require("@angular/platform-browser/animations");
var app_component_1 = require("./component/app/app.component");
var notfound_component_1 = require("./component/notfound/notfound.component");
var question_component_1 = require("./component/question/question.component");
var header_component_1 = require("./component/header/header.component");
var cookie_component_1 = require("./component/cookie/cookie.component");
var login_component_1 = require("./component/login/login.component");
var register_component_1 = require("./component/register/register.component");
var profile_component_1 = require("./component/profile/profile.component");
var profileItem_component_1 = require("./component/profile/item/profileItem.component");
var questionnaire_service_1 = require("./service/questionnaire.service");
var user_service_1 = require("./service/user.service");
var persistant_service_1 = require("./service/persistant.service");
var start_component_1 = require("./component/start/start.component");
var sessionList_component_1 = require("./component/sessionList/sessionList.component");
var listItem_component_1 = require("./component/sessionList/item/listItem.component");
var newItem_component_1 = require("./component/sessionList/new/newItem.component");
var result_component_1 = require("./component/result/result.component");
var resultStatus_component_1 = require("./component/result/status/resultStatus.component");
var resultStatistics_component_1 = require("./component/result/statistics/resultStatistics.component");
var summary_component_1 = require("./component/result/summary/summary.component");
var pie_component_1 = require("./component/pie/pie.component");
var comment_component_1 = require("./component/comment/comment.component");
var appRoutes = [
    { path: '', component: start_component_1.StartComponent },
    { path: 'login', component: login_component_1.LoginComponent },
    { path: 'sessionList', component: sessionList_component_1.SessionListComponent },
    { path: 'register', component: register_component_1.RegisterComponent },
    { path: 'profile/:id', component: profile_component_1.ProfileComponent },
    { path: 'question/:id', component: question_component_1.QuestionComponent },
    { path: 'result/:id', component: result_component_1.ResultComponent, children: [
            { path: '', redirectTo: "status", pathMatch: 'full' },
            { path: 'status', component: resultStatus_component_1.ResultStatusComponent },
            { path: 'statistics', component: resultStatistics_component_1.ResultStatisticsComponent },
            { path: 'summary', component: summary_component_1.ResultSummaryComponent }
        ] },
    { path: '**', component: notfound_component_1.NotFoundComponent }
];
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [
                app_component_1.AppComponent,
                header_component_1.HeaderComponent,
                cookie_component_1.CookieComponent,
                login_component_1.LoginComponent,
                register_component_1.RegisterComponent,
                profile_component_1.ProfileComponent,
                profileItem_component_1.ProfileItemComponent,
                notfound_component_1.NotFoundComponent,
                question_component_1.QuestionComponent,
                start_component_1.StartComponent,
                sessionList_component_1.SessionListComponent,
                listItem_component_1.SessionListItemComponent,
                newItem_component_1.NewSessionListItemComponent,
                result_component_1.ResultComponent,
                resultStatus_component_1.ResultStatusComponent,
                resultStatistics_component_1.ResultStatisticsComponent,
                summary_component_1.ResultSummaryComponent,
                pie_component_1.PieComponent,
                comment_component_1.CommentModalComponent
            ],
            imports: [
                platform_browser_1.BrowserModule,
                forms_1.FormsModule,
                http_1.HttpClientModule,
                ngx_charts_1.NgxChartsModule,
                animations_1.BrowserAnimationsModule,
                router_1.RouterModule.forRoot(appRoutes)
            ],
            providers: [
                questionnaire_service_1.QuestionnaireService,
                user_service_1.UserService,
                persistant_service_1.PersistantService,
                cookies_service_1.CookieService
            ],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map