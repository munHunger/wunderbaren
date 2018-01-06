import {Component} from "@angular/core";
import { WunderbarService } from "app/service/wunderbaren.service";
import { Group } from "app/model/group.model";
import { ActivatedRoute } from "@angular/router";
import { OnInit } from "@angular/core";
import { ParamMap } from "@angular/router";
import { Item } from "app/model/item.model";
import {CookieService} from "angular2-cookie/core";

@Component({
  selector: 'item',
  templateUrl: './item.component.html'
})
export class ItemComponent implements OnInit{
    private category: String;
    private groups: Group[] = [];
    constructor(private service: WunderbarService, private activeRoute: ActivatedRoute, private cookieService:CookieService) {
        service.getStock().subscribe(res => this.groups = res);
    }
    
    ngOnInit(): void {
        this.category = "";
        this.activeRoute.paramMap.switchMap((params: ParamMap) => params.get('category')).subscribe(res => {
            this.category += res
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
}