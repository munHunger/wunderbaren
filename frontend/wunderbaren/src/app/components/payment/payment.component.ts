import {Component} from "@angular/core";
import {Observable} from "rxjs";
import { WunderbarService } from "../../service/wunderbaren.service";
import {CookieService} from "angular2-cookie/core";
import { Router } from "@angular/router";
import { Item } from "../../model/item.model";

@Component({
  selector: 'payment',
  templateUrl: './payment.component.html'
})
export class PaymentComponent {

    constructor(private service: WunderbarService, private cookieService:CookieService, private router: Router) {
    }

    private getItems(): Item[] {
        return this.service.order;
    }

    private getTotal(): number {
        let total = 0;
        for(let item of this.service.order)
            total += item.cost;
        return total;
    }
}