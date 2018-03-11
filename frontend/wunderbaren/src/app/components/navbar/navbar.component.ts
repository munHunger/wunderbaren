import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { WunderbarService } from "../../service/wunderbaren.service";
import { CookieService } from "angular2-cookie/core";

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent {

    constructor(private router: Router, private cookieService: CookieService) {}

    private home() {
        this.router.navigate(["category"]);
    }

    private logout() {
        this.cookieService.removeAll();
        this.router.navigate(["login"]);
    }
}