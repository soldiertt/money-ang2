import {Component, Input} from 'angular2/core'

@Component({
  selector: 'money-icon',
  template: `<span [ngClass]="['money-icon',iconClass.toLowerCase()]"></span>`,
  styleUrls: ['css/money-icon.css']
})
export class MoneyIconDirective {

  @Input('icon-class')
  iconClass: string;

}
