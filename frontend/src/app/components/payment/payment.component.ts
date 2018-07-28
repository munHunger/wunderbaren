import {Component, AfterViewInit, ElementRef, ViewChild} from "@angular/core";
import {Observable} from "rxjs";
import { WunderbarService } from "../../service/wunderbaren.service";
import {CookieService} from "angular2-cookie/core";
import { Router } from "@angular/router";
import { Item } from "../../model/item.model";

@Component({
  selector: 'payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements AfterViewInit {

    private rfid: string;

    @ViewChild('rfidInput') rfidElement: ElementRef;

    public static singleton : PaymentComponent;

    constructor(private service: WunderbarService, private cookieService:CookieService, private router: Router) {
        PaymentComponent.singleton = this;
        this.initPayment();
    }

    ngAfterViewInit() {
        this.rfidElement.nativeElement.focus();
    }

    private initPayment() {
        this.service.initiatePayment().subscribe(res => {
            this.cookieService.remove("order");
            this.service.order = [];
            this.router.navigate(['category']);
        });
    }

    private completePayment() {
        this.service.completePayment(this.rfid);
        this.rfid = "";
    }
    
    private completePaymentSwish() {
        this.service.completePaymentSwish();
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