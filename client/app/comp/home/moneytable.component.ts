import {Component, OnInit} from 'angular2/core'
import {CatfilterPipe} from '../../pipe/catfilter-pipe'
import {CategorySorterPipe} from '../../pipe/category-sorter-pipe'
import {Category} from "../../model/core/category.class"
import {Period} from "../../model/core/period.class"
import {Tx} from "../../model/core/tx.class"
import {DisplayParamService} from '../../service/display-param.service' // Used in view
import {CategoryRestService} from '../../service/category-rest.service'

@Component({
    selector: 'money-table',
    templateUrl: 'app/view/home/money-table.html',
    pipes: [CatfilterPipe, CategorySorterPipe]
})

export class MoneyTableComponent {
  public months: Array<string> = ['Janvier', 'Février', 'Mars','Avril','Mai','Juin','Juillet','Août', 'Septembre','Octobre','Novembre','Décembre'];
  public categories: Array<Category> = [];

  constructor(public displayParamService: DisplayParamService, private _categoryRestService: CategoryRestService) {
    _categoryRestService.list().subscribe(data => {
      this.categories = data.json();
    })
  }
}
