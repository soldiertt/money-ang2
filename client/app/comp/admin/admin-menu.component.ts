import {Component, Input} from "@angular/core";

@Component({
    selector: "money-admin-menu",
    templateUrl: "html/admin/leftmenu.html",
    styleUrls: ["css/admin/menu.css"]
})
export class AdminMenuComponent {
  @Input("current") current: string;

  isCurrent(item: string): boolean {
    return item === this.current;
  }
}
