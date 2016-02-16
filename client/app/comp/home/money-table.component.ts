import {Component, OnInit} from 'angular2/core'

import {Category} from "../../model/core/category.class"
import {Period} from "../../model/core/period.class"
import {Tx} from "../../model/core/tx.class"
import {DisplayParamService} from '../../service/display-param.service' // Used in view
import {CategoryRestService} from '../../service/category-rest.service'
import {PreferenceRestService} from '../../service/preference-rest.service'
import {CatfilterPipe} from '../../pipe/catfilter-pipe'
import {CategorySorterPipe} from '../../pipe/category-sorter-pipe'
import {PeriodFilterPipe} from '../../pipe/period-filter-pipe'

@Component({
    selector: 'money-table',
    templateUrl: 'app/view/home/money-table.html',
    pipes: [CatfilterPipe, CategorySorterPipe, PeriodFilterPipe]
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
}
