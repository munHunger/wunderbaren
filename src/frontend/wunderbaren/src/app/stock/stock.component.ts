import { Component } from '@angular/core';
import {WunderbarService} from "../wunderbar.service";
import {Item} from "../item.model";

@Component({
  selector: 'stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css']
})
export class StockComponent {
  beerList: Item[] = [];
  constructor(private service: WunderbarService)
  {
    service.getCategory("beer").subscribe(items => {
      this.beerList = items;
    });
  }
}
