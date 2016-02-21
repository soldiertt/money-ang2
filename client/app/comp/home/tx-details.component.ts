import {Component, Input} from 'angular2/core'
import {Tx} from '../../model/core/tx.class'

@Component({
    selector: 'money-tx-details',
    templateUrl: 'view/home/tx-details.html'
})

export class TxDetailsComponent {
  @Input() txList : Array<Tx>;

  stringAsDate(dateStr) {
    return new Date(dateStr);
  }
}
