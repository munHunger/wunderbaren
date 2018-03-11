import {Component} from "@angular/core";
import {Observable} from "rxjs";
import { WunderbarService } from "../../service/wunderbaren.service";
import {CookieService} from "angular2-cookie/core";

@Component({
  selector: 'login',
  templateUrl: './login.component.html'
})
export class LoginComponent {

    public static singleton : LoginComponent;
    private pin: number;

    constructor(private service: WunderbarService, private cookieService:CookieService) {
        this.login();
        LoginComponent.singleton = this;
    }

    private login() {
        this.pin = Math.floor(Math.random() * 89999999 + 10000000);
        this.service.initLogin("" + this.pin).catch(this.handleError).subscribe(res => {
            this.cookieService.put("access_token", res.headers.get("access_token"));
        });
    }

    private handleError(error:Response | any)
    {
        LoginComponent.singleton.login();
        return Observable.throw("");
    }

    private getPin(): string {
        let result = "" + this.pin;
        result = result.slice(0, 4) + " " + result.slice(4, 8);
        return result;
    }
}