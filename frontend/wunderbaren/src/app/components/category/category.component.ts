import {Component} from "@angular/core";
import { WunderbarService } from "app/service/wunderbaren.service";
import { Group } from "app/model/group.model";
import { Router } from "@angular/router";

@Component({
  selector: 'category',
  templateUrl: './category.component.html'
})
export class CategoryComponent {
  public groups: Group[] = [];
  constructor(private service: WunderbarService, private router: Router) {
    service.getStock().subscribe(res => this.groups = res);
  }

  select(group: Group) {
    this.router.navigate(['item', group.name]);
  }
}