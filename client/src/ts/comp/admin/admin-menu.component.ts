import {Component, Input} from "@angular/core";

@Component({
    selector: "money-admin-menu",
    templateUrl: "assets/html/admin/leftmenu.html",
    styleUrls: ["assets/css/admin/menu.css"]
})
export class AdminMenuComponent {
  @Input("current") current: string;

  isCurrent(item: string): boolean {
    return item === this.current;
  }
}
