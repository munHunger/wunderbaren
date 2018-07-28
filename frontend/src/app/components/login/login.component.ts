import {Component} from "@angular/core";
import {Observable} from "rxjs";
import { WunderbarService } from "../../service/wunderbaren.service";
import {CookieService} from "angular2-cookie/core";
import { Router } from "@angular/router";

@Component({
  selector: 'login',
  templateUrl: './login.component.html'
})
export class LoginComponent {

    public static singleton : LoginComponent;
    private pin: number;

    constructor(private service: WunderbarService, private cookieService:CookieService, private router: Router) {
        this.login();
        LoginComponent.singleton = this;
    }

    private login() {
        this.pin = Math.floor(Math.random() * 89999999 + 10000000);
        this.service.initLogin("" + this.pin).subscribe(res => {
            this.cookieService.put("access_token", res.headers.get("access_token"));
            this.service.login(res.headers.get("access_token"));
            this.router.navigate(['category']);
        });
    }

    private getPin(): string {
        let result = "" + this.pin;
        result = result.slice(0, 4) + " " + result.slice(4, 8);
        return result;
    }
}