import {Component} from 'angular2/core';
import {MoneyTableComponent} from './moneytable.component';
import {MoneyFormComponent} from './moneyform-component';

@Component({
    selector: 'money-home',
    templateUrl: 'app/view/home/money-home.html',
    directives: [MoneyTableComponent, MoneyFormComponent]
})

export class MoneyHomeComponent {
}
