import {Component, ViewChild, ElementRef, AfterViewInit} from "@angular/core";
import { Router } from "@angular/router";
import { Group } from "../../model/group.model";
import { WunderbarService } from "../../service/wunderbaren.service";

@Component({
  selector: 'category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements AfterViewInit {
  public groups: Group[] = [];

  private rfid: string;

  private wallet: string;

  @ViewChild('rfidInput') rfidElement: ElementRef;

  constructor(private service: WunderbarService, private router: Router) {
    service.getStock().subscribe(res => this.groups = res as Group[]);
  }

  ngAfterViewInit() {
        this.rfidElement.nativeElement.focus();
  }

  select(group: Group) {
    this.router.navigate(['item', group.name]);
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