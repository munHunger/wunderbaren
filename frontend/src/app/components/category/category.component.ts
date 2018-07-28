import {Component} from "@angular/core";
import { Router } from "@angular/router";
import { Group } from "../../model/group.model";
import { WunderbarService } from "../../service/wunderbaren.service";

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