import {Component} from "@angular/core";
import { WunderbarService } from "app/service/wunderbaren.service";
import { Group } from "app/model/group.model";

@Component({
  selector: 'category',
  templateUrl: './category.component.html'
})
export class CategoryComponent {
  public groups: Group[] = [];
  constructor(private service: WunderbarService) {
    service.getStock().subscribe(res => this.groups = res);
  }
}