import {Component, Input, Output, EventEmitter} from 'angular2/core'
import {Tx} from '../../model/core/tx.class'
import {Category, Period} from '../../model/core/category.class'
import {CategoryRestService}    from '../../service/category-rest.service'
import {TxrefRestService}    from '../../service/txref-rest.service'

@Component({
    selector: 'money-tx-details',
    templateUrl: 'html/home/tx-details.html'
})
export class TxDetailsComponent {
  @Input() txList : Array<Tx>;
  @Input() period : Period;
  @Output('txDeleted') txDeletedEmitter: EventEmitter<any> = new EventEmitter<any>();

  constructor(private _categoryRestService: CategoryRestService, private _txrefRestService: TxrefRestService) {
  }

  stringAsDate(dateStr) {
    return new Date(dateStr);
  }

  onDeleteTx(tx: Tx) {
    this._categoryRestService.removeTx(this.period.id, tx).subscribe(res => {
      console.log("tx removed");
      this.txDeletedEmitter.emit([this.period, tx]);
    });
    this._txrefRestService.deleteByTxref(tx.ref).subscribe(res => {
      console.log("txref removed");
    });
  }
}
