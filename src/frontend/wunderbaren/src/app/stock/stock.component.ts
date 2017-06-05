import { Component } from '@angular/core';
import {WunderbarService} from "../wunderbar.service";
import {Item} from "../item.model";
import {Observable} from "rxjs";

@Component({
  selector: 'stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css']
})
export class StockComponent {
  beerList: Item[] = [];
  constructor(private service: WunderbarService)
  {
    this.update();
  }

  public update()
  {
    Observable.interval(100).flatMap(() => {
      this.service.getCategory("beer").subscribe(items => {
        this.beerList = items;
      });
    }).subscribe();
  }
}
