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
import {MoneyIconDirective}     from '../directive/money-icon.directive'
import {CatfilterPipe, CategorySorterPipe, PeriodFilterPipe}  from '../../pipe/money-pipes'

@Component({
    selector: 'money-table',
    templateUrl: 'html/home/money-table.html',
    styleUrls: ['css/money-table.css','css/tooltip.css'],
    directives: [TooltipDirective, TxDetailsComponent, MoneyIconDirective],
    pipes: [CatfilterPipe, CategorySorterPipe, PeriodFilterPipe],
    encapsulation: ViewEncapsulation.None
})
export class MoneyTableComponent {
  months: Array<string>;
  categories: Array<Category> = [];
  totals:Map<string, Array<number>> = new Map<string, Array<number>>();
  workingYear: number;

  constructor(public displayParamService: DisplayParamService,
    private _categoryRestService: CategoryRestService,
    private _prefRestService: PreferenceRestService,
    private _formUtilsService: FormUtilsService) {

    this.initTotals(false);
    this.months = this._formUtilsService.getAppMonths();

    this.displayParamService.filtersUpdated.subscribe(item => this.filtersUpdated(item));

    this._prefRestService.getPref().subscribe(preference => {
      this.workingYear = preference.workingYear;
      _categoryRestService.listForYear(this.workingYear).subscribe(categories => {
        this.categories = categories;
        this.computeTotals();
      });
    });
  }

  filtersUpdated(item:string) {
    this.initTotals(true);
    this.computeSubTotals();
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

  initTotals(onlySubTotals: boolean) {
    for (let type of this.displayParamService.types) {
      if (!onlySubTotals) {
        for (let freq of this.displayParamService.frequencies) {
          this.totals.set(type + '-' + freq, [0,0,0,0,0,0,0,0,0,0,0,0]);
        }
      }
      this.totals.set(type, [0,0,0,0,0,0,0,0,0,0,0,0]);
    }
    this.totals.set("GLOBAL", [0,0,0,0,0,0,0,0,0,0,0,0]);
  }

  computeTotals() {
    this.categories.forEach(categ => {
      // FILTER ON YEAR periods
      let filteredPeriods = categ.periods.filter(period => period.year == this.workingYear);
      // MONTHLY
      if (categ.frequency == CatFrequency.MONTHLY) {
        for (let periodIndex = 0; periodIndex < categ.nbPeriods; periodIndex++) {
          // ** TYPE-FREQUENCY totals **
          this.totals.get(categ.type + "-" + categ.frequency)[periodIndex] += filteredPeriods[periodIndex].total;
        }
      //QUARTER
      } else if (categ.frequency == CatFrequency.QUARTER) {
        for (let periodIndex = 0; periodIndex < categ.nbPeriods; periodIndex++) {
          for (let i = 0; i < 3; i++) {
            // ** TYPE-FREQUENCY totals **
            this.totals.get(categ.type + "-" + categ.frequency)[(periodIndex * 3) + i] += filteredPeriods[periodIndex].total / 3;
          }
        }
      //YEARLY
      } else if (categ.frequency == CatFrequency.YEARLY) {
        for (let i = 0; i < 12; i++) {
          // ** TYPE-FREQUENCY totals **
          this.totals.get(categ.type + "-" + categ.frequency)[i] += filteredPeriods[0].total / 12;
        }
      }
    });
    this.computeSubTotals();
  }

  computeSubTotals() {
    for (let type of this.displayParamService.types) {
      for (let freq of this.displayParamService.frequencies) {
        for (let i = 0; i < 12; i++) {
          this.totals.get(type)[i] += this.totals.get(type + "-" + freq)[i];
          this.totals.get("GLOBAL")[i] += this.totals.get(type + "-" + freq)[i];
        }
      }
    }
  }
}
