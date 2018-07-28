import {Component, AfterViewInit, ViewChild, ElementRef} from "@angular/core";
import {Observable} from "rxjs";
import { WunderbarService } from "../../service/wunderbaren.service";
import {CookieService} from "angular2-cookie/core";
import { Router } from "@angular/router";

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements AfterViewInit {

    public static singleton : LoginComponent;
    private pin: number;
    private rfid: string;

    @ViewChild('rfidInput') rfidElement: ElementRef;

    constructor(private service: WunderbarService, private cookieService:CookieService, private router: Router) {
        this.login();
        LoginComponent.singleton = this;
    }

    ngAfterViewInit() {
        this.rfidElement.nativeElement.focus();
    }

    private login() {
        this.pin = Math.floor(Math.random() * 89999999 + 10000000);
        this.service.initLogin("" + this.pin).subscribe(res => {
            this.cookieService.put("access_token", res.headers.get("access_token"));
            this.service.updateHeaders();
            this.router.navigate(['category']);
        });
    }

    private loginRFID() {
        this.service.completeLogin("" + this.pin, this.rfid);
        this.rfid = "";
    }

    private getPin(): string {
        let result = "" + this.pin;
        result = result.slice(0, 4) + " " + result.slice(4, 8);
        return result;
    }
}