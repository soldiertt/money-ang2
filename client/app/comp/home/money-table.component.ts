import {Component, OnInit, ViewEncapsulation} from 'angular2/core'

import {TxDetailsComponent}     from './tx-details.component'
import {Category, Period}       from "../../model/core/category.class"
import {Tx}                     from "../../model/core/tx.class"
import {CatFrequency, CatType}  from "../../model/core/money-enums"
import {DisplayParamService}    from '../../service/display-param.service' // Used in view
import {CategoryRestService}    from '../../service/category-rest.service'
import {PreferenceRestService}  from '../../service/preference-rest.service'
import {FormUtilsService}       from '../../service/form-utils.service'
import {TooltipDirective}       from '../directive/tooltip.directive'
import {CatfilterPipe, CategorySorterPipe, PeriodFilterPipe}  from '../../pipe/money-pipes'

@Component({
    selector: 'money-table',
    templateUrl: 'html/home/money-table.html',
    styleUrls: ['css/tooltip.css'],
    directives: [TooltipDirective, TxDetailsComponent],
    pipes: [CatfilterPipe, CategorySorterPipe, PeriodFilterPipe],
    encapsulation: ViewEncapsulation.None
})
export class MoneyTableComponent {
  months: Array<string>;
  categories: Array<Category> = [];
  workingYear: number;

  constructor(public displayParamService: DisplayParamService,
    private _categoryRestService: CategoryRestService,
    private _prefRestService: PreferenceRestService,
    private _formUtilsService: FormUtilsService) {

    this.months = this._formUtilsService.getAppMonths();

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

  isCurrentPeriod(categ: Category, period: Period): boolean {
    let actualdate = new Date();
    let actualYear = actualdate.getFullYear();
    if (categ.frequency == CatFrequency.YEARLY) {
      return period.year == actualYear;
    } else if (categ.frequency == CatFrequency.QUARTER) {
      return period.index == (Math.floor((actualdate.getMonth() + 3) / 3) - 1);
    } else if (categ.frequency == CatFrequency.MONTHLY) {
      return period.index == actualdate.getMonth();
    }
  }

}
