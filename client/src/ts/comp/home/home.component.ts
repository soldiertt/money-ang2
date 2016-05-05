import {Component} from "@angular/core";

import {MoneyTableComponent}      from "./money-table.component";
import {TableFilterFormComponent} from "./table-filter-form.component";

@Component({
    selector: "money-home",
    templateUrl: "assets/html/home/index.html",
    directives: [MoneyTableComponent, TableFilterFormComponent]
})
export class HomeComponent {
}
