import {Component} from 'angular2/core';

import {MoneyTableComponent}      from './money-table.component';
import {TableFilterFormComponent} from './table-filter-form.component';

@Component({
    selector: 'money-home',
    templateUrl: 'html/home/index.html',
    directives: [MoneyTableComponent, TableFilterFormComponent]
})
export class HomeComponent {
}
