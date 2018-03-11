import { Component } from '@angular/core';
import { CookieService } from 'angular2-cookie/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent {
    constructor(private cookieService: CookieService, private router: Router) {
        if(cookieService.get("access_token") == undefined && !router.url.endsWith("login"))
            router.navigate(["login"]);
    }
}