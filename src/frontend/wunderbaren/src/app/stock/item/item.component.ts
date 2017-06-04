import {Component, Input} from '@angular/core';
import {WunderbarService} from "../../wunderbar.service";
import {Item} from "../../item.model";

@Component({
  selector: 'item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent {
  @Input()
  public item: Item;
  private isMouseOver: boolean = false;
  constructor(private service: WunderbarService)
  {
  }

  public decrease()
  {
    this.item.amount--;
    this.service.decrease(this.item.name);
  }
  public increase()
  {
    this.item.amount++;
    this.service.increase(this.item.name);
  }
}
