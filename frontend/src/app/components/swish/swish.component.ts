import {Component, ViewChild, ElementRef, AfterViewInit} from "@angular/core";
import { WunderbarService } from "../../service/wunderbaren.service";
import {CookieService} from "angular2-cookie/core";
import { Router } from "@angular/router";

@Component({
  selector: 'swish',
  templateUrl: './swish.component.html',
  styleUrls: ['./swish.component.css']
})
export class SwishComponent implements AfterViewInit {

    private rfid: string;

    @ViewChild('rfidInput') rfidElement: ElementRef;

    private initated: boolean = false;

    private amount: number = 0;

    constructor(private service: WunderbarService, private cookieService:CookieService, private router: Router) {
    }

    ngAfterViewInit() {
        this.rfidElement.nativeElement.focus();
    }
    
    private initiateSwish(amount: number) {
        this.initated = true;
        this.amount = amount;
    }

    private completeSwish() {
        this.service.addSwish(this.rfid, this.amount);
        this.rfid = "";
        setTimeout(() => {
            this.router.navigate(["/"]);
        }, 1000);
    }
}