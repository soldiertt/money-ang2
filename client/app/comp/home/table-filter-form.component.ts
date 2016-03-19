import {Component, EventEmitter, Output} from 'angular2/core'
import {DisplayParamService} from '../../service/display-param.service'
import {FormUtilsService} from '../../service/form-utils.service'

@Component({
    selector: 'money-table-filter-form',
    templateUrl: 'html/home/table-filter-form.html'
})
export class TableFilterFormComponent {
    allYears: Array<number>;

    constructor(public displayParamService: DisplayParamService, public formUtilsService: FormUtilsService) {
      this.allYears = this.formUtilsService.getAppYears();
    }

    onFilterUpdated($event) {
      this.displayParamService.hasChanged();
    }

}
