import {Component, OnInit, ViewEncapsulation} from 'angular2/core'

import {Category, Period}       from "../../model/core/category.class"
import {Tx}                     from "../../model/core/tx.class"
import {DisplayParamService}    from '../../service/display-param.service' // Used in view
import {CategoryRestService}    from '../../service/category-rest.service'
import {PreferenceRestService}  from '../../service/preference-rest.service'
import {CatfilterPipe, CategorySorterPipe, PeriodFilterPipe}  from '../../pipe/money-pipes'
import {TooltipDirective}       from '../directive/tooltip.directive'
import {TxDetailsComponent}     from './tx-details.component'

@Component({
    selector: 'money-table',
    templateUrl: 'view/home/money-table.html',
    styleUrls: ['view/css/tooltip.css'],
    directives: [TooltipDirective, TxDetailsComponent],
    pipes: [CatfilterPipe, CategorySorterPipe, PeriodFilterPipe],
    encapsulation: ViewEncapsulation.None
})

export class MoneyTableComponent {
  months: Array<string> = ['Janvier', 'Février', 'Mars','Avril','Mai','Juin','Juillet','Août', 'Septembre','Octobre','Novembre','Décembre'];
  categories: Array<Category> = [];
  workingYear: number;

  constructor(public displayParamService: DisplayParamService,
    private _categoryRestService: CategoryRestService,
    private _prefRestService: PreferenceRestService) {

    this._prefRestService.getPref().subscribe(preference => {
      this.workingYear = preference.workingYear;
      _categoryRestService.listForYear(this.workingYear).subscribe(categories => {
        this.categories = categories;
      });
    });
  }

  findTx(categoryId:string, period: Period) {
    if (!period.txList) {
      this._categoryRestService.findAllTxForPeriod(categoryId, period.id).subscribe(categ => {
        period.txList = categ.periods[0].txList;
      });
    }
  }
}
