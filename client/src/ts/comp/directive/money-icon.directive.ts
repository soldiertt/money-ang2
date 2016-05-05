import {Component, Input} from "@angular/core";

@Component({
  selector: "money-icon",
  template: `<span [ngClass]="['money-icon',iconClass.toLowerCase()]"></span>`,
  styleUrls: ["assets/css/money-icon.css"]
})
export class MoneyIconDirective {

  @Input("icon-class")
  iconClass: string;

}
