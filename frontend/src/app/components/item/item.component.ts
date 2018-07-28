import {Component, ElementRef, ViewChild, AfterViewInit} from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { OnInit } from "@angular/core";
import { ParamMap } from "@angular/router";
import {CookieService} from "angular2-cookie/core";
import { Group } from "../../model/group.model";
import { Item } from "../../model/item.model";
import { WunderbarService } from "../../service/wunderbaren.service";

@Component({
  selector: 'item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit, AfterViewInit {
    private category: String;
    private groups: Group[] = [];

    private rfid: string;

    private wallet: string;
    
    @ViewChild('rfidInput') rfidElement: ElementRef;

    constructor(private service: WunderbarService, private activeRoute: ActivatedRoute, private cookieService:CookieService) {
        service.getStock().subscribe(res => this.groups = res as Group[]);
    }
    ngAfterViewInit() {
          this.rfidElement.nativeElement.focus();
    }
    
    ngOnInit(): void {
        this.category = "";
        this.activeRoute.paramMap.subscribe(res => {
            this.category = res.get("category");
        });
    }

    private getItems(): Item[] {
        for(var i = 0; i < this.groups.length; i++)
            if(this.groups[i].name.toLocaleLowerCase() == this.category.toLocaleLowerCase())
                return this.groups[i].items;
        return [];
    }

    private addItem(item: Item) {
        this.service.order.push(item);
        this.cookieService.put("order", JSON.stringify(this.service.order));
    }
    
  private getUser() {
    this.wallet = undefined;
    this.service.getUser(this.rfid).subscribe(res => {
      this.wallet = res.wallet;
      setTimeout(() => {
        this.wallet = undefined;
      }, 5000);
    });
    this.rfid = "";
  }
}