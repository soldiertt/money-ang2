import {Component, OnInit, ViewEncapsulation} from 'angular2/core'

import {TxDetailsComponent}     from './tx-details.component'
import {Category, Period}       from "../../model/core/category.class"
import {Tx}                     from "../../model/core/tx.class"
import {CatFrequency, CatType}  from "../../model/core/money-enums"
import {DisplayParamService}    from '../../service/display-param.service' // Used in view
import {CategoryRestService}    from '../../service/category-rest.service'
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

  constructor(public displayParamService: DisplayParamService,
    private _categoryRestService: CategoryRestService,
    private _formUtilsService: FormUtilsService) {

    this.months = this._formUtilsService.getAppMonths();
    this.displayParamService.filtersUpdated.subscribe(item => this.filtersUpdated(item));
    this.displayCategories();
  }

  displayCategories() {
    this.initTotals(false);
    this._categoryRestService.listForYear(this.displayParamService.year).subscribe(categories => {
      this.categories = categories;
      this.computeTotals();
    });
  }

  /**
    We subscribe to filtersUpdated event of displayParamService
  **/
  private filtersUpdated(item:string) {
    if (item == "year") {
      // full reload
      this.displayCategories();
    } else {
      this.initTotals(true);
      this.computeSubTotals();
    }
  }

  /** When cell is clicked **/
  findTx(categoryId:string, period: Period) {
    if (!period.txList) {
      this._categoryRestService.findAllTxForPeriod(categoryId, period.id).subscribe(categ => {
        period.txList = categ.periods[0].txList;
      });
    }
  }

  markPeriodAsPaid(category: Category, period: Period) {
    if (this.isUnpaidPeriod(category, period)) {
      period.markAsPaid = true;
      this._categoryRestService.update(category).subscribe(data => {
        console.log("category updated");
      });
    } else if (period.total == 0 && period.markAsPaid)  {
      period.markAsPaid = false;
      this._categoryRestService.update(category).subscribe(data => {
        console.log("category updated");
      });
    }
  }

  /** list on event txDeleted of money-tx-details component **/
  onTxDeleted($event: Array<any>) {
    let [period, tx] = $event;
    period.txList = undefined;
    period.total = period.total - tx.amount;
    this.initTotals(false);
    this.computeTotals();
  }

  /** for css class **/
  isCurrentPeriod(categ: Category, period: Period): boolean {
    let actualdate = new Date();
    let actualYear = actualdate.getFullYear();
    if (categ.frequency == CatFrequency.YEARLY) {
      return period.year == actualYear;
    } else if (categ.frequency == CatFrequency.QUARTER) {
      return period.year == actualYear && period.index == (Math.floor((actualdate.getMonth() + 3) / 3) - 1);
    } else if (categ.frequency == CatFrequency.MONTHLY) {
      return period.year == actualYear && period.index == actualdate.getMonth();
    }
  }

  /** for css class **/
  isUnpaidPeriod(categ: Category, period: Period): boolean {
    if (categ.type == CatType.FIXED && period.total == 0 && !period.markAsPaid) {
      let actualdate = new Date();
      let actualYear = actualdate.getFullYear();
      if (period.year < actualYear) {
        return true;
      } else if (categ.frequency == CatFrequency.YEARLY) {
        return false;
      } else if (categ.frequency == CatFrequency.QUARTER) {
        return period.index < (Math.floor((actualdate.getMonth() + 3) / 3) - 1);
      } else if (categ.frequency == CatFrequency.MONTHLY) {
        return period.index <= actualdate.getMonth();
      }
    } else {
      return false;
    }
  }

  private initTotals(onlySubTotals: boolean) {
    for (let type of ["FIXED", "OTHER", "INCOMING"]) {
      if (!onlySubTotals) {
        for (let freq of ["MONTHLY", "QUARTER", "YEARLY"]) {
          this.totals.set(type + '-' + freq, [0,0,0,0,0,0,0,0,0,0,0,0]);
        }
      }
      this.totals.set(type, [0,0,0,0,0,0,0,0,0,0,0,0]);
    }
    this.totals.set("GLOBAL", [0,0,0,0,0,0,0,0,0,0,0,0]);
  }

  private computeTotals() {
    this.categories.forEach(categ => {
      // FILTER ON YEAR periods
      let filteredPeriods = categ.periods.filter(period => period.year == this.displayParamService.year);
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

  private computeSubTotals() {
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
