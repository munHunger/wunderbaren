import { Component } from '@angular/core';
import {WunderbarService} from "../wunderbar.service";
import {Item} from "../item.model";
import {Observable} from 'rxjs/Rx';

@Component({
  selector: 'stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css']
})
export class StockComponent {
  beerList: Item[] = [];
  beerListHash: string;
  constructor(private service: WunderbarService)
  {
      this.service.getCategory("beer").subscribe(items => {
        this.beerList = items.json();
        this.beerListHash = items.headers.get('hash');
        this.update();
      });
  }

  public update()
  {
      this.service.getCategoryUpdate("beer", this.beerListHash).subscribe(items => {
        this.beerList = items.json();
        this.beerListHash = items.headers.get('hash');
        this.update();
      });
  }
}
