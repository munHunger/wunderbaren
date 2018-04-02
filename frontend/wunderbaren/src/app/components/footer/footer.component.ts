import { Component } from "@angular/core";
import { WunderbarService } from "app/service/wunderbaren.service";
import { Router } from "@angular/router";
import { Item } from "app/model/item.model";

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