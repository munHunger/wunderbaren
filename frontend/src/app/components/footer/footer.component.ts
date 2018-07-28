import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { WunderbarService } from "../../service/wunderbaren.service";

@Component({
    selector: 'payment-footer',
    templateUrl: './footer.component.html'
})
export class FooterComponent {
    constructor(private service: WunderbarService, private router: Router) {
    }

    private pay(): void {
        this.router.navigate(["payment"]);
    }
}